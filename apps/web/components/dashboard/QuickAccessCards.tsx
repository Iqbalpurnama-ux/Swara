"use client"

import Link from "next/link"
import { Mic, Volume2, Globe2, ArrowRight } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

export function QuickAccessCards() {
  const { t } = useTranslation()
  const cards = [
    {
      title: "Speech to Text",
      subtitle: t("dashboard.stt_sub"),
      icon: Mic,
      href: "/stt",
    },
    {
      title: "Text to Speech",
      subtitle: t("dashboard.tts_sub"),
      icon: Volume2,
      href: "/tts",
    },
    {
      title: t("sidebar.terjemah"),
      subtitle: t("dashboard.trans_sub"),
      icon: Globe2,
      href: "/translation",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {cards.map((card, i) => {
        const Icon = card.icon
        return (
          <Link
            key={i}
            href={card.href}
            className="group relative bg-white dark:bg-slate-800 rounded-[24px] border border-slate-200/60 dark:border-slate-700 p-6 md:p-8 flex flex-col justify-between transition-all duration-500 hover:border-blue-200 dark:hover:border-blue-500/50 hover:shadow-[0_8px_30px_rgb(37,99,235,0.06)] overflow-hidden"
          >
            {/* Minimal Hover Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 dark:from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="relative z-10 flex justify-between items-start mb-8">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900/50 group-hover:bg-blue-600 flex items-center justify-center transition-colors duration-500">
                <Icon className="w-6 h-6 text-slate-400 dark:text-slate-500 group-hover:text-white transition-colors duration-500" strokeWidth={2} />
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                <ArrowRight className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>

            <div className="relative z-10">
              <h2 className="font-bold text-xl text-slate-800 dark:text-white tracking-tight mb-1.5 transition-colors duration-300 group-hover:text-blue-700 dark:group-hover:text-blue-400">
                {card.title}
              </h2>
              <p className="font-medium text-slate-500 dark:text-slate-400 text-[15px]">
                {card.subtitle}
              </p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
