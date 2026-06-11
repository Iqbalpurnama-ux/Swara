import NextAuth from "next-auth"
import { authConfig } from "@/lib/auth.config"

export default NextAuth(authConfig).auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const isOnboardingCompleted = (req.auth?.user as any)?.onboardingCompleted

  const isAuthRoute = ["/login", "/register", "/verify"].includes(nextUrl.pathname)
  const isProtectedRoute = ["/dashboard", "/history", "/stt", "/tts", "/translation", "/conversation"].some(route => nextUrl.pathname.startsWith(route))

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/dashboard", nextUrl))
    }
    return
  }

  if (isProtectedRoute && !isLoggedIn) {
    return Response.redirect(new URL("/login", nextUrl))
  }

  if (isLoggedIn && isProtectedRoute && !isOnboardingCompleted) {
    // Redirect to an onboarding page or wizard
    return Response.redirect(new URL("/onboarding", nextUrl))
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
