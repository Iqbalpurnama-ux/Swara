import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"

export const authConfig = {
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role || "regular"
        token.onboardingCompleted = (user as any).onboardingCompleted || false
      }
      if (trigger === "update" && session) {
        if (session.onboardingCompleted !== undefined) {
          token.onboardingCompleted = session.onboardingCompleted
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as "regular" | "premium"
        ;(session.user as any).onboardingCompleted = token.onboardingCompleted as boolean
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
    verifyRequest: "/verify",
  },
} satisfies NextAuthConfig
