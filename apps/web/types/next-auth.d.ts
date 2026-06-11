import NextAuth, { type DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: "regular" | "premium"
      onboardingCompleted: boolean
    } & DefaultSession["user"]
  }
}
