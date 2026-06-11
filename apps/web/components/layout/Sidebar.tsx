"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Home, Mic, Volume2, History, Languages, Settings, LogOut, Globe2 } from "lucide-react"
import { signOut } from "next-auth/react"

interface SidebarProps {
  role?: string
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname()

  const navItems = [
    { label: "Beranda", href: "/dashboard", icon: Home },
    { label: "Speech to Text", href: "/stt", icon: Mic },
    { label: "Text to Speech", href: "/tts", icon: Volume2 },
    { label: "Percakapan 2 Arah", href: "/conversation", icon: Languages },
    { label: "Terjemahan", href: "/translation", icon: Globe2 },
    { label: "Riwayat", href: "/history", icon: History },
  ]

  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-white border-r border-slate-200 flex flex-col z-40 hidden md:flex">
      <div className="p-8 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
          <Image src="/logo.png" alt="Swara Logo" width={32} height={32} className="rounded-lg shadow-sm" />
          Swara
        </h1>
        {role === "premium" && (
          <span className="mt-4 inline-block bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest border border-blue-100">
            Premium
          </span>
        )}
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive 
                  ? "bg-blue-50 text-blue-700" 
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-6 border-t border-slate-200">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-3 px-4 py-2.5 w-full rounded-xl text-sm font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Keluar
        </button>
      </div>
    </aside>
  )
}
