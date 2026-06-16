"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Activity, Sparkles, Zap, ShieldCheck } from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import { getUsageStats } from "@/app/actions/history"

interface UsageQuotaProps {
  role?: string
}

export function UsageQuota({ role = "regular" }: UsageQuotaProps) {
  const { t } = useTranslation()
  const isPremium = role === "premium"

  const [sttUsed, setSttUsed] = useState(0)
  const sttLimit = 60 // 60 menit per bulan
  
  const [translationUsed, setTranslationUsed] = useState(0)
  const translationLimit = 10000 // 10.000 karakter per bulan

  useEffect(() => {
    async function loadStats() {
      try {
        const stats = await getUsageStats()
        setSttUsed(stats.sttUsed)
        setTranslationUsed(stats.translationUsed)
      } catch (e) {
        console.error("Gagal memuat statistik", e)
      }
    }
    
    if (!isPremium) {
      loadStats()
    }
  }, [isPremium])

  if (isPremium) {
    return (
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-[0_4px_20px_-5px_rgba(37,99,235,0.4)] p-6 relative overflow-hidden group border border-blue-500">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <div className="flex items-center gap-3 mb-2 relative z-10">
          <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-lg">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">{t("quota.premium_access")}</h2>
        </div>
        <p className="text-blue-100 text-sm relative z-10 leading-relaxed mt-2">{t("quota.unlimited")}</p>
      </div>
    )
  }

  const getProgressColor = (used: number, limit: number) => {
    const percentage = (used / limit) * 100
    if (percentage > 80) return "bg-[#EF4444]" // Merah
    if (percentage > 50) return "bg-[#EAB308]" // Kuning
    return "bg-[#22C55E]" // Hijau
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] p-7 flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">{t("quota.usage")}</h2>
        <span className="text-[10px] font-bold px-2.5 py-1 bg-gray-50 dark:bg-slate-700/50 text-gray-500 dark:text-gray-400 rounded-md uppercase tracking-widest border border-gray-100 dark:border-slate-600">Regular</span>
      </div>

      <div className="space-y-6 flex-1">
        {/* STT Quota */}
        <div>
          <div className="flex justify-between text-sm mb-2.5">
            <span className="font-semibold text-gray-700 dark:text-slate-300">Speech-to-Text</span>
            <span className="text-gray-500 dark:text-slate-400 font-medium">{sttUsed} / {sttLimit} <span className="text-gray-400 dark:text-slate-500">{t("quota.mins")}</span></span>
          </div>
          <div className="h-1.5 w-full bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div 
              className={`h-full ${getProgressColor(sttUsed, sttLimit)} transition-all duration-500`}
              style={{ width: `${(sttUsed / sttLimit) * 100}%` }}
            />
          </div>
        </div>

        {/* Translation Quota */}
        <div>
          <div className="flex justify-between text-sm mb-2.5">
            <span className="font-semibold text-gray-700 dark:text-slate-300">Translasi</span>
            <span className="text-gray-500 dark:text-slate-400 font-medium">{translationUsed} / {translationLimit} <span className="text-gray-400 dark:text-slate-500">{t("quota.chars")}</span></span>
          </div>
          <div className="h-1.5 w-full bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div 
              className={`h-full ${getProgressColor(translationUsed, translationLimit)} transition-all duration-500`}
              style={{ width: `${(translationUsed / translationLimit) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <button className="w-full mt-8 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-sm shadow-blue-200 dark:shadow-none flex items-center justify-center gap-2 text-sm">
        <Zap className="w-4 h-4 text-blue-200" />
        {t("quota.upgrade")}
      </button>
    </div>
  )
}
