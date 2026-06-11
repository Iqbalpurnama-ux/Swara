import { auth } from "@/lib/auth"
import { QuickAccessCards } from "@/components/dashboard/QuickAccessCards"
import { RecentHistory } from "@/components/dashboard/RecentHistory"
import { UsageQuota } from "@/components/dashboard/UsageQuota"

export default async function DashboardPage() {
  const session = await auth()
  const role = session?.user?.role || "regular"

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col gap-2 pt-4 pb-2">
        <h1 className="text-3xl md:text-[40px] font-extrabold tracking-tight text-slate-900 leading-tight">
          Selamat Datang,
          <br className="md:hidden" />
          <span className="text-blue-600"> {session?.user?.name?.split(" ")[0] || "Pengguna"}</span>
        </h1>
        <p className="text-slate-500 font-medium text-[16px] md:text-[18px]">
          Pilih fitur untuk memulai komunikasi tanpa batas.
        </p>
      </div>

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
