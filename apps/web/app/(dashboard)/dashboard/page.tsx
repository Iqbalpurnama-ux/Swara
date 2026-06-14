import { auth } from "@/lib/auth"
import { QuickAccessCards } from "@/components/dashboard/QuickAccessCards"
import { RecentHistory } from "@/components/dashboard/RecentHistory"
import { UsageQuota } from "@/components/dashboard/UsageQuota"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"

export default async function DashboardPage() {
  const session = await auth()
  const role = session?.user?.role || "regular"

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Welcome Section */}
      <DashboardHeader name={session?.user?.name?.split(" ")[0] || "Pengguna"} />

      {/* Quick Access Grid */}
      <QuickAccessCards />

      {/* Two Column Layout for History and Quota */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2">
          <RecentHistory />
        </div>
        <div className="lg:col-span-1">
          <UsageQuota role={role} />
        </div>
      </div>
    </div>
  )
}
