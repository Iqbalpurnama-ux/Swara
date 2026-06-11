"use client"

import { useState } from "react"
import { Search, Filter, Trash2, Clock, Mic, Volume2, Globe2, Sparkles, ChevronRight } from "lucide-react"

// Mock Data
const MOCK_HISTORY = [
  { id: 1, type: "stt", text: "Selamat pagi semua, mari kita mulai meeting hari ini tentang desain UI terbaru.", date: "Hari Ini, 09:30", label: "Rapat", isPremium: true },
  { id: 2, type: "tts", text: "Tolong kirimkan laporannya ke email saya sebelum jam 5 sore ya, terima kasih.", date: "Hari Ini, 14:15", label: "Kerja", isPremium: false },
  { id: 3, type: "translation", text: "Where is the nearest train station?", translated: "Di mana stasiun kereta terdekat?", date: "Kemarin, 19:20", label: "Travel", isPremium: false },
  { id: 4, type: "stt", text: "Catatan resep dokter: Minum obat 3x sehari setelah makan.", date: "2 Hari yang lalu", label: "Penting", isPremium: false },
]

export default function HistoryManager() {
  const [searchTerm, setSearchTerm] = useState("")

  const getIcon = (type: string) => {
    switch(type) {
      case 'stt': return <Mic className="w-5 h-5 text-blue-600" />
      case 'tts': return <Volume2 className="w-5 h-5 text-indigo-600" />
      case 'translation': return <Globe2 className="w-5 h-5 text-orange-600" />
      default: return <Clock className="w-5 h-5 text-slate-400" />
    }
  }

  const getBadgeColor = (type: string) => {
    switch(type) {
      case 'stt': return "bg-blue-100 text-blue-700"
      case 'tts': return "bg-indigo-100 text-indigo-700"
      case 'translation': return "bg-orange-100 text-orange-700"
      default: return "bg-slate-100 text-slate-700"
    }
  }

  return (
    <div className="flex flex-col gap-8 pb-20 relative z-10">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] shadow-sm border border-white">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Riwayat Percakapan</h1>
          <p className="text-slate-500 font-medium">Cari dan kelola semua transkripsi Anda (Disimpan secara lokal).</p>
        </div>
        
        <div className="flex w-full md:w-auto gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Cari kata kunci..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-700 placeholder:font-normal"
            />
          </div>
          <button className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-600">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* History List */}
      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-2">Semua Riwayat</h2>
        
        {MOCK_HISTORY.filter(h => h.text.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
          <div key={item.id} className="group bg-white/80 backdrop-blur-md border border-white hover:border-blue-100 p-6 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(37,99,235,0.08)] transition-all flex flex-col md:flex-row gap-6 items-start cursor-pointer">
            
            {/* Icon & Meta */}
            <div className="flex items-center md:flex-col gap-4 md:gap-2 shrink-0 md:w-24">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${getBadgeColor(item.type).replace('text-', 'bg-').replace('100', '50')}`}>
                {getIcon(item.type)}
              </div>
              <div className="text-xs font-bold text-slate-400 text-center">{item.date}</div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${getBadgeColor(item.type)}`}>
                  {item.type.toUpperCase()}
                </span>
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500">
                  {item.label}
                </span>
              </div>
              
              <p className="text-lg md:text-xl text-slate-800 font-medium leading-relaxed">{item.text}</p>
              
              {item.translated && (
                <p className="text-md md:text-lg text-orange-600 font-bold mt-2">→ {item.translated}</p>
              )}

              {item.isPremium && (
                <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-transparent border-l-4 border-blue-500 rounded-r-xl flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-blue-900 text-sm">SmartNote AI (Premium)</div>
                    <ul className="text-sm text-blue-700/80 mt-1 list-disc pl-4 space-y-1">
                      <li>Bahas desain UI terbaru.</li>
                      <li>Action item: Siapkan mockup besok.</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity self-end md:self-center">
              <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-50 text-slate-400 hover:text-slate-700 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>
        ))}

        {MOCK_HISTORY.filter(h => h.text.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
          <div className="text-center p-12 bg-white/50 rounded-3xl border border-white">
            <p className="text-slate-500 font-medium">Tidak ada riwayat yang ditemukan.</p>
          </div>
        )}
      </div>

    </div>
  )
}
