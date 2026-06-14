"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Home, Mic, Volume2, History, Languages, Settings, LogOut, Globe2, UserCircle } from "lucide-react"
import { signOut } from "next-auth/react"
import { useTranslation } from "@/lib/i18n"

interface SidebarProps {
  role?: string
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname()
  const { t } = useTranslation()

  const navItems = [
    { label: t("sidebar.home"), href: "/dashboard", icon: Home },
    { label: t("sidebar.dikte"), href: "/stt", icon: Mic },
    { label: t("sidebar.tts"), href: "/tts", icon: Volume2 },
    { label: t("sidebar.percakapan"), href: "/conversation", icon: Languages },
    { label: t("sidebar.terjemah"), href: "/translation", icon: Globe2 },
    { label: t("history.all_history"), href: "/history", icon: History },
  ]

  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col z-40 hidden md:flex">
      <div className="p-8 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
          <Image src="/logo.png" alt="Swara Logo" width={32} height={32} className="rounded-lg shadow-sm" />
          Swara
        </h1>
        {role === "premium" && (
          <span className="mt-4 inline-block bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest border border-blue-100">
            Premium
          </span>
        )}
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-6 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive 
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" 
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`} />
              {item.label}
            </Link>
          )
        })}

        {/* Premium Upgrade Banner */}
        {role !== "premium" && (
          <div className="mt-8 mb-4 px-2">
            <div className="bg-gradient-to-br from-blue-50 to-orange-50 dark:from-slate-800 dark:to-slate-800 border border-blue-100 dark:border-slate-700 rounded-2xl p-4 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full blur-2xl group-hover:bg-orange-100 transition-colors"></div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Upgrade ke Premium</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">Buka SmartNote AI, Unlimited STT, & Cloud Sync.</p>
              <Link
                href="/premium"
                className="block w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold text-center rounded-lg transition-colors"
              >
                Coba Sekarang
              </Link>
            </div>
          </div>
        )}
      </nav>

      <div className="p-6 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-1 shrink-0">
        <Link
          href="/profile"
          className="flex items-center gap-3 px-4 py-2.5 w-full rounded-xl text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all"
        >
          <UserCircle className="w-4 h-4" />
          {t("header.profile")}
        </Link>
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-2.5 w-full rounded-xl text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all"
        >
          <Settings className="w-4 h-4" />
          {t("sidebar.pengaturan")}
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-3 px-4 py-2.5 w-full rounded-xl text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all mt-2"
        >
          <LogOut className="w-4 h-4" />
          {t("header.logout")}
        </button>
      </div>
    </aside>
  )
}
