"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Mic, Volume2, History, Globe2 } from "lucide-react"

export function MobileNav() {
  const pathname = usePathname()

  const tabs = [
    { label: "Home", href: "/dashboard", icon: Home },
    { label: "STT", href: "/stt", icon: Mic },
    { label: "TTS", href: "/tts", icon: Volume2 },
    { label: "Riwayat", href: "/history", icon: History },
    { label: "Terjemah", href: "/translation", icon: Globe2 },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] flex justify-around items-center h-16 z-40 px-2 pb-safe">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href || (tab.href !== "/dashboard" && pathname.startsWith(tab.href))
        const Icon = tab.icon
        
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
              isActive ? "text-[#2563EB]" : "text-[#94A3B8] hover:text-[#334155]"
            }`}
          >
            <Icon className={`w-6 h-6 ${isActive ? "text-[#2563EB]" : ""}`} />
            <span className="text-[10px] font-semibold">{tab.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
