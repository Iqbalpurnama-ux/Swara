"use client"

import { useState, useEffect, useRef } from "react"
import { Settings2, Volume2, Mic, Globe2, Bell, Shield, Palette, Type, Trash2, CheckCircle2, Accessibility, Timer } from "lucide-react"
import { useTheme } from "next-themes"
import { useUiStore } from "@/store/uiStore"
import { saveNotification } from "@/lib/notifications"
import { useTranslation, triggerSettingsUpdate } from "@/lib/i18n"

export default function SettingsPage() {
  const { t } = useTranslation()
  const [microphones, setMicrophones] = useState<MediaDeviceInfo[]>([])
  const [selectedMic, setSelectedMic] = useState("")
  const [autoPunctuation, setAutoPunctuation] = useState(true)
  const [mainLanguage, setMainLanguage] = useState("id-ID")
  const [appLanguage, setAppLanguage] = useState("id")
  const [showOriginalText, setShowOriginalText] = useState(true)

  const [isMainLangOpen, setIsMainLangOpen] = useState(false)
  const [isAppLangOpen, setIsAppLangOpen] = useState(false)
  const [isMicOpen, setIsMicOpen] = useState(false)
  const { theme: nextTheme, setTheme: setNextTheme } = useTheme()
  const [theme, setTheme] = useState("sistem")
  const [textSize, setTextSize] = useState(3)
  const [saveHistory, setSaveHistory] = useState(true)
  
  const [showToast, setShowToast] = useState(false)

  // Accessibility
  const [reducedMotion, setReducedMotion] = useState(false)
  const [notifDuration, setNotifDuration] = useState(2500)
  const { setReducedMotion: setReducedMotionStore, setNotificationDuration: setNotifDurationStore } = useUiStore()

  // Load saved settings & microphones
  useEffect(() => {
    // Fetch microphones
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {
        navigator.mediaDevices.enumerateDevices().then((devices) => {
          const audioInputs = devices.filter(device => device.kind === 'audioinput')
          setMicrophones(audioInputs)
        })
      }).catch(err => console.error("Mic access denied", err))
    }

    // Load from LocalStorage
    const saved = localStorage.getItem("swara_settings")
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed.selectedMic) setSelectedMic(parsed.selectedMic)
      if (parsed.autoPunctuation !== undefined) setAutoPunctuation(parsed.autoPunctuation)
      if (parsed.mainLanguage) setMainLanguage(parsed.mainLanguage)
      if (parsed.appLanguage) setAppLanguage(parsed.appLanguage)
      if (parsed.showOriginalText !== undefined) setShowOriginalText(parsed.showOriginalText)
      if (parsed.theme) {
        setTheme(parsed.theme)
        // Only apply theme if user explicitly saved it before
        // Don't call setNextTheme here to avoid overriding current state
      }
      if (parsed.textSize) setTextSize(parsed.textSize)
      if (parsed.saveHistory !== undefined) setSaveHistory(parsed.saveHistory)
      if (parsed.reducedMotion !== undefined) { setReducedMotion(parsed.reducedMotion); setReducedMotionStore(parsed.reducedMotion) }
      if (parsed.notifDuration) { setNotifDuration(parsed.notifDuration); setNotifDurationStore(parsed.notifDuration) }
    }
  }, [])

  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const showConfirmModalRef = useRef(false) // unused but for reference
  const isLoadedRef = useRef(false)
  const notifTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Mark as loaded after first render + localStorage read
  useEffect(() => {
    // Small delay to ensure the load effect runs first
    const timer = setTimeout(() => { isLoadedRef.current = true }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Auto-save when state changes (only after initial load)
  useEffect(() => {
    if (!isLoadedRef.current) return
    const settings = { selectedMic, autoPunctuation, mainLanguage, appLanguage, showOriginalText, theme, textSize, saveHistory, reducedMotion, notifDuration }
    localStorage.setItem("swara_settings", JSON.stringify(settings))
    triggerSettingsUpdate()
    
    if (notifTimerRef.current) clearTimeout(notifTimerRef.current)
    notifTimerRef.current = setTimeout(() => {
      saveNotification(t("settings.title"), t("settings.desc"), "success")
    }, 1000)
    
  }, [selectedMic, autoPunctuation, mainLanguage, appLanguage, showOriginalText, theme, textSize, saveHistory, reducedMotion, notifDuration])

  const executeClearHistory = () => {
    localStorage.removeItem("swara_history") // Assuming history is saved here
    setShowConfirmModal(false)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8 relative z-10 pb-20">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-8 right-8 bg-white border border-emerald-100 shadow-xl rounded-xl p-4 flex items-center gap-3 z-50 animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <span className="font-bold text-slate-800 text-sm">Riwayat berhasil dihapus!</span>
        </div>
      )}

      {/* Confirmation Modal Pop-up */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-[2rem] shadow-2xl p-8 max-w-md w-full mx-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500 mx-auto mb-6">
              <Trash2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-center text-slate-900 mb-3">Hapus Riwayat?</h3>
            <p className="text-slate-500 text-center font-medium mb-8">
              Apakah Anda yakin ingin menghapus semua riwayat percakapan lokal? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={executeClearHistory}
                className="flex-1 py-3.5 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/20 transition-colors"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
          <Settings2 className="w-8 h-8 text-blue-600 dark:text-blue-400" /> {t("settings.title")}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">{t("settings.desc")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Audio Settings */}
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white dark:border-slate-700 p-6 md:p-8 rounded-[2rem] shadow-sm relative z-30">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400"><Mic className="w-5 h-5" /></div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">{t("settings.mic_title")}</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-2">{t("settings.mic_label")}</label>
              <div className="relative">
                <button
                  onClick={() => setIsMicOpen(!isMicOpen)}
                  className="w-full flex items-center justify-between bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm font-medium text-slate-700 dark:text-slate-300 outline-none focus:border-blue-500 transition-colors"
                >
                  <span className="truncate">
                    {selectedMic ? microphones.find(m => m.deviceId === selectedMic)?.label || "Mikrofon Terpilih" : "Default Sistem"}
                  </span>
                  <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {isMicOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsMicOpen(false)}></div>
                    <div className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] overflow-hidden max-h-60 overflow-y-auto">
                      <button
                        onClick={() => { setSelectedMic(""); setIsMicOpen(false) }}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center gap-3 ${selectedMic === "" ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                      >
                        {selectedMic === "" ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <div className="w-4 h-4 shrink-0" />}
                        Default Sistem
                      </button>
                      {microphones.map((mic, idx) => (
                        <button
                          key={mic.deviceId || idx}
                          onClick={() => { setSelectedMic(mic.deviceId); setIsMicOpen(false) }}
                          className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center gap-3 ${selectedMic === mic.deviceId ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                        >
                          {selectedMic === mic.deviceId ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <div className="w-4 h-4 shrink-0" />}
                          <span className="truncate">{mic.label || `Mikrofon ${idx + 1}`}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-sm text-slate-800 dark:text-white">{t("settings.auto_punct")}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t("settings.auto_punct_desc")}</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={autoPunctuation} onChange={(e) => setAutoPunctuation(e.target.checked)} />
                <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-slate-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Translation Settings */}
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white dark:border-slate-700 p-6 md:p-8 rounded-[2rem] shadow-sm relative z-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400"><Globe2 className="w-5 h-5" /></div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">{t("sidebar.terjemah")}</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-2">{t("settings.main_lang")}</label>
              <div className="relative">
                <button
                  onClick={() => setIsMainLangOpen(!isMainLangOpen)}
                  className="w-full flex items-center justify-between bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm font-medium text-slate-700 dark:text-slate-300 outline-none focus:border-orange-500 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    {mainLanguage === "id-ID" && "🇮🇩 Indonesia"}
                    {mainLanguage === "en-US" && "🇺🇸 Inggris"}
                    {mainLanguage === "ar-SA" && "🇸🇦 Arab"}
                    {mainLanguage === "zh-CN" && "🇨🇳 Mandarin"}
                    {mainLanguage === "ja-JP" && "🇯🇵 Jepang"}
                    {mainLanguage === "ko-KR" && "🇰🇷 Korea"}
                    {mainLanguage === "fr-FR" && "🇫🇷 Prancis"}
                    {mainLanguage === "de-DE" && "🇩🇪 Jerman"}
                    {mainLanguage === "es-ES" && "🇪🇸 Spanyol"}
                    {mainLanguage === "ms-MY" && "🇲🇾 Melayu"}
                  </span>
                  <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {isMainLangOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsMainLangOpen(false)}></div>
                    <div className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] overflow-hidden">
                      {[
                        { value: "id-ID", label: "🇮🇩 Indonesia" },
                        { value: "en-US", label: "🇺🇸 Inggris" },
                        { value: "ar-SA", label: "🇸🇦 Arab" },
                        { value: "zh-CN", label: "🇨🇳 Mandarin" },
                        { value: "ja-JP", label: "🇯🇵 Jepang" },
                        { value: "ko-KR", label: "🇰🇷 Korea" },
                        { value: "fr-FR", label: "🇫🇷 Prancis" },
                        { value: "de-DE", label: "🇩🇪 Jerman" },
                        { value: "es-ES", label: "🇪🇸 Spanyol" },
                        { value: "ms-MY", label: "🇲🇾 Melayu" }
                      ].map((lang) => (
                        <button
                          key={lang.value}
                          onClick={() => { setMainLanguage(lang.value); setIsMainLangOpen(false) }}
                          className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center gap-3 ${mainLanguage === lang.value ? 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-bold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                        >
                          {mainLanguage === lang.value ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <div className="w-4 h-4 shrink-0" />}
                          {lang.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-sm text-slate-800 dark:text-white">{t("settings.show_original")}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t("settings.show_original_desc")}</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={showOriginalText} onChange={(e) => setShowOriginalText(e.target.checked)} />
                <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-slate-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white dark:border-slate-700 p-6 md:p-8 rounded-[2rem] shadow-sm relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400"><Palette className="w-5 h-5" /></div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">{t("settings.app_lang_title")}</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-2">{t("settings.app_lang")}</label>
              <div className="relative mb-6">
                <button
                  onClick={() => setIsAppLangOpen(!isAppLangOpen)}
                  className="w-full flex items-center justify-between bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm font-medium text-slate-700 dark:text-slate-300 outline-none focus:border-purple-500 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    {appLanguage === "id" && "🇮🇩 Bahasa Indonesia"}
                    {appLanguage === "en" && "🇺🇸 English"}
                  </span>
                  <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {isAppLangOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsAppLangOpen(false)}></div>
                    <div className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] overflow-hidden">
                      {[
                        { value: "id", label: "🇮🇩 Bahasa Indonesia" },
                        { value: "en", label: "🇺🇸 English" }
                      ].map((lang) => (
                        <button
                          key={lang.value}
                          onClick={() => { setAppLanguage(lang.value); setIsAppLangOpen(false) }}
                          className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center gap-3 ${appLanguage === lang.value ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-bold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                        >
                          {appLanguage === lang.value ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <div className="w-4 h-4 shrink-0" />}
                          {lang.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-3">{t("settings.theme")}</label>
              <div className="grid grid-cols-3 gap-3 bg-slate-100/50 dark:bg-slate-900/50 p-1 rounded-2xl">
                <button 
                  onClick={() => { setTheme("terang"); setNextTheme("light"); }} 
                  className={`${theme === "terang" ? "bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-400 shadow-sm ring-1 ring-slate-200 dark:ring-slate-600" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"} rounded-xl py-2.5 font-bold text-sm transition-all`}
                >
                  Terang
                </button>
                <button 
                  onClick={() => { setTheme("gelap"); setNextTheme("dark"); }} 
                  className={`${theme === "gelap" ? "bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-400 shadow-sm ring-1 ring-slate-200 dark:ring-slate-600" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"} rounded-xl py-2.5 font-bold text-sm transition-all`}
                >
                  Gelap
                </button>
                <button 
                  onClick={() => { setTheme("sistem"); setNextTheme("system"); }} 
                  className={`${theme === "sistem" ? "bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-400 shadow-sm ring-1 ring-slate-200 dark:ring-slate-600" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"} rounded-xl py-2.5 font-bold text-sm transition-all`}
                >
                  Sistem
                </button>
              </div>
            </div>
            
            <div className="pt-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-4 flex items-center gap-2"><Type className="w-4 h-4 text-purple-500" /> Ukuran Teks (Live Caption)</label>
              <div className="relative w-full h-12 flex items-center">
                {/* Custom Track */}
                <div className="absolute left-0 right-0 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 transition-all duration-300 ease-out" style={{ width: `${(textSize - 1) * 25}%` }}></div>
                </div>
                
                {/* Native Range Input (Invisible overlay for interaction) */}
                <input 
                  type="range" 
                  min="1" 
                  max="5" 
                  value={textSize} 
                  onChange={(e) => setTextSize(parseInt(e.target.value))} 
                  className="absolute w-full opacity-0 cursor-pointer h-full z-10" 
                />
                
                {/* Custom Thumb */}
                <div 
                  className="absolute w-6 h-6 bg-white dark:bg-slate-800 border-2 border-purple-500 rounded-full shadow-md transition-all duration-300 ease-out flex items-center justify-center z-0 pointer-events-none"
                  style={{ left: `calc(${(textSize - 1) * 25}% - ${((textSize - 1) * 25) / 100 * 24}px)` }} // Adjust for thumb width
                >
                  <div className="w-2 h-2 bg-purple-500 rounded-full opacity-0"></div>
                </div>
              </div>
              <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-2 px-1">
                <span className={textSize === 1 ? "text-purple-600 dark:text-purple-400" : ""}>Kecil</span>
                <span className={textSize === 3 ? "text-purple-600 dark:text-purple-400" : ""}>Normal</span>
                <span className={textSize === 5 ? "text-purple-600 dark:text-purple-400" : ""}>Besar</span>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy & History Settings */}
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white dark:border-slate-700 p-6 md:p-8 rounded-[2rem] shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400"><Shield className="w-5 h-5" /></div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">{t("settings.privacy")}</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-sm text-slate-800 dark:text-white">{t("settings.save_history")}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t("settings.save_history_desc")}</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={saveHistory} onChange={(e) => setSaveHistory(e.target.checked)} />
                <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-slate-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
              <div className="font-bold text-sm text-slate-800 dark:text-white mb-3">Manajemen Data</div>
              <button 
                onClick={() => setShowConfirmModal(true)}
                className="w-full flex items-center justify-center gap-2 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-bold py-3 rounded-xl transition-colors"
              >
                <Trash2 className="w-4 h-4" /> {t("settings.delete_history")}
              </button>
            </div>
          </div>
        </div>

        {/* Accessibility Settings */}
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white dark:border-slate-700 p-6 md:p-8 rounded-[2rem] shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400"><Accessibility className="w-5 h-5" /></div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">{t("settings.accessibility")}</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-sm text-slate-800 dark:text-white">{t("settings.reduced_motion")}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Matikan animasi dan transisi</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={reducedMotion} onChange={(e) => { setReducedMotion(e.target.checked); setReducedMotionStore(e.target.checked) }} />
                <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-slate-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
              </label>
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-2 flex items-center gap-2">
                <Timer className="w-4 h-4 text-cyan-500" /> Durasi Notifikasi
              </label>
              <div className="grid grid-cols-3 gap-3 bg-slate-100/50 dark:bg-slate-900/50 p-1 rounded-2xl">
                <button 
                  onClick={() => { setNotifDuration(1000); setNotifDurationStore(1000) }}
                  className={`${notifDuration === 1000 ? "bg-white dark:bg-slate-700 text-cyan-700 dark:text-cyan-400 shadow-sm ring-1 ring-slate-200 dark:ring-slate-600" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"} rounded-xl py-2.5 font-bold text-sm transition-all`}
                >
                  1 detik
                </button>
                <button 
                  onClick={() => { setNotifDuration(2500); setNotifDurationStore(2500) }}
                  className={`${notifDuration === 2500 ? "bg-white dark:bg-slate-700 text-cyan-700 dark:text-cyan-400 shadow-sm ring-1 ring-slate-200 dark:ring-slate-600" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"} rounded-xl py-2.5 font-bold text-sm transition-all`}
                >
                  2.5 detik
                </button>
                <button 
                  onClick={() => { setNotifDuration(5000); setNotifDurationStore(5000) }}
                  className={`${notifDuration === 5000 ? "bg-white dark:bg-slate-700 text-cyan-700 dark:text-cyan-400 shadow-sm ring-1 ring-slate-200 dark:ring-slate-600" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"} rounded-xl py-2.5 font-bold text-sm transition-all`}
                >
                  5 detik
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
