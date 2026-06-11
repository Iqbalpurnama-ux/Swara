"use client"

import { useState } from "react"
import { Zap } from "lucide-react"

interface UsageQuotaProps {
  role?: string
}

export function UsageQuota({ role = "regular" }: UsageQuotaProps) {
  // In a real app, these values would come from the server
  const [sttUsed] = useState(15)
  const sttLimit = 60
  
  const [translationUsed] = useState(2500)
  const translationLimit = 10000

  if (role === "premium") {
    return (
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-[0_4px_20px_-5px_rgba(37,99,235,0.4)] p-6 relative overflow-hidden group border border-blue-500">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <div className="flex items-center gap-3 mb-2 relative z-10">
          <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-lg">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">Akses Premium</h2>
        </div>
        <p className="text-blue-100 text-sm relative z-10 leading-relaxed mt-2">Anda memiliki akses tanpa batas ke semua fitur Swara.</p>
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
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] p-7 flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-bold text-gray-900 tracking-tight">Penggunaan</h2>
        <span className="text-[10px] font-bold px-2.5 py-1 bg-gray-50 text-gray-500 rounded-md uppercase tracking-widest border border-gray-100">Regular</span>
      </div>

      <div className="space-y-6 flex-1">
        {/* STT Quota */}
        <div>
          <div className="flex justify-between text-sm mb-2.5">
            <span className="font-semibold text-gray-700">Speech-to-Text</span>
            <span className="text-gray-500 font-medium">{sttUsed} / {sttLimit} <span className="text-gray-400">menit</span></span>
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full ${getProgressColor(sttUsed, sttLimit)} transition-all duration-500`}
              style={{ width: `${(sttUsed / sttLimit) * 100}%` }}
            />
          </div>
        </div>

        {/* Translation Quota */}
        <div>
          <div className="flex justify-between text-sm mb-2.5">
            <span className="font-semibold text-gray-700">Translasi</span>
            <span className="text-gray-500 font-medium">{translationUsed} / {translationLimit} <span className="text-gray-400">karakter</span></span>
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full ${getProgressColor(translationUsed, translationLimit)} transition-all duration-500`}
              style={{ width: `${(translationUsed / translationLimit) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <button className="w-full mt-8 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-sm shadow-blue-200 flex items-center justify-center gap-2 text-sm">
        <Zap className="w-4 h-4 text-blue-200" />
        Upgrade Premium
      </button>
    </div>
  )
}
