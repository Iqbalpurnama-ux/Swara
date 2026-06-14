"use client"

import { useState, useRef, useEffect } from "react"
import { Bell, Globe2, UserCircle, LogOut, Settings, ChevronDown, CheckCircle2, AlertCircle, Info } from "lucide-react"
import Image from "next/image"
import { signOut } from "next-auth/react"
import { AppNotification, getNotifications, markAllNotificationsRead } from "@/lib/notifications"
import { useTranslation } from "@/lib/i18n"

interface HeaderProps {
  userName?: string
  language?: string
}

export function Header({ userName, language = "id-ID" }: HeaderProps) {
  const { t } = useTranslation()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifMenu, setShowNotifMenu] = useState(false)
  const [showLangMenu, setShowLangMenu] = useState(false)
  const [avatar, setAvatar] = useState<string | null>(null)
  const [notifications, setNotifications] = useState<AppNotification[]>([])
  const menuRef = useRef<HTMLDivElement>(null)

  // Ambil avatar dari localStorage & dengarkan event update
  useEffect(() => {
    const savedAvatar = localStorage.getItem("swara_avatar")
    if (savedAvatar) setAvatar(savedAvatar)

    const handleAvatarUpdate = () => {
      setAvatar(localStorage.getItem("swara_avatar"))
    }
    
    window.addEventListener("avatarUpdated", handleAvatarUpdate)
    
    // Load notifications
    setNotifications(getNotifications())
    const handleNotifUpdate = () => {
      setNotifications(getNotifications())
    }
    window.addEventListener("swaraNotificationUpdate", handleNotifUpdate)

    return () => {
      window.removeEventListener("avatarUpdated", handleAvatarUpdate)
      window.removeEventListener("swaraNotificationUpdate", handleNotifUpdate)
    }
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  // Tutup menu saat klik di luar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false)
        setShowNotifMenu(false)
        setShowLangMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="fixed top-0 left-0 lg:left-[260px] right-0 h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-40 flex items-center justify-between px-4 sm:px-8 transition-colors duration-300">
      
      {/* Search & Breadcrumbs */}
      <div className="flex-1 flex items-center gap-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white hidden sm:block">{t("header.dashboard")}</h2>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 sm:gap-6" ref={menuRef}>
        
        {/* Language Selector */}
        <div className="relative hidden sm:block">
          <button 
            onClick={() => { setShowLangMenu(!showLangMenu); setShowNotifMenu(false); setShowProfileMenu(false); }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none"
          >
            <Globe2 className="w-4 h-4" />
            {language}
            <ChevronDown className="w-3 h-3 opacity-50" />
          </button>
          
          {showLangMenu && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-gray-100 dark:border-slate-700 py-3 z-50 animate-in fade-in slide-in-from-top-2 max-h-80 overflow-y-auto">
              <div className="px-4 pb-2 mb-2 border-b border-gray-100 dark:border-slate-700">
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">{t("header.choose_language")}</span>
              </div>
              {[
                { code: "id-ID", name: "Indonesia" },
                { code: "en-US", name: "Inggris (US)" },
                { code: "ar-SA", name: "Arab" },
                { code: "zh-CN", name: "Mandarin" },
                { code: "ja-JP", name: "Jepang" },
                { code: "ko-KR", name: "Korea" },
                { code: "fr-FR", name: "Prancis" },
                { code: "de-DE", name: "Jerman" },
                { code: "es-ES", name: "Spanyol" },
                { code: "ms-MY", name: "Melayu" }
              ].map(lang => (
                <button 
                  key={lang.code}
                  onClick={() => setShowLangMenu(false)}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-700 dark:hover:text-blue-400 font-semibold transition-colors flex items-center justify-between group"
                >
                  {lang.name}
                  <span className="text-xs text-gray-400 font-normal group-hover:text-blue-400">{lang.code.split('-')[0].toUpperCase()}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Notification Dropdown */}
        <div className="relative">
          <button 
            onClick={() => { setShowNotifMenu(!showNotifMenu); setShowProfileMenu(false); setShowLangMenu(false); }}
            className="relative p-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full animate-pulse ring-2 ring-white dark:ring-slate-900"></span>
            )}
          </button>
          
          {showNotifMenu && (
            <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-gray-100 dark:border-slate-700 py-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-5 pb-3 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
                <span className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  {t("header.notifikasi")} {unreadCount > 0 && <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">{unreadCount}</span>}
                </span>
                {unreadCount > 0 && (
                  <span onClick={markAllNotificationsRead} className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-md cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">{t("header.mark_read")}</span>
                )}
              </div>
              <div className="flex flex-col py-2 max-h-80 overflow-y-auto custom-scrollbar">
                {notifications.length === 0 ? (
                  <div className="px-5 py-8 text-center text-gray-400 dark:text-gray-500 text-sm">Tidak ada notifikasi</div>
                ) : (
                  notifications.map(notif => (
                    <div key={notif.id} className={`px-5 py-3 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer border-l-2 ${!notif.read ? 'border-blue-500 bg-blue-50/30 dark:bg-blue-900/10' : 'border-transparent'}`}>
                      <div className="flex gap-3">
                        <div className="mt-0.5 shrink-0">
                          {notif.type === 'success' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                          {notif.type === 'warning' && <AlertCircle className="w-4 h-4 text-orange-500" />}
                          {notif.type === 'error' && <AlertCircle className="w-4 h-4 text-red-500" />}
                          {notif.type === 'info' && <Info className="w-4 h-4 text-blue-500" />}
                        </div>
                        <div>
                          <p className={`text-sm font-semibold ${!notif.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>{notif.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notif.message}</p>
                          <p className="text-[10px] text-gray-400 mt-2 font-medium">
                            {new Date(notif.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} - {new Date(notif.timestamp).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* User Profile Dropdown */}
        <div className="relative border-l border-gray-100 dark:border-slate-700 pl-5">
          <button 
            onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifMenu(false); setShowLangMenu(false); }}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 border-2 border-white dark:border-slate-800 shadow-sm flex items-center justify-center text-white overflow-hidden">
              {avatar ? (
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <UserCircle className="w-5 h-5" />
              )}
            </div>
            <div className="hidden sm:flex flex-col items-start">
              <span className="text-sm font-bold text-gray-800 dark:text-white">{userName || "Pengguna"}</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
          </button>
          
          {showProfileMenu && (
            <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-gray-100 dark:border-slate-700 py-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-5 py-2 mb-2 border-b border-gray-100 dark:border-slate-700">
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 w-fit px-2 py-1 rounded-md mb-1 border border-emerald-100 dark:border-emerald-800/50">Regular Plan</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Batas 30 menit tersisa</div>
              </div>
              <div className="flex flex-col">
                <button className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 font-semibold transition-colors w-full text-left">
                  <UserCircle className="w-4 h-4 text-gray-400 dark:text-gray-500" /> {t("header.profile")}
                </button>
                <button className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 font-semibold transition-colors w-full text-left">
                  <Settings className="w-4 h-4 text-gray-400 dark:text-gray-500" /> {t("header.settings")}
                </button>
                <div className="h-px bg-gray-100 dark:bg-slate-700 my-2"></div>
                <button 
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="flex items-center gap-3 px-5 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-bold transition-colors w-full text-left"
                >
                  <LogOut className="w-4 h-4" /> {t("header.logout")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
