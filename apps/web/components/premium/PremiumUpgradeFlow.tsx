"use client"

import { useState } from "react"
import { Check, Zap, ShieldCheck, ArrowRight, Sparkles, X, CreditCard, Loader2 } from "lucide-react"
import { useUiStore } from "@/store/uiStore"
import { upgradeUserToPremium } from "@/app/actions/user"
import { useRouter } from "next/navigation"

export default function PremiumUpgradeFlow() {
  const { triggerFlash } = useUiStore()
  const router = useRouter()
  
  const [showModal, setShowModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState("")
  const [price, setPrice] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubscribe = (plan: string, planPrice: string) => {
    setSelectedPlan(plan)
    setPrice(planPrice)
    setShowModal(true)
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    try {
      await upgradeUserToPremium()
      triggerFlash("success", `Pembayaran berhasil! Akun Anda kini Premium.`)
      setShowModal(false)
      // Reload the page to reflect the new session role
      window.location.href = "/dashboard"
    } catch (error) {
      triggerFlash("error", "Terjadi kesalahan saat memproses pembayaran.")
      setIsProcessing(false)
    }
  }

  return (
    <div className="flex flex-col pb-20 relative z-10 w-full">
      {/* Header */}
      <div className="text-center mt-8 mb-16">
        <h1 className="text-4xl md:text-[56px] font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
          Pilih Paket <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Terbaik</span>
        </h1>
        <p className="text-[20px] text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
          Tingkatkan produktivitas komunikasi Anda tanpa batasan. Upgrade ke Premium kapan saja.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        
        {/* Free Plan */}
        <div className="bg-[#E2E8F0]/30 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 rounded-[2.5rem] p-8 md:p-10 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 flex flex-col h-full">
          <div className="text-[13px] font-extrabold text-slate-500 dark:text-slate-400 tracking-widest uppercase mb-4">Paket Regular</div>
          <div className="text-[48px] font-extrabold text-slate-800 dark:text-white tracking-tighter leading-none mb-4">
            GRATIS
          </div>
          <p className="text-[15px] text-slate-600 dark:text-slate-400 mb-8 pb-8 border-b border-slate-200 dark:border-slate-700 font-medium leading-relaxed">
            Seluruh fitur esensial yang Anda butuhkan untuk komunikasi sehari-hari.
          </p>
          
          <div className="flex flex-col gap-4 mb-10 flex-1">
            {['Maksimal 30 menit per sesi', 'Batas 1.000 karakter translasi/hari', '3 Preset suara natural', 'Riwayat disimpan lokal', '100% bebas iklan'].map((feat, i) => (
              <div key={i} className="flex items-start gap-4 text-[14px] font-bold text-slate-700 dark:text-slate-300">
                <div className="w-5 h-5 rounded-full bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center shrink-0 mt-0.5 shadow-sm"><Check className="w-3 h-3" /></div>
                {feat}
              </div>
            ))}
          </div>
          
          <button className="block text-center w-full py-4 rounded-[1.25rem] text-[15px] font-bold border-2 border-slate-300 dark:border-slate-600 text-[#334155] dark:text-slate-300 bg-white dark:bg-slate-800 cursor-default mt-auto">
            Paket Saat Ini
          </button>
        </div>
        
        {/* Premium Plan - Bulanan */}
        <div className="bg-white dark:bg-slate-900 border-2 border-blue-600 rounded-[2.5rem] p-8 md:p-10 relative shadow-2xl shadow-blue-900/10 lg:scale-105 z-10 overflow-hidden flex flex-col h-full">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-[80px]"></div>
          
          <div className="absolute top-6 right-6 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-[11px] font-bold px-4 py-1.5 rounded-full tracking-widest uppercase shadow-sm">
            Populer
          </div>
          
          <div className="text-[13px] font-extrabold text-blue-600 dark:text-blue-400 tracking-widest uppercase mb-4">Premium Bulanan</div>
          <div className="text-[48px] font-extrabold text-slate-900 dark:text-white tracking-tighter leading-none mb-2 flex items-end gap-2 relative z-10">
            Rp 49<span className="text-[28px] mb-1">rb</span><span className="text-[14px] font-bold text-slate-500 dark:text-slate-400 mb-2">/bln</span>
          </div>
          <p className="text-[15px] text-slate-500 dark:text-slate-400 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800 font-medium leading-relaxed relative z-10">
            Pilihan terbaik untuk mendukung produktivitas penuh tanpa batasan.
          </p>
          
          <div className="flex flex-col gap-4 mb-10 flex-1 relative z-10">
            {['Unlimited durasi sesi STT', 'Unlimited Real-time Translation', 'SmartNote AI Summary', 'Premium Natural Voices (10+)', 'Multi-Speaker Recognition', 'Cloud Backup & Sync'].map((feat, i) => (
              <div key={i} className="flex items-start gap-4 text-[14px] font-bold text-slate-800 dark:text-slate-200">
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-blue-600/20"><Check className="w-3 h-3" /></div>
                {feat}
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => handleSubscribe('Premium Bulanan', 'Rp 49.000')}
            className="block text-center w-full py-4 rounded-[1.25rem] text-[15px] font-bold bg-[#2563EB] hover:bg-blue-700 text-white transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:-translate-y-0.5 mt-auto relative z-10"
          >
            Berlangganan Bulanan
          </button>
        </div>

        {/* Premium Plan - Tahunan */}
        <div className="bg-[#FFF8F3] dark:bg-[#FFF8F3]/5 border border-[#BC4800]/20 dark:border-[#BC4800]/40 rounded-[2.5rem] p-8 md:p-10 hover:border-[#BC4800]/40 transition-all duration-300 relative overflow-hidden flex flex-col h-full">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-100/50 dark:bg-orange-900/20 rounded-full blur-[80px]"></div>
          
          <div className="text-[13px] font-extrabold text-[#BC4800] dark:text-orange-500 tracking-widest uppercase mb-4">Premium Tahunan</div>
          <div className="text-[48px] font-extrabold text-slate-900 dark:text-white tracking-tighter leading-none mb-2 flex items-end gap-2 relative z-10">
            Rp 399<span className="text-[28px] mb-1">rb</span><span className="text-[14px] font-bold text-slate-500 dark:text-slate-400 mb-2">/thn</span>
          </div>
          <p className="text-[15px] text-slate-600 dark:text-slate-400 mb-8 pb-8 border-b border-[#BC4800]/10 dark:border-[#BC4800]/20 font-medium leading-relaxed relative z-10">
            Pilihan paling hemat untuk komitmen jangka panjang. Semua fitur Bulanan!
          </p>
          
          <div className="flex flex-col gap-4 mb-10 flex-1 relative z-10">
            <div className="p-3 bg-[#BC4800]/10 dark:bg-[#BC4800]/20 rounded-xl border border-[#BC4800]/20 dark:border-[#BC4800]/30 flex items-center justify-center mb-2">
              <span className="text-[13px] font-extrabold text-[#BC4800] dark:text-orange-400 uppercase tracking-wider">🔥 Hemat 32%</span>
            </div>
            {['Semua fitur Premium Bulanan', 'Priority Email & In-App Support', 'Akses beta fitur baru lebih dulu'].map((feat, i) => (
              <div key={i} className="flex items-start gap-4 text-[14px] font-bold text-slate-800 dark:text-slate-200">
                <div className="w-5 h-5 rounded-full bg-[#BC4800] dark:bg-orange-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-md"><Check className="w-3 h-3" /></div>
                {feat}
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => handleSubscribe('Premium Tahunan', 'Rp 399.000')}
            className="block text-center w-full py-4 rounded-[1.25rem] text-[15px] font-bold bg-[#BC4800] hover:bg-[#9c3c00] text-white transition-all shadow-[0_4px_14px_rgba(188,72,0,0.3)] hover:-translate-y-0.5 mt-auto relative z-10"
          >
            Berlangganan Tahunan
          </button>
        </div>
      </div>

      {/* Mock Payment Gateway Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Pembayaran Aman</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Simulator Payment Gateway</p>
                </div>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 transition-colors"
                disabled={isProcessing}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30 rounded-2xl p-5 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Paket</span>
                  <span className="font-bold text-slate-900 dark:text-white">{selectedPlan}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Total Pembayaran</span>
                  <span className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">{price}</span>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
                  Pilih metode pembayaran (Demo Mode):
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button className="border-2 border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-3 text-sm font-bold text-indigo-700 dark:text-indigo-400 flex flex-col items-center gap-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gopay_logo.svg/1200px-Gopay_logo.svg.png" alt="Gopay" className="h-4 object-contain brightness-0 dark:invert opacity-70" />
                    GoPay
                  </button>
                  <button className="border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 rounded-xl p-3 text-sm font-bold text-slate-600 dark:text-slate-400 flex flex-col items-center gap-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/OVO_logo.svg/1200px-OVO_logo.svg.png" alt="OVO" className="h-4 object-contain brightness-0 dark:invert opacity-70" />
                    OVO
                  </button>
                </div>
              </div>

              <button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>Bayar Sekarang</>
                )}
              </button>
              
              <p className="text-xs text-center text-slate-400 mt-4">
                Ini adalah lingkungan simulasi/demo. Tidak ada uang sungguhan yang akan ditarik.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

