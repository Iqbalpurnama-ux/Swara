"use client"

import { useState, useEffect } from "react"

type Dictionary = Record<string, string>

const dictionaries: Record<string, Dictionary> = {
  id: {
    "sidebar.home": "Beranda",
    "sidebar.dikte": "Speech to Text",
    "sidebar.tts": "Text to Speech",
    "sidebar.percakapan": "Percakapan 2 Arah",
    "sidebar.terjemah": "Terjemah",
    "sidebar.pengaturan": "Pengaturan",
    "header.dashboard": "Dashboard",
    "header.profile": "Profil Saya",
    "header.settings": "Pengaturan Akun",
    "header.logout": "Keluar",
    "header.notifikasi": "Notifikasi",
    "header.mark_read": "Tandai sudah dibaca",
    "header.choose_language": "Pilih Bahasa",
    "stt.title": "Speech to Text",
    "stt.desc": "Tekan tombol mikrofon di bawah untuk mulai mengubah suara menjadi teks.",
    "stt.listening": "Mendengarkan...",
    "stt.listening_desc": "Bicaralah, kami mengubah ucapan Anda menjadi teks secara real-time.",
    "tts.voice_profile": "Profil Suara",
    "tts.choose_voice": "Pilih Suara",
    "tts.language": "Bahasa",
    "tts.voice": "Suara",
    "tts.premium_voice": "Suara Premium AI",
    "tts.coming_soon": "ElevenLabs (Segera Hadir)",
    "tts.adjustments": "Penyesuaian",
    "tts.speed": "Kecepatan",
    "tts.slow": "Lambat",
    "tts.fast": "Cepat",
    "tts.pitch": "Nada (Pitch)",
    "tts.low": "Rendah",
    "tts.high": "Tinggi",
    "tts.quick_phrases": "Frasa Cepat",
    "tts.phrase_1": "Halo, apa kabar?",
    "tts.phrase_2": "Terima kasih banyak atas bantuannya.",
    "tts.phrase_3": "Bisa tolong diulangi bagian yang tadi?",
    "tts.phrase_4": "Saya setuju dengan pendapat Anda.",
    "stt.delete": "Hapus",
    "stt.save": "Simpan",
    "tts.title": "Text to Speech",
    "tts.desc": "Ketikkan sesuatu dan biarkan AI membacakannya",
    "tts.play": "Putar Suara",
    "tts.placeholder": "Mulai mengetik di sini...",
    "trans.title": "Mode Terjemah",
    "trans.desc": "Tekan tombol mikrofon di bawah untuk mulai menerjemahkan percakapan.",
    "trans.translating": "Menerjemahkan...",
    "conv.partner": "Lawan Bicara",
    "conv.you": "Kamu",
    "conv.send": "Kirim",
    "conv.placeholder": "Ketik balasan Anda di sini...",
    "conv.press_mic": "Tekan mikrofon untuk mulai mendengar lawan bicara...",
    "conv.new_phrase": "Ketik frasa baru...",
    "history.search": "Cari kata kunci...",
    "history.title": "Riwayat Percakapan",
    "history.subtitle": "Kelola semua transkripsi Anda.",
    "history.cloud_on": "Cloud Aktif",
    "history.cloud_off": "Cloud Mati",
    "history.all_history": "Semua Riwayat",
    "history.no_found": "Tidak ada riwayat yang ditemukan.",
    "history.deleted": "Dihapus",
    "history.ai_summary": "AI sedang merangkum...",
    "phrase.title": "Daftar Frasa",
    "phrase.empty": "Tidak ada frasa tersimpan.",
    "phrase.cancel": "Batal",
    "phrase.save": "Simpan",
    "phrase.add": "Tambah",
    "phrase.max": "⚠ Batas maksimum",
    "phrase.reached": "frasa tercapai",
    "phrase.reset": "Kembalikan ke Default",
    "dashboard.welcome": "Selamat Datang,",
    "dashboard.subtitle": "Pilih fitur untuk memulai komunikasi tanpa batas.",
    "dashboard.stt_sub": "Ubah suara jadi teks",
    "dashboard.tts_sub": "Ketik lalu dengarkan",
    "dashboard.trans_sub": "Multi-bahasa real-time",
    "dashboard.recent": "Riwayat Terakhir",
    "dashboard.see_all": "Lihat Semua →",
    "dashboard.failed_history": "Gagal memuat riwayat.",
    "dashboard.no_history": "Belum ada riwayat.",
    "dashboard.start_conv": "Mulai percakapan pertamamu!",
    "dashboard.quota": "Kuota Penggunaan",
    "dashboard.quota_desc": "Batas penggunaan bulanan",
    "quota.premium_access": "Akses Premium",
    "quota.unlimited": "Anda memiliki akses tanpa batas ke semua fitur Swara.",
    "quota.usage": "Penggunaan",
    "quota.mins": "menit",
    "quota.chars": "karakter",
    "quota.upgrade": "Upgrade Premium",
    "settings.title": "Pengaturan",
    "settings.desc": "Sesuaikan pengalaman Swara Anda.",
    "settings.mic_title": "Audio & Mikrofon",
    "settings.mic_label": "Mikrofon Utama",
    "settings.auto_punct": "Tanda Baca Otomatis",
    "settings.auto_punct_desc": "Tambahkan titik/koma saat jeda bicara",
    "settings.main_lang": "Bahasa Utama STT/TTS",
    "settings.show_original": "Tampilkan Teks Asli",
    "settings.show_original_desc": "Saat menerjemahkan teks",
    "settings.app_lang_title": "Tampilan Antarmuka",
    "settings.app_lang": "Bahasa Aplikasi",
    "settings.theme": "Tema Tampilan",
    "settings.privacy": "Privasi & Riwayat",
    "settings.save_history": "Simpan Riwayat Lokal",
    "settings.save_history_desc": "Simpan percakapan di memori browser",
    "settings.delete_history": "Hapus Semua Riwayat",
    "settings.accessibility": "Aksesibilitas",
    "settings.reduced_motion": "Kurangi Gerakan (Animasi)"
  },
  en: {
    "sidebar.home": "Home",
    "sidebar.dikte": "Speech to Text",
    "sidebar.tts": "Text to Speech",
    "sidebar.percakapan": "Two-Way Conversation",
    "sidebar.terjemah": "Translate",
    "sidebar.pengaturan": "Settings",
    "header.dashboard": "Dashboard",
    "header.profile": "My Profile",
    "header.settings": "Account Settings",
    "header.logout": "Logout",
    "header.notifikasi": "Notifications",
    "header.mark_read": "Mark as read",
    "header.choose_language": "Select Language",
    "stt.title": "Speech to Text",
    "stt.desc": "Press the microphone button below to start transcribing voice to text.",
    "stt.listening": "Listening...",
    "stt.listening_desc": "Speak now, we are converting your speech to text in real-time.",
    "tts.voice_profile": "Voice Profile",
    "tts.choose_voice": "Choose Voice",
    "tts.language": "Language",
    "tts.voice": "Voice",
    "tts.premium_voice": "Premium AI Voice",
    "tts.coming_soon": "ElevenLabs (Coming Soon)",
    "tts.adjustments": "Adjustments",
    "tts.speed": "Speed",
    "tts.slow": "Slow",
    "tts.fast": "Fast",
    "tts.pitch": "Pitch",
    "tts.low": "Low",
    "tts.high": "High",
    "tts.quick_phrases": "Quick Phrases",
    "tts.phrase_1": "Hello, how are you?",
    "tts.phrase_2": "Thank you very much for your help.",
    "tts.phrase_3": "Could you please repeat that part?",
    "tts.phrase_4": "I agree with your opinion.",
    "stt.delete": "Delete",
    "stt.save": "Save",
    "tts.title": "Text to Speech",
    "tts.desc": "Type something and let AI read it for you",
    "tts.play": "Play Audio",
    "tts.placeholder": "Start typing here...",
    "trans.title": "Translate Mode",
    "trans.desc": "Press the microphone button below to start translating the conversation.",
    "trans.translating": "Translating...",
    "conv.partner": "Partner",
    "conv.you": "You",
    "conv.send": "Send",
    "conv.placeholder": "Type your reply here...",
    "conv.press_mic": "Press microphone to start listening to partner...",
    "conv.new_phrase": "Type a new phrase...",
    "history.search": "Search keywords...",
    "history.title": "Conversation History",
    "history.subtitle": "Manage all your transcriptions.",
    "history.cloud_on": "Cloud Sync On",
    "history.cloud_off": "Cloud Sync Off",
    "history.all_history": "All History",
    "history.no_found": "No history found.",
    "history.deleted": "Deleted",
    "history.ai_summary": "AI is summarizing...",
    "phrase.title": "Quick Phrases",
    "phrase.empty": "No phrases saved.",
    "phrase.cancel": "Cancel",
    "phrase.save": "Save",
    "phrase.add": "Add",
    "phrase.max": "⚠ Maximum limit",
    "phrase.reached": "phrases reached",
    "phrase.reset": "Reset to Default",
    "dashboard.welcome": "Welcome,",
    "dashboard.subtitle": "Choose a feature to start communicating seamlessly.",
    "dashboard.stt_sub": "Voice to text",
    "dashboard.tts_sub": "Type and listen",
    "dashboard.trans_sub": "Real-time multi-language",
    "dashboard.recent": "Recent History",
    "dashboard.see_all": "See All →",
    "dashboard.failed_history": "Failed to load history.",
    "dashboard.no_history": "No history yet.",
    "dashboard.start_conv": "Start your first conversation!",
    "dashboard.quota": "Usage Quota",
    "dashboard.quota_desc": "Monthly usage limit",
    "quota.premium_access": "Premium Access",
    "quota.unlimited": "You have unlimited access to all Swara features.",
    "quota.usage": "Usage",
    "quota.mins": "mins",
    "quota.chars": "chars",
    "quota.upgrade": "Upgrade to Premium",
    "settings.title": "Settings",
    "settings.desc": "Customize your Swara experience.",
    "settings.mic_title": "Audio & Microphone",
    "settings.mic_label": "Main Microphone",
    "settings.auto_punct": "Auto Punctuation",
    "settings.auto_punct_desc": "Add periods/commas during pauses",
    "settings.main_lang": "Main STT/TTS Language",
    "settings.show_original": "Show Original Text",
    "settings.show_original_desc": "When translating text",
    "settings.app_lang_title": "Interface Appearance",
    "settings.app_lang": "App Language",
    "settings.theme": "Theme",
    "settings.privacy": "Privacy & History",
    "settings.save_history": "Save Local History",
    "settings.save_history_desc": "Save conversations in browser memory",
    "settings.delete_history": "Delete All History",
    "settings.accessibility": "Accessibility",
    "settings.reduced_motion": "Reduced Motion"
  }
}

export function useTranslation() {
  const [lang, setLang] = useState("id")

  useEffect(() => {
    const loadLang = () => {
      const saved = localStorage.getItem("swara_settings")
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          if (parsed.appLanguage) {
            setLang(parsed.appLanguage)
          }
        } catch (e) {
          console.error(e)
        }
      }
    }
    
    loadLang()

    // Listen to custom event for dynamic updates without reload
    window.addEventListener("swaraSettingsUpdate", loadLang)
    return () => window.removeEventListener("swaraSettingsUpdate", loadLang)
  }, [])

  const t = (key: string): string => {
    const dictionary = dictionaries[lang] || dictionaries["id"]
    return dictionary[key] || key
  }

  return { t, lang }
}

export function triggerSettingsUpdate() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("swaraSettingsUpdate"))
  }
}
