"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Trash2, Clock, Mic, Volume2, Globe2, Sparkles, ChevronRight, Cloud, CloudOff, Loader2 } from "lucide-react"
import { useUiStore } from "@/store/uiStore"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/lib/i18n"
import { getHistory, deleteHistory, updateHistorySummary } from "@/app/actions/history"

// Mock Data structure based on Prisma History model
type HistoryItem = { 
  id: string, 
  type: string, 
  text: string, 
  date: string, 
  label: string, 
  translated?: string, 
  isPremium: boolean, 
  hasSummary?: boolean, 
  summaryHtml?: string 
}
const INITIAL_HISTORY: HistoryItem[] = [
  { id: "1", type: "stt", text: "Selamat pagi semua, mari kita mulai meeting hari ini tentang desain UI terbaru. Tolong pastikan tombol submit sudah sesuai dengan panduan aksesibilitas WCAG.", date: "Hari Ini, 09:30", label: "Rapat", isPremium: true, hasSummary: true },
  { id: "2", type: "tts", text: "Tolong kirimkan laporannya ke email saya sebelum jam 5 sore ya, terima kasih banyak atas kerjasamanya.", date: "Hari Ini, 14:15", label: "Kerja", isPremium: false },
  { id: "3", type: "translation", text: "Where is the nearest train station? I need to go to the airport quickly.", translated: "Di mana stasiun kereta terdekat? Saya perlu pergi ke bandara dengan cepat.", date: "Kemarin, 19:20", label: "Travel", isPremium: false },
  { id: "4", type: "stt", text: "Catatan resep dokter: Minum obat antibiotik 3x sehari setelah makan, dan obat flu 1x sebelum tidur.", date: "2 Hari yang lalu", label: "Penting", isPremium: false },
]

