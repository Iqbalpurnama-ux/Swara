import NextAuth from "next-auth"
import Resend from "next-auth/providers/resend"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { authConfig } from "./auth.config"

const prisma = new PrismaClient()

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    ...authConfig.providers,
    Resend({
      from: process.env.EMAIL_FROM || "onboarding@resend.dev",
    }),
  ],
})
