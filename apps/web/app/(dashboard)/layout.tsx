import { auth } from "@/lib/auth"
import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"
import { MobileNav } from "@/components/layout/MobileNav"
import { VisualFlash } from "@/components/ui/VisualFlash"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }

  const role = session.user.role || "regular"
  const defaultLanguage = (session.user as any).defaultLanguage || "id-ID"

  return (
    <div className="min-h-screen relative z-0 bg-[#f8fafc]">
      {/* Global Dashboard Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 z-[-1]"></div>
      
      {/* Global Decorative Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden mix-blend-multiply z-[-1]">
        <div className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] rounded-full blur-[120px] bg-blue-200/40"></div>
        <div className="absolute top-[40%] -right-[20%] w-[600px] h-[600px] rounded-full blur-[100px] bg-cyan-200/40"></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[700px] h-[700px] rounded-full blur-[100px] bg-indigo-100/40"></div>
      </div>

      <Sidebar role={role} />
      <Header userName={session.user.name || undefined} language={defaultLanguage} />
      <VisualFlash />
      
      <main className="md:ml-[240px] pb-20 md:pb-0 min-h-[calc(100vh-64px)]">
        {children}
      </main>
      
      <MobileNav />
    </div>
  )
}