export default function HistoryManager() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState("")
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [cloudSync, setCloudSync] = useState(true)
  const [generatingId, setGeneratingId] = useState<string | null>(null)
  const { triggerFlash, addNotification } = useUiStore()
  const router = useRouter()
  const isPremiumUser = false // Mock status berlangganan (false = Reguler)

  useEffect(() => {
    async function fetchHistory() {
      try {
        const data = await getHistory()
        const formatted = data.map((d: any) => ({
          id: d.id,
          type: d.type,
          text: d.originalText,
          translated: d.translatedText || undefined,
          date: new Date(d.createdAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
          label: d.label || d.type.toUpperCase(),
          isPremium: !!d.summaryContent,
          hasSummary: !!d.summaryContent,
          summaryHtml: d.summaryContent || undefined
        }))
        setHistory(formatted)
      } catch (e) {
        console.error("Error loading history", e)
      }
    }
    
    if (cloudSync) {
      fetchHistory()
    }
  }, [cloudSync])

  const getIcon = (type: string) => {
    switch(type) {
      case 'stt': return <Mic className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      case 'tts': return <Volume2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
      case 'translation': return <Globe2 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
      default: return <Clock className="w-5 h-5 text-slate-400" />
    }
  }

  const getBadgeColor = (type: string) => {
    switch(type) {
      case 'stt': return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
      case 'tts': return "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
      case 'translation': return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
      default: return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
    }
  }

  const toggleCloudSync = () => {
    setCloudSync(!cloudSync)
    triggerFlash("success", !cloudSync ? "Sinkronisasi Cloud Diaktifkan" : "Sinkronisasi Cloud Dimatikan")
  }

  const generateSummary = async (id: string) => {
    setGeneratingId(id)
    const item = history.find(h => h.id === id)
    
    if (!item) {
      setGeneratingId(null)
      return
    }

    if (!isPremiumUser) {
      setGeneratingId(null)
      addNotification("error", "Fitur SmartNote AI hanya untuk pengguna Premium.")
      setTimeout(() => router.push("/premium"), 1500)
      return
    }

    try {
      const response = await fetch('/api/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: item.text })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Terjadi kesalahan')
      }

      await updateHistorySummary(id, data.summary);

      setHistory(prev => prev.map(h => 
        h.id === id ? { ...h, isPremium: true, hasSummary: true, summaryHtml: data.summary } : h
      ))
      addNotification("success", "SmartNote AI berhasil dibuat!")
    } catch (error: any) {
      addNotification("error", error.message || "Gagal membuat ringkasan AI")
    } finally {
      setGeneratingId(null)
    }
  }

  return (
    <div className="flex flex-col gap-8 pb-20 relative z-10">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2rem] shadow-sm border border-white dark:border-slate-800">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">{t("history.title")}</h1>
          <div className="flex items-center gap-4">
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm md:text-base">{t("history.subtitle")}</p>
            <button 
              onClick={toggleCloudSync}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                cloudSync 
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" 
                  : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
              }`}
            >
              {cloudSync ? <Cloud className="w-3.5 h-3.5" /> : <CloudOff className="w-3.5 h-3.5" />}
              {cloudSync ? t("history.cloud_on") : t("history.cloud_off")}
            </button>
          </div>
        </div>
        
        <div className="flex w-full md:w-auto gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder={t("history.search")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all font-medium text-slate-700 dark:text-slate-200 placeholder:font-normal dark:placeholder:text-slate-500"
            />
          </div>
          <button className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* History List */}
      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest pl-2">{t("history.all_history")}</h2>
        
        {history.filter(h => h.text.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
          <div key={item.id} className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white dark:border-slate-800 hover:border-blue-100 dark:hover:border-blue-900/50 p-6 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(37,99,235,0.08)] dark:hover:shadow-[0_8px_30px_rgba(59,130,246,0.1)] transition-all flex flex-col md:flex-row gap-6 items-start cursor-pointer">
            
            {/* Icon & Meta */}
            <div className="flex items-center md:flex-col gap-4 md:gap-2 shrink-0 md:w-24">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${getBadgeColor(item.type)}`}>
                {getIcon(item.type)}
              </div>
              <div className="text-xs font-bold text-slate-400 dark:text-slate-500 text-center">{item.date}</div>
            </div>

            {/* Content */}
            <div className="flex-1 w-full">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${getBadgeColor(item.type)}`}>
                  {item.type.toUpperCase()}
                </span>
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                  {item.label}
                </span>
              </div>
              
              <p className="text-lg md:text-xl text-slate-800 dark:text-slate-200 font-medium leading-relaxed">{item.text}</p>
              
              {item.translated && (
                <p className="text-md md:text-lg text-orange-600 dark:text-orange-400 font-bold mt-2">→ {item.translated}</p>
              )}

              {/* SmartNote AI Section */}
              <div className="mt-4">
                {item.hasSummary ? (
                  <div className="p-4 bg-gradient-to-r from-blue-50 dark:from-blue-900/20 to-transparent border-l-4 border-blue-500 rounded-r-xl flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" />
                    <div className="w-full">
                      <div className="font-bold text-blue-900 dark:text-blue-300 text-sm mb-2">SmartNote AI Summary</div>
                      {item.summaryHtml ? (
                        <div dangerouslySetInnerHTML={{ __html: item.summaryHtml }} className="prose prose-sm dark:prose-invert prose-p:text-sm prose-p:text-blue-700/80 prose-li:text-sm prose-li:text-blue-700/80 dark:prose-p:text-blue-400/80 dark:prose-li:text-blue-400/80" />
                      ) : (
                        <ul className="text-sm text-blue-700/80 dark:text-blue-400/80 mt-1 list-disc pl-4 space-y-1">
                          <li>Ringkasan poin utama dari percakapan.</li>
                          <li>Dibuat otomatis oleh AI.</li>
                        </ul>
                      )}
                    </div>
                  </div>
                ) : generatingId === item.id ? (
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex items-center gap-3 border border-slate-100 dark:border-slate-800">
                    <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{t("history.ai_summary")}</span>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); generateSummary(item.id); }}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Generate AI Summary
                    </button>
                    {!item.isPremium && (
                      <Link href="/premium" onClick={(e) => e.stopPropagation()} className="flex items-center px-3 py-1.5 rounded-lg text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/20 dark:hover:bg-orange-900/40 transition-colors">
                        Upgrade
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity self-end md:self-center">
              <button 
                onClick={async (e) => { 
                  e.stopPropagation(); 
                  try {
                    await deleteHistory(item.id)
                    setHistory(history.filter(h => h.id !== item.id))
                    addNotification("success", t("history.deleted")); 
                  } catch (e) {
                    addNotification("error", "Gagal menghapus riwayat")
                  }
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-900/30 text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>
        ))}

        {history.filter(h => h.text.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
          <div className="text-center p-12 bg-white/50 dark:bg-slate-900/50 rounded-3xl border border-white dark:border-slate-800">
            <p className="text-slate-500 font-medium">{t("history.no_found")}</p>
          </div>
        )}
      </div>

    </div>
  )
}
