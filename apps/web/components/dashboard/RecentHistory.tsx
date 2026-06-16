"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { History as HistoryIcon } from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import { getHistory } from "@/app/actions/history"

export function RecentHistory() {
  const { t } = useTranslation()
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadHistory() {
      try {
        const historyData = await getHistory()
        // Ambil 5 riwayat terbaru saja untuk beranda
        setData(historyData.slice(0, 5))
      } catch (e) {
        console.error("Error loading history", e)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadHistory()
  }, [])

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] p-7 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
          <HistoryIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          {t("dashboard.recent")}
        </h2>
        <Link href="/history" className="text-[13px] font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
          {t("dashboard.see_all")}
        </Link>
      </div>

      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 dark:bg-slate-700 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-100 dark:bg-slate-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-100 dark:bg-slate-700 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {data.length === 0 && !isLoading && (
        <div className="text-center py-10 bg-gray-50/50 dark:bg-slate-900/50 rounded-xl border border-dashed border-gray-200 dark:border-slate-700 mt-auto mb-auto">
          <div className="w-12 h-12 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm rounded-full flex items-center justify-center mx-auto mb-3">
            <HistoryIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium text-sm">{t("dashboard.no_history")}</p>
          <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">{t("dashboard.start_conv")}</p>
        </div>
      )}

      {data.length > 0 && !isLoading && (
        <div className="space-y-3">
          {data.map((item: any) => (
            <Link
              href={`/history`}
              key={item.id}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#F8FAFC] dark:hover:bg-slate-700/50 transition-colors border border-transparent hover:border-[#E2E8F0] dark:hover:border-slate-600"
            >
              <div className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                item.type === 'stt' ? 'bg-[#DBEAFE] dark:bg-blue-900/30 text-[#1D4ED8] dark:text-blue-400' : 
                item.type === 'tts' ? 'bg-[#E2E8F0] dark:bg-slate-700 text-[#0F172A] dark:text-slate-300' : 
                'bg-[#FFEDD5] dark:bg-orange-900/30 text-[#9A3A00] dark:text-orange-400'
              }`}>
                {item.type}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#0F172A] dark:text-white font-medium truncate">
                  {item.label || item.originalText}
                </p>
                <div className="flex items-center gap-2 text-xs text-[#94A3B8] dark:text-slate-400 mt-1">
                  <span>{item.sourceLanguageCode || "Sistem"}</span>
                  <span>•</span>
                  <span>{new Date(item.createdAt).toLocaleDateString("id-ID")}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

