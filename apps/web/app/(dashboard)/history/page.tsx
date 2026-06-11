import { Metadata } from "next"
import HistoryManager from "@/components/history/HistoryManager"

export const metadata: Metadata = {
  title: "Riwayat & Kuota | Swara",
  description: "Kelola riwayat transkripsi dan penggunaan kuota Anda.",
}

export default function HistoryPage() {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto min-h-[calc(100vh-4rem)]">
      <HistoryManager />
    </div>
  )
}
