"use client"

import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { History as HistoryIcon } from "lucide-react"

async function fetchHistory() {
  const res = await fetch("/api/history?limit=5")
  if (!res.ok) throw new Error("Failed to fetch history")
  return res.json()
}

export function RecentHistory() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["history", "recent"],
    queryFn: fetchHistory,
  })

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] p-7 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-bold text-gray-900 tracking-tight flex items-center gap-2">
          <HistoryIcon className="w-5 h-5 text-blue-600" />
          Riwayat Terakhir
        </h2>
        <Link href="/history" className="text-[13px] font-semibold text-blue-600 hover:text-blue-700 transition-colors">
          Lihat Semua →
        </Link>
      </div>

      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                <div className="h-3 bg-gray-100 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div className="text-center py-8 text-red-500 font-medium text-sm">
          Gagal memuat riwayat.
        </div>
      )}

      {data?.data?.length === 0 && !isLoading && !isError && (
        <div className="text-center py-10 bg-gray-50/50 rounded-xl border border-dashed border-gray-200 mt-auto mb-auto">
          <div className="w-12 h-12 bg-white border border-gray-100 shadow-sm rounded-full flex items-center justify-center mx-auto mb-3">
            <HistoryIcon className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-gray-600 font-medium text-sm">Belum ada riwayat.</p>
          <p className="text-gray-400 text-xs mt-1">Mulai percakapan pertamamu!</p>
        </div>
      )}

      {data?.data?.length > 0 && !isLoading && !isError && (
        <div className="space-y-3">
          {data.data.map((item: any) => (
            <Link
              href={`/history/${item.id}`}
              key={item.id}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#F8FAFC] transition-colors border border-transparent hover:border-[#E2E8F0]"
            >
              <div className={`px-2 py-1 rounded text-xs font-bold ${
                item.type === 'stt' ? 'bg-[#DBEAFE] text-[#1D4ED8]' : 
                item.type === 'tts' ? 'bg-[#E2E8F0] text-[#0F172A]' : 
                'bg-[#FFEDD5] text-[#9A3A00]'
              }`}>
                {item.type.toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#0F172A] font-medium truncate">
                  {item.originalText}
                </p>
                <div className="flex items-center gap-2 text-xs text-[#94A3B8] mt-1">
                  <span>{item.sourceLanguageCode}</span>
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
