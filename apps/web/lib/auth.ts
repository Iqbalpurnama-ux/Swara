import NextAuth from "next-auth"
import Resend from "next-auth/providers/resend"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { authConfig } from "./auth.config"
import { prisma } from "./prisma"

import { Resend as ResendClient } from "resend"
const resendClient = new ResendClient(process.env.AUTH_RESEND_KEY || process.env.RESEND_API_KEY)

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    ...authConfig.providers,
    Resend({
      from: process.env.EMAIL_FROM || "Swara <onboarding@resend.dev>",
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        try {
          const { host } = new URL(url)
          await resendClient.emails.send({
            from: provider.from as string,
            to: identifier,
            subject: `Masuk ke Swara`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; padding: 40px 0;">
                <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; padding: 40px; box-shadow: 0 10px 40px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; text-align: center;">
                  


                  <h1 style="color: #0f172a; font-size: 24px; font-weight: bold; margin: 0 0 12px 0;">Selamat Datang di Swara</h1>
                  <p style="color: #64748b; font-size: 16px; line-height: 1.5; margin: 0 0 32px 0;">
                    Anda meminta tautan masuk untuk mengakses akun Anda di platform komunikasi Swara. Klik tombol di bawah ini untuk langsung masuk tanpa kata sandi.
                  </p>
                  
                  <a href="${url}" style="display: inline-block; background-color: #2563EB; color: #ffffff; font-size: 16px; font-weight: bold; text-decoration: none; padding: 16px 32px; border-radius: 12px; transition: background-color 0.2s;">
                    Masuk ke Akun Saya
                  </a>
                  
                  <p style="color: #94a3b8; font-size: 14px; margin: 32px 0 0 0;">
                    Jika Anda tidak meminta tautan ini, Anda dapat mengabaikan email ini dengan aman.
                  </p>
                  <p style="color: #cbd5e1; font-size: 12px; margin: 16px 0 0 0;">
                    Dikirim untuk ${identifier} dari ${host}
                  </p>
                </div>
              </div>
            `,
          })
        } catch (error) {
          console.error("Gagal mengirim email verifikasi:", error)
          throw new Error("Gagal mengirim email verifikasi")
        }
      },
    }),
  ],
})
