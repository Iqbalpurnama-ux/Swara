import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    let isPremium = session.user.role === "premium";
    if (!isPremium) {
      const dbUser = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { role: true }
      });
      if (dbUser?.role === "premium") {
        isPremium = true;
      }
    }

    if (!isPremium) {
      return NextResponse.json({ error: "Unauthorized. Fitur SmartNote AI hanya untuk pengguna Premium." }, { status: 403 });
    }

    const { text } = await req.json();
    
    if (!text) {
      return NextResponse.json({ error: "Teks diperlukan untuk membuat ringkasan" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API key belum dikonfigurasi" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `Buatkan ringkasan singkat dalam bentuk poin peluru (bullet points) berbahasa Indonesia dari teks percakapan/dikte berikut. Jika memungkinkan, gunakan HTML tag <ul> dan <li> agar hasilnya mudah dirender:\n\n${text}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let summary = response.text();

    // Pastikan jika AI tidak memberikan tag <ul> kita hapus markdown list defaultnya
    if (!summary.includes('<ul>')) {
      // Ubah markdown bullet (* atau -) menjadi list HTML
      const items = summary
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.startsWith('* ') || line.startsWith('- '))
        .map(line => `<li>${line.substring(2)}</li>`);
      
      if (items.length > 0) {
        summary = `<ul class="text-sm text-blue-700/80 dark:text-blue-400/80 mt-1 list-disc pl-4 space-y-1">${items.join('')}</ul>`;
      } else {
        // Jika tidak ada format list, bungkus di paragraf
        summary = `<p class="text-sm text-blue-700/80 dark:text-blue-400/80 mt-1">${summary}</p>`;
      }
    }

    return NextResponse.json({ summary });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return NextResponse.json({ error: "Gagal membuat ringkasan karena terjadi kesalahan pada API" }, { status: 500 });
  }
}
