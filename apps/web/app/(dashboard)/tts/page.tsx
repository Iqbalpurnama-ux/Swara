import { Metadata } from "next"
import TextToSpeechInterface from "@/components/tts/TextToSpeechInterface"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "Text to Speech | Swara",
  description: "Ubah teks menjadi suara sintesis AI dengan berbagai pilihan profil suara.",
}

export default async function TTSPage() {
  const session = await auth()
  let isPremium = session?.user?.role === "premium"
  
  if (session?.user?.id) {
    const dbUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })
    if (dbUser?.role) {
      isPremium = dbUser.role === "premium"
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]">
      <TextToSpeechInterface isPremium={isPremium} />
    </div>
  )
}
