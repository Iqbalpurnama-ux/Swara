"use client"

import { useState, useRef, useEffect } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { UserCircle, Mail, Shield, CheckCircle2, Zap, Camera, Calendar, Lock, Bell, Sparkles } from "lucide-react"
import { getUserRole } from "@/app/actions/user"

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState("data-diri")
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [realRole, setRealRole] = useState("regular")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load avatar from localStorage and sync session data
  useEffect(() => {
    const saved = localStorage.getItem("swara_avatar")
    if (saved) setProfileImage(saved)
    
    getUserRole().then(role => setRealRole(role)).catch(console.error)
  }, [])

  // Sync name from session
  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name)
    }
    if (session?.user?.image && !localStorage.getItem("swara_avatar")) {
      setProfileImage(session.user.image)
    }
  }, [session])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setProfileImage(base64String)
        localStorage.setItem("swara_avatar", base64String)
        window.dispatchEvent(new Event("avatarUpdated"))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDeleteImage = () => {
    setProfileImage(null)
    localStorage.removeItem("swara_avatar")
    window.dispatchEvent(new Event("avatarUpdated"))
  }

  const handleSave = () => {
    // Save name to localStorage for now
    localStorage.setItem("swara_profile_name", name)
    setToastMessage("Perubahan berhasil disimpan!")
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const userEmail = session?.user?.email || ""
  const userImage = session?.user?.image || null

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8 relative z-10 pb-20">

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-8 right-8 bg-white dark:bg-slate-800 border border-emerald-100 dark:border-emerald-900/50 shadow-xl rounded-xl p-4 flex items-center gap-3 z-50 animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <span className="font-bold text-slate-800 dark:text-white text-sm">{toastMessage}</span>
        </div>
      )}

      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
          <UserCircle className="w-8 h-8 text-indigo-600 dark:text-indigo-400" /> Profil Pengguna
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">Kelola informasi pribadi, keamanan akun, dan status langganan Anda.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Sidebar Navigation & Subscription Card */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Navigation Tabs */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white dark:border-slate-700 p-3 rounded-[2rem] shadow-sm flex flex-col gap-2">
            <button 
              onClick={() => setActiveTab("data-diri")}
              className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold transition-all ${
                activeTab === "data-diri" ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              <UserCircle className="w-5 h-5" /> Data Diri
            </button>
            <button 
              onClick={() => setActiveTab("keamanan")}
              className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold transition-all ${
                activeTab === "keamanan" ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              <Lock className="w-5 h-5" /> Keamanan & Password
            </button>
            <button 
              onClick={() => setActiveTab("notifikasi")}
              className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold transition-all ${
                activeTab === "notifikasi" ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              <Bell className="w-5 h-5" /> Preferensi Notifikasi
            </button>
          </div>

          {/* Subscription Status Card */}
          <div className={`p-8 rounded-[2rem] shadow-xl text-white relative overflow-hidden ${
            realRole === "premium" 
              ? "bg-gradient-to-br from-indigo-600 to-blue-800 dark:from-indigo-900 dark:to-blue-900" 
              : "bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900"
          }`}>
            <div className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-[40px] ${realRole === "premium" ? "bg-white/20" : "bg-blue-500/20"}`}></div>
            
            <div className={`flex items-center gap-2 mb-6 ${realRole === "premium" ? "text-indigo-200" : "text-blue-400"}`}>
              <Shield className="w-5 h-5" />
              <span className="text-sm font-bold tracking-widest uppercase">Status Akun</span>
            </div>
            
            {realRole === "premium" ? (
              <>
                <h2 className="text-3xl font-black mb-2 flex items-center gap-2">
                  <Sparkles className="w-8 h-8 text-yellow-300" /> Premium Plan
                </h2>
                <p className="text-indigo-100 text-sm font-medium mb-8">Anda menikmati akses tanpa batas ke semua fitur premium.</p>
                <button disabled className="w-full bg-white/20 text-white font-bold px-6 py-4 rounded-xl cursor-default flex items-center justify-center gap-2">
                  Berlangganan Aktif
                </button>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-black mb-2">Regular Plan</h2>
                <p className="text-slate-400 text-sm font-medium mb-8">Anda menggunakan paket gratis. Terbatas 60 menit/sesi STT.</p>
                <Link href="/premium" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-6 py-4 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all flex items-center justify-center gap-2 group">
                  <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Upgrade ke Premium
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Right Column: Main Content */}
        <div className="lg:col-span-8">
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white dark:border-slate-700 p-8 md:p-10 rounded-[2.5rem] shadow-sm min-h-[600px]">
            
            {activeTab === "data-diri" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white mb-8 border-b border-slate-100 dark:border-slate-700 pb-6">Informasi Data Diri</h2>
                
                {/* Profile Picture Upload */}
                <div className="flex items-center gap-8 mb-10">
                  <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <div className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 shadow-lg flex items-center justify-center overflow-hidden bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : userImage ? (
                        <img src={userImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <UserCircle className="w-16 h-16 text-slate-400 dark:text-slate-500" />
                      )}
                    </div>
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                    {/* Hidden input */}
                    <input 
                      type="file" 
                      accept="image/*" 
                      ref={fileInputRef} 
                      onChange={handleImageUpload} 
                      className="hidden" 
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white">Foto Profil</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-3">Format disarankan: JPG, PNG, atau GIF. Ukuran maksimal 2MB.</p>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="text-sm font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                      >
                        Ubah Foto
                      </button>
                      {profileImage && (
                        <button 
                          onClick={handleDeleteImage}
                          className="text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-lg transition-colors"
                        >
                          Hapus
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Nama Lengkap</label>
                    <div className="relative">
                      <UserCircle className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                      <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Masukkan nama lengkap"
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-12 pr-4 font-semibold text-slate-800 dark:text-white outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Alamat Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                      <input 
                        type="email" 
                        disabled 
                        value={userEmail}
                        className="w-full bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-12 pr-4 font-semibold text-slate-500 dark:text-slate-500 cursor-not-allowed" 
                      />
                      {userEmail && <CheckCircle2 className="absolute right-4 top-3.5 w-5 h-5 text-emerald-500" />}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1.5 font-medium">Email telah diverifikasi dan tidak dapat diubah.</p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Tanggal Lahir</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                      <input type="date" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-12 pr-4 font-semibold text-slate-800 dark:text-white outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors" />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Bio Singkat</label>
                    <textarea rows={3} placeholder="Ceritakan sedikit tentang Anda..." className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 font-semibold text-slate-800 dark:text-white outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors resize-none"></textarea>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button 
                    onClick={handleSave}
                    className="bg-indigo-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            )}

            {activeTab === "keamanan" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white mb-8 border-b border-slate-100 dark:border-slate-700 pb-6">Keamanan Akun</h2>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 rounded-2xl p-6 mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="font-bold text-blue-800 dark:text-blue-300">Metode Login Anda</span>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-400 font-medium">
                    {session?.user?.email ? `Anda masuk menggunakan akun ${userEmail}. Keamanan akun Anda dikelola oleh penyedia autentikasi (Google / Magic Link).` : "Memuat informasi akun..."}
                  </p>
                </div>
              </div>
            )}

            {activeTab === "notifikasi" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white mb-8 border-b border-slate-100 dark:border-slate-700 pb-6">Preferensi Notifikasi</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <div>
                      <div className="font-bold text-slate-800 dark:text-white">Email Pembaruan Produk</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">Dapatkan info fitur terbaru dan diskon paket premium.</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-slate-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <div>
                      <div className="font-bold text-slate-800 dark:text-white">Pemberitahuan Sesi</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">Peringatan saat batas waktu penggunaan hampir habis (Regular Plan).</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-slate-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}
