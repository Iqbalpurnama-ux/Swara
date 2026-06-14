import { Metadata } from "next"
import PremiumUpgradeFlow from "@/components/premium/PremiumUpgradeFlow"

export const metadata: Metadata = {
  title: "Upgrade Premium | Swara",
  description: "Dapatkan akses tanpa batas ke semua fitur Swara dengan berlangganan Premium.",
}

export default function PremiumPage() {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto min-h-[calc(100vh-4rem)]">
      <PremiumUpgradeFlow />
    </div>
  )
}
