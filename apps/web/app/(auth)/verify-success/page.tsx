"use client"

import { CheckCircle2 } from "lucide-react"
import { useEffect } from "react"

export default function VerifySuccessPage() {
  // Try to close the tab automatically after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      // This will only work if the tab was opened by a script, 
      // but it's worth trying for some email clients.
      try {
        window.close()
      } catch (e) {}
    }, 5000)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg w-full max-w-[420px] p-8 text-center animate-in zoom-in duration-300">
        <div className="w-20 h-20 bg-green-50 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-[#0F172A] dark:text-white mb-4">Login Berhasil!</h1>
        <p className="text-[#334155] dark:text-slate-300 leading-relaxed mb-8">
          Anda telah berhasil terautentikasi. Silakan tutup halaman ini dan kembali ke tab website Swara awal Anda, halaman tersebut akan otomatis memuat Dashboard.
        </p>
        <button 
          onClick={() => window.close()}
          className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors shadow-sm"
        >
          Tutup Halaman Ini
        </button>
      </div>
    </div>
  )
}
