import { Metadata } from "next"
import HistoryManager from "@/components/history/HistoryManager"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "Riwayat & Kuota | Swara",
  description: "Kelola riwayat transkripsi dan penggunaan kuota Anda.",
}

export default async function HistoryPage() {
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
    <div className="p-4 md:p-8 max-w-6xl mx-auto min-h-[calc(100vh-4rem)]">
      <HistoryManager isPremium={isPremium} />
    </div>
  )
}
