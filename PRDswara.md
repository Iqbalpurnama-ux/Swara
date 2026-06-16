# 🎙 SWARA — Product Requirements Document

> **Speech-to-Text & Text-to-Speech Platform untuk Tunarungu**
> Aksesibilitas tanpa batas. Komunikasi tanpa hambatan.

---

```
╔══════════════════════════════════════════════════════════════════════╗
║  SONIC CLARITY DESIGN SYSTEM — TOKEN REFERENCE                      ║
╠══════════════════════════════════════════════════════════════════════╣
║  Primary    #2563EB  ·  Secondary  #1E293B  ·  Tertiary   #BC4800   ║
║  Neutral BG #F8FAFC  ·  Text Dark  #0F172A  ·  Text Body  #334155   ║
║  Success    #22C55E  ·  Warning    #EAB308  ·  Error      #EF4444   ║
║  Font Family: Inter (400 · 500 · 600 · 700 · 800)                   ║
╚══════════════════════════════════════════════════════════════════════╝
```

| **Versi Dokumen** | `2.1.0` (Updated Architecture & Phase 5 Readiness) |
| --- | --- |
| **Berdasarkan Blueprint** | Swara Blueprint v2.0.0 |
| **Tanggal** | 10 Juni 2026 |
| **Status** | ✅ **Final — Siap Development** |
| **Platform Target** | Web (Next.js 14) · Mobile (Flutter) |
| **Design System** | Sonic Clarity · Font: Inter · Primary `#2563EB` |

---

> **Tentang Dokumen Ini**
> PRD ini adalah spesifikasi teknis lengkap yang menjadi panduan utama bagi tim engineering, desainer, dan QA dalam proses pengembangan Swara dari awal hingga produksi. Seluruh spesifikasi visual mengacu pada **Design System Sonic Clarity** dengan palet warna dan tipografi yang telah ditetapkan.

---

## Daftar Isi

- [1. Ringkasan Eksekutif](#1-ringkasan-eksekutif)
- [2. Design System — Sonic Clarity](#2-design-system--sonic-clarity)
- [3. Pengguna & User Persona](#3-pengguna--user-persona)
- [4. Spesifikasi Fitur — Regular Plan](#4-spesifikasi-fitur--regular-plan-gratis)
- [5. Spesifikasi Fitur — Aksesibilitas Khusus](#5-spesifikasi-fitur--aksesibilitas-khusus)
- [6. Spesifikasi Fitur — Premium Plan](#6-spesifikasi-fitur--premium-plan)
- [7. Arsitektur Teknis](#7-arsitektur-teknis)
- [8. Spesifikasi API Endpoints](#8-spesifikasi-api-endpoints)
- [9. Panduan Desain UX/UI Aksesibilitas](#9-panduan-desain-uxui-aksesibilitas-wcag-21-aa)
- [10. Alur Pengguna End-to-End](#10-alur-pengguna-end-to-end-user-flows)
- [11. Roadmap Implementasi](#11-roadmap-implementasi-10-minggu)
- [12. Non-Functional Requirements](#12-non-functional-requirements-nfr)
- [13. Strategi Testing & QA](#13-strategi-testing--quality-assurance)
- [14. Glosarium & Referensi](#14-glosarium--referensi)

---

## 1. Ringkasan Eksekutif

### 1.1 Latar Belakang & Problem Statement

Penyandang tunarungu menghadapi hambatan komunikasi yang signifikan dalam kehidupan sehari-hari — mulai dari mengikuti percakapan di ruang kelas, rapat kerja, hingga berinteraksi di area publik. Solusi aksesibilitas yang ada saat ini bersifat parsial, tidak terintegrasi, dan jarang dirancang secara spesifik dengan kebutuhan pengguna tunarungu sebagai prioritas utama.

**Swara** hadir sebagai platform terintegrasi berbasis AI yang menggabungkan Speech-to-Text (STT) dan Text-to-Speech (TTS) dalam satu ekosistem aksesibilitas yang komprehensif, intuitif, dan dirancang sepenuhnya berdasarkan prinsip *universal design for disability*.

### 1.2 Visi & Misi Produk

| **Aspek** | **Deskripsi** |
| --- | --- |
| **Visi** | Menjadi platform komunikasi inklusif nomor satu di Asia Tenggara bagi komunitas tunarungu |
| **Misi** | Menghapus hambatan komunikasi melalui teknologi AI yang akurat, natural, dan mudah diakses |
| **Target Pengguna Utama** | Penyandang tunarungu (segala usia), keluarga/pendamping, guru & siswa inklusif |
| **Target Pasar** | Indonesia (Fase 1), Asia Tenggara (Fase 2) |
| **Model Bisnis** | Freemium — Regular Plan gratis, Premium Plan berbayar (bulanan/tahunan) |

### 1.3 Pilar Utama Produk

> **🎯 Akurasi Tinggi**
> Memproses audio lingkungan menjadi teks secara real-time dengan Word Error Rate (WER) < 10%.

> **🔊 Intonasi Alami**
> Mengubah teks menjadi suara berintonasi natural berbasis AI (ElevenLabs untuk Premium).

> **♿ Aksesibilitas Ekstrim**
> UI/UX didesain sepenuhnya berdasarkan WCAG 2.1 Level AA untuk disabilitas pendengaran.

> **🌐 Inklusivitas Bahasa**
> Dukungan multilingual dengan translasi real-time terintegrasi.

---

## 2. Design System — Sonic Clarity

> **Semua komponen UI Swara wajib menggunakan token berikut secara konsisten.** Tidak ada warna atau font di luar sistem ini yang boleh digunakan tanpa persetujuan Design Lead.

### 2.1 Color Palette

```
PRIMARY     #2563EB  ████████  → Tombol utama, link aktif, highlight transkripsi
SECONDARY   #1E293B  ████████  → Sidebar, header, background navigasi
TERTIARY    #BC4800  ████████  → Badge Premium, tombol aksi tersier, aksen CTA
NEUTRAL BG  #F8FAFC  ████████  → Background halaman utama, card kosong
```

**Skala warna turunan:**

| Token | Hex | Penggunaan |
| --- | --- | --- |
| `primary-50` | `#EFF6FF` | Background highlight ringan |
| `primary-100` | `#DBEAFE` | Card info, tooltip background |
| `primary-500` | `#3B82F6` | Hover state tombol primer |
| `primary-600` | `#2563EB` | **Primary — default** |
| `primary-700` | `#1D4ED8` | Active state, pressed |
| `primary-900` | `#1E3A8A` | Dark mode primary |
| `secondary-800` | `#1E293B` | **Secondary — default** |
| `secondary-900` | `#0F172A` | Text dark, heading |
| `tertiary-600` | `#BC4800` | **Tertiary — default** |
| `success-500` | `#22C55E` | Visual flash sukses, status aktif |
| `warning-500` | `#EAB308` | Peringatan kuota, banner info |
| `error-500` | `#EF4444` | Visual flash error, validasi gagal |
| `neutral-50` | `#F8FAFC` | **Neutral BG — default** |
| `neutral-200` | `#E2E8F0` | Border, divider |
| `neutral-400` | `#94A3B8` | Placeholder, teks muted |
| `neutral-700` | `#334155` | Body text |

### 2.2 Tipografi — Font: Inter

```
FONT FAMILY: Inter (Google Fonts / Variable)
WEIGHTS: 400 Regular · 500 Medium · 600 SemiBold · 700 Bold · 800 ExtraBold
```

| Role | Size | Weight | Line Height | Token |
| --- | --- | --- | --- | --- |
| Display / Hero | `48px` | `800` | `1.1` | `text-5xl font-extrabold` |
| Heading 1 | `32px` | `700` | `1.25` | `text-4xl font-bold` |
| Heading 2 | `24px` | `700` | `1.3` | `text-2xl font-bold` |
| Heading 3 | `20px` | `600` | `1.4` | `text-xl font-semibold` |
| **Transkripsi STT** | `28px` | `500` | `1.6` | `text-[28px] font-medium leading-relaxed` |
| Transkripsi Minimum | `24px` | `400` | `1.6` | `text-2xl leading-relaxed` |
| Body | `16px` | `400` | `1.5` | `text-base` |
| Label / Button | `14px` | `600` | `1.4` | `text-sm font-semibold` |
| Caption | `12px` | `400` | `1.4` | `text-xs` |
| Quick Phrase | `20px` | `600` | `1.3` | `text-xl font-semibold` |

> **⚠️ Aturan Wajib Tipografi:** Teks transkripsi STT tidak boleh di bawah `24px`. Semua label tombol tidak boleh di bawah `14px bold`. Ukuran ini dapat diperbesar hingga `48px` melalui font-scale setting (100% / 125% / 150%).

### 2.3 Komponen UI Wajib

#### Tombol (Button)

```
Primary   → bg-[#2563EB]  text-white   hover:bg-[#1D4ED8]  h-12 px-6 rounded-xl font-semibold
Secondary → bg-[#1E293B]  text-white   hover:bg-[#0F172A]  h-12 px-6 rounded-xl font-semibold
Tertiary  → bg-[#BC4800]  text-white   hover:bg-[#9A3A00]  h-12 px-6 rounded-xl font-semibold
Outlined  → border-2 border-[#2563EB] text-[#2563EB] hover:bg-[#EFF6FF]
Inverted  → bg-white text-[#2563EB]  border border-white hover:bg-[#DBEAFE]
```

> Semua tombol: `min-height: 44px; min-width: 44px` (WCAG 2.5.8 Target Size)
> Focus ring wajib: `ring-2 ring-[#2563EB] ring-offset-2`

#### Navigasi

```
Active item:    bg-[#2563EB] text-white rounded-lg
Inactive item:  text-[#94A3B8] hover:text-white hover:bg-[#1E293B]
Badge Premium:  bg-[#BC4800] text-white text-xs font-bold px-2 py-0.5 rounded-full
```

#### Status Visual (menggantikan suara bip)

```
SUCCESS → flash overlay: bg-[#22C55E]/40, durasi 400ms, keyframe opacity 0→0.4→0
ERROR   → flash overlay: bg-[#EF4444]/40, durasi 400ms
WARNING → top banner: bg-[#EAB308] text-[#1E293B] font-semibold
INFO    → pulse ring: ring-4 ring-[#2563EB] ring-offset-2 animate-pulse
```

> **🔇 DILARANG KERAS:** Menggunakan `Audio()`, `beep()`, `alert()`, atau suara apapun sebagai penanda event UI. Semua feedback harus visual.

### 2.4 Spacing & Border Radius

```
Border Radius: rounded-sm(4px) · rounded-md(8px) · rounded-lg(12px) · rounded-xl(16px) · rounded-2xl(20px)
Spacing scale: 4px base unit (Tailwind default)
Card padding: p-4 (16px) mobile · p-6 (24px) desktop
Section gap: gap-6 mobile · gap-8 desktop
```

### 2.5 Aturan Aksesibilitas Wajib dari Design System

| Aturan | Minimum | Keterangan |
| --- | --- | --- |
| Kontras teks normal | `4.5:1` | WCAG 2.1 AA |
| Kontras teks besar (24px+) | `3:1` | WCAG 2.1 AA |
| Kontras mode High Contrast | `7:1` | Target WCAG AAA |
| Touch target size | `44×44px` | WCAG 2.5.8 |
| Font teks transkripsi | `≥ 24px` | Sonic Clarity rule |
| Font body minimum | `≥ 16px` | Sonic Clarity rule |
| Navigasi: kedalaman maks | `3 level` | Sonic Clarity rule |

---

## 3. Pengguna & User Persona

### 3.1 Segmentasi Pengguna

| **Segmen** | **Karakteristik** | **Kebutuhan Utama** | **Pain Point** |
| --- | --- | --- | --- |
| Pengguna Tunarungu Aktif | Usia 15–40, tech-savvy, aktif bersosial | STT real-time, mode percakapan 2 arah | Tidak bisa mengikuti percakapan lisan tanpa bantuan |
| Pelajar/Mahasiswa Tunarungu | Usia 12–25, lingkungan akademik | Classroom Mode, SmartNote Summary | Kesulitan mencatat kuliah/kelas secara mandiri |
| Lansia dengan Gangguan Pendengaran | Usia 50+, familiar dengan smartphone dasar | UI sangat besar, simple, high contrast | Antarmuka terlalu kompleks dan kecil |
| Keluarga/Pendamping | Berkomunikasi bersama penyandang tunarungu | Mode percakapan 2 arah, TTS natural | Proses komunikasi lambat dan tidak efisien |
| Pengguna Multilingual | Ekspat/wisatawan dengan hambatan bahasa | Translasi real-time STT | Bahasa berbeda menjadi hambatan ganda |

### 3.2 User Story Utama

- Sebagai **pengguna tunarungu**, saya ingin menekan tombol dan melihat teks percakapan secara real-time agar saya bisa mengikuti diskusi tanpa bantuan juru bicara.
- Sebagai **pelajar tunarungu**, saya ingin merekam kuliah dan mendapatkan ringkasan otomatis agar saya bisa belajar secara mandiri dan efisien.
- Sebagai **pengguna TTS**, saya ingin mengetik teks dan memilih karakter suara agar komunikasi saya terdengar natural dan personal.
- Sebagai **pengguna premium**, saya ingin melakukan percakapan dua arah secara langsung dengan lawan bicara tanpa jeda yang panjang.
- Sebagai **pengguna yang bepergian**, saya ingin menerjemahkan suara bahasa asing secara real-time ke bahasa Indonesia agar saya bisa berkomunikasi di negara lain.

---

## 4. Spesifikasi Fitur — Regular Plan (Gratis)

### 4.1 Autentikasi & Manajemen Akun

#### 4.1.1 Login & Registrasi

| **ID** | **Requirement** | **Prioritas** | **Acceptance Criteria** |
| --- | --- | --- | --- |
| `AUTH-01` | Magic Link via email — user menerima tautan login tanpa password | `P0 Must Have` | Link aktif 15 menit, redirect ke dashboard setelah klik |
| `AUTH-02` | Google Sign-In (OAuth 2.0) | `P0 Must Have` | Berhasil login dalam 2 tap dari halaman utama |
| `AUTH-03` | Registrasi manual dengan validasi password kuat (min 8 karakter, huruf+angka+karakter khusus) | `P0 Must Have` | Error state muncul real-time saat validasi gagal |
| `AUTH-04` | Reset password via email (link verifikasi) | `P0 Must Have` | Email terkirim < 30 detik, link expired setelah 30 menit |
| `AUTH-05` | Tampilan error menggunakan **visual flash merah** tanpa bunyi bip | `P0 Must Have` | Tidak ada suara apapun sebagai penanda error |
| `AUTH-06` | Session management — auto-logout setelah 30 hari inaktif | `P1 Should Have` | Token direfresh otomatis selama user aktif |

**Spesifikasi Visual Auth Page (Sonic Clarity):**

```
Background halaman: #F8FAFC
Card auth: bg-white, shadow-lg, rounded-2xl, max-w-md, p-8
Button Google: border border-[#E2E8F0], bg-white, text-[#334155], hover:bg-[#F8FAFC]
Button "Lanjutkan": bg-[#2563EB], text-white, w-full, h-12, rounded-xl, font-semibold text-base
Input focus: border-[#2563EB], ring-2 ring-[#DBEAFE]
Error state: border-[#EF4444] + visual red flash overlay 300ms
```

### 4.2 Dashboard Utama

| **ID** | **Requirement** | **Prioritas** | **Acceptance Criteria** |
| --- | --- | --- | --- |
| `DASH-01` | Akses cepat (1 tap) ke STT, TTS, dan Pemilih Bahasa | `P0` | Tombol utama terlihat tanpa scroll pada semua ukuran layar |
| `DASH-02` | Widget riwayat percakapan terakhir (5 item terbaru) | `P0` | Tap langsung membuka detail riwayat tersebut |
| `DASH-03` | Indikator visual berwarna untuk notifikasi dan event (green/red flash animation) | `P0` | Tidak ada alert suara sama sekali di seluruh aplikasi |
| `DASH-04` | Pemilih bahasa aktif terlihat di header dashboard | `P1` | Perubahan bahasa berlaku instan tanpa reload halaman |

**Quick Access Cards (Sonic Clarity):**

```
Card STT:     gradient from-[#2563EB] to-[#1D4ED8], text-white
              icon: Mic (48px), label font-bold text-xl, min-h-[160px] rounded-2xl shadow-lg
Card TTS:     bg-[#1E293B], text-white
              icon: Volume2 (48px), label font-bold text-xl
Card Translate: gradient from-[#BC4800] to-[#9A3A00], text-white
              icon: Globe (48px), label font-bold text-xl
Hover all:    scale-105, transition-transform duration-200 cursor-pointer
```

### 4.3 Speech-to-Text (Realtime)

#### 4.3.1 Spesifikasi Fungsional

| **ID** | **Requirement** | **Prioritas** | **Detail Teknis** |
| --- | --- | --- | --- |
| `STT-01` | Continuous Listening Mode — mikrofon aktif tanpa timeout | `P0` | WebSocket keep-alive, tidak ada batas durasi sesi untuk alur percakapan aktif |
| `STT-02` | Auto Noise Reduction — filter kebisingan latar | `P0` | Menggunakan Whisper noise suppression; SNR improvement > 10dB |
| `STT-03` | Classroom & Meeting Mode — penguatan frekuensi vokal jarak jauh | `P1` | Bandpass filter 300–3400 Hz, gain boost vokal +6dB |
| `STT-04` | Salin teks ke clipboard via satu tap | `P0` | Toast konfirmasi **visual** muncul 1.5 detik (flash hijau) |
| `STT-05` | Simpan transkripsi ke riwayat lokal | `P0` | Teks tersimpan dengan timestamp dan label bahasa |
| `STT-06` | Bagikan teks ke aplikasi pihak ketiga (share sheet) | `P1` | Mendukung native share API platform |
| `STT-07` | Batas sesi: 15 menit per sesi (Regular Plan) | `P0` | Timer countdown muncul di menit ke-13, warning visual di 60 detik tersisa |
| `STT-08` | Akurasi transkripsi: WER < 10% untuk Bahasa Indonesia dalam kondisi bersih | `P0` | Diuji dengan dataset audio standar dalam skenario indoor |

**Spesifikasi Visual STT (Sonic Clarity):**

```
Tombol Record: bg-[#2563EB], icon Mic 48px, w-24 h-24 rounded-full shadow-xl
Active state:  ring-8 ring-[#2563EB]/30 animate-pulse (pulsing ring biru)
Stop state:    bg-[#EF4444], icon Square, ring-8 ring-[#EF4444]/30
Timer:         font-mono text-2xl font-bold text-[#BC4800] (saat < 2 menit)

Area transkripsi:
  background: #F8FAFC
  border-left: 4px solid #2563EB
  font-size: 28px (default) — Inter font-medium
  line-height: 1.6
  color: #0F172A (teks final) / #94A3B8 (teks partial/interim)
  auto-scroll: smooth
```

### 4.4 Text-to-Speech

| **ID** | **Requirement** | **Prioritas** | **Detail Teknis** |
| --- | --- | --- | --- |
| `TTS-01` | Input teks dari keyboard dikonversi ke audio secara instan | `P0` | Latensi generate audio < 2 detik untuk teks < 200 karakter |
| `TTS-02` | Quick Phrases — tombol akses frasa yang sering digunakan (custom shortcut) | `P0` | Maksimal 10 quick phrase per user, dapat diedit |
| `TTS-03` | Preset profil suara: Pria, Wanita, Anak-anak (suara sintetis standar) | `P0` | Tersedia minimum 1 voice per kategori di Regular Plan |
| `TTS-04` | Kontrol kecepatan bicara (0.5x — 2.0x) | `P0` | Slider dengan increment 0.1x, real-time preview |
| `TTS-05` | Kontrol pitch (tinggi-rendah nada, -5 hingga +5 semitone) | `P1` | Slider pitch dengan preview audio instan |
| `TTS-06` | UI 100% bebas iklan | `P0` | Tidak ada slot iklan apapun di seluruh alur TTS |

**Spesifikasi Visual TTS (Sonic Clarity):**

```
Textarea input:  border border-[#E2E8F0], focus:border-[#2563EB], min-h-[200px]
                 font-size: 18px, font-family: Inter, rounded-xl p-4
Char counter:    text-[#94A3B8] text-sm, merah saat > 80% limit
Tombol Putar:    bg-[#2563EB] w-full h-14 rounded-xl text-white font-bold text-lg
Waveform anim:   5 bar abu-abu → biru animasi saat audio playing

Voice cards:
  Regular voices: border border-[#E2E8F0] rounded-xl p-4 hover:border-[#2563EB]
  Premium voices: opacity-60 + gembok icon + badge "Premium" bg-[#BC4800]

Speed/Pitch slider:
  Track: bg-[#E2E8F0] h-2 rounded-full
  Thumb: bg-[#2563EB] w-5 h-5 rounded-full shadow-md
  Value label: text-[#2563EB] font-bold text-lg

Quick Phrases grid:
  2-kolom, gap-3
  Button: border border-[#E2E8F0] rounded-xl p-3 text-left
          font-size: 20px font-semibold hover:border-[#2563EB] hover:bg-[#EFF6FF]
```

### 4.5 History / Riwayat

| **ID** | **Requirement** | **Prioritas** | **Acceptance Criteria** |
| --- | --- | --- | --- |
| `HIST-01` | Penyimpanan otomatis semua hasil STT dan TTS | `P0` | Tersimpan dalam < 1 detik setelah sesi selesai |
| `HIST-02` | Pengelompokan kronologi: Hari ini, Kemarin, Minggu ini, Bulan lalu | `P0` | Grouping berdasarkan timezone device pengguna |
| `HIST-03` | Full-text search di seluruh riwayat | `P1` | Hasil muncul < 500ms, highlight kata kunci yang ditemukan |
| `HIST-04` | Filter berdasarkan label kategori (Kelas, Rapat, Belajar, Custom) | `P1` | Multi-filter dapat dikombinasikan |
| `HIST-05` | Simpan hanya di local storage (Regular Plan) | `P0` | Tidak ada sinkronisasi cloud untuk pengguna Regular |
| `HIST-06` | Hapus riwayat (per item atau bulk) | `P0` | Konfirmasi dialog **visual** sebelum hapus permanen (bukan alert bunyi) |

---

## 5. Spesifikasi Fitur — Aksesibilitas Khusus

### 5.1 Live Caption Mode

| **ID** | **Requirement** | **Prioritas** | **Detail** |
| --- | --- | --- | --- |
| `LIVE-01` | Subtitel berjalan real-time dioptimalkan untuk video/seminar | `P0` | Latensi teks terhadap audio < 800ms |
| `LIVE-02` | Font extra-large (min 32px, hingga 64px) | `P0` | User dapat mengatur ukuran font secara mandiri |
| `LIVE-03` | High contrast mode: teks putih di latar hitam solid | `P0` | Rasio kontras minimum **7:1** |
| `LIVE-04` | Auto-scroll teks secara vertikal mengikuti kecepatan bicara | `P0` | Auto-scroll dapat dinonaktifkan oleh user |
| `LIVE-05` | Mode fullscreen landscape untuk kenyamanan maksimal | `P1` | Mengunci orientasi saat mode aktif |

**Spesifikasi Visual Live Caption (Sonic Clarity):**

```
Default:
  bg-[#0F172A] (hampir hitam) text-white font-size: 36px font-medium
  Padding: px-8 py-6, line-height: 1.4, max-width: 100%

High Contrast (wajib tersedia):
  bg-[#000000] text-[#FFFFFF], rasio 21:1
  Tidak ada elemen dekoratif, hanya teks

Kontrol overlay:
  Tombol [Font +] [-]: bg-white/20 backdrop-blur text-white rounded-lg
  Tombol [Fullscreen]: fixed top-4 right-4, icon Maximize
  Tombol [Stop]: fixed bottom-8 center, bg-[#EF4444] text-white rounded-full w-16 h-16
```

### 5.2 Gesture Assistant (Beta)

| **Gesture** | **Aksi** | **Konteks Aktif** | **Feedback Visual (Sonic Clarity)** |
| --- | --- | --- | --- |
| Swipe Kiri | Clear text — menghapus transkripsi aktif | STT aktif | Animasi slide-out ke kiri + flash `#EF4444` 300ms |
| Swipe Kanan | Simpan otomatis transkripsi ke riwayat | STT aktif | Animasi slide-out ke kanan + flash `#22C55E` + ikon ✓ |
| Double Tap | Toggle Start/Stop rekaman mikrofon | Semua layar | Tombol mic berubah warna + `animate-pulse` ring biru |
| Long Press | Membuka Quick Phrase menu | Layar TTS | Bottom sheet slide-up dengan `bg-white rounded-t-2xl` |

> **⚠️ Catatan Developer:** Gesture Assistant berstatus **Beta**. Semua gesture **WAJIB** memiliki alternatif tombol yang terlihat jelas di UI. Gesture tidak boleh menjadi satu-satunya cara mengakses fungsi tersebut.

### 5.3 Mode Percakapan Dua Arah (Two-Way Conversation)

| **ID** | **Requirement** | **Prioritas** | **Detail Teknis** |
| --- | --- | --- | --- |
| `CONV-01` | Split-screen layout: atas (transkripsi lawan bicara), bawah (input teks user) | `P0` | Divider dapat digeser untuk menyesuaikan proporsi layar |
| `CONV-02` | Transkripsi lawan bicara via STT real-time di panel atas | `P0` | Menggunakan pipeline STT yang sama dengan mode standar |
| `CONV-03` | Input teks user diubah ke suara AI saat tombol Kirim ditekan | `P0` | TTS memainkan audio dari speaker device, bukan earpiece |
| `CONV-04` | Indikator siapa yang sedang berbicara (visual badge / warna berbeda) | `P0` | Lawan bicara: `#2563EB` (biru), User: `#22C55E` (hijau) |
| `CONV-05` | Riwayat percakapan dua arah tersimpan sebagai satu sesi utuh | `P1` | Tersimpan dengan label 'Percakapan 2 Arah' dan timestamp |

**Layout Percakapan Dua Arah:**

```
┌─────────────────────────────────────────┐
│  🔵 LAWAN BICARA              [STT Live] │  ← bg-[#EFF6FF], border-b-4 border-[#2563EB]
│                                          │
│  Teks transkripsi real-time...           │  ← font 28px, warna #1E293B
│  + Terjemahan (jika aktif)               │  ← font 18px, warna #94A3B8
├──────────────── ≡ drag ─────────────────┤
│  🟢 KAMU                     [TTS Mode] │  ← bg-white
│                                          │
│  [Textarea input teks...]                │  ← font 18px, border #2563EB
│  [Quick Phrases]                         │
│  [▶ Kirim & Ucapkan — bg-#2563EB]       │
└─────────────────────────────────────────┘
```

### 5.4 Translation & Multilingual Mode

| **ID** | **Requirement** | **Prioritas** | **Detail Teknis** |
| --- | --- | --- | --- |
| `TRANS-01` | STT + Translasi dalam satu alur terpadu: suara → teks asal → teks terjemahan | `P0` | Pipeline: Whisper STT → Google Cloud Translation API |
| `TRANS-02` | Dukungan minimum 10 bahasa: ID, EN, AR, ZH, JA, KO, FR, DE, ES, MS | `P0` | Diverifikasi dengan uji akurasi per bahasa |
| `TRANS-03` | Tampilan teks asli dan terjemahan secara bersamaan (dual-line view) | `P1` | Teks asli 80% opacity, terjemahan dominan (font lebih besar) |
| `TRANS-04` | Batas translasi 1.000 karakter/hari untuk Regular Plan | `P0` | Counter visible di UI, warning `#EAB308` saat mendekati batas (80%) |
| `TRANS-05` | Pemilih bahasa sumber dan target yang cepat (dropdown favorit) | `P0` | User dapat menyimpan 3 pasang bahasa favorit |

---

## 6. Spesifikasi Fitur — Premium Plan

### 6.1 Perbandingan Regular vs Premium

| **Fitur / Dimensi** | **Regular Plan (Gratis)** | **Premium Plan (Berbayar)** |
| --- | --- | --- |
| Durasi Sesi STT | Maks. 15 menit/sesi | ♾️ Unlimited — tanpa batas waktu |
| Translasi Bahasa | Maks. 1.000 karakter/hari | ♾️ Unlimited Real-time Translation |
| Noise Cancellation | Standar (Whisper default) | ✨ Advanced AI-Powered (isolasi suara adaptif) |
| SmartNote AI Summary | ❌ Tidak tersedia | ✅ Merangkum otomatis via GPT-4o-mini |
| Pilihan Suara TTS | 3 preset sintetis standar | 🎙️ Premium Natural Voices via ElevenLabs (10+ voice) |
| Multi-Speaker Recognition | ❌ Tidak tersedia — teks tunggal | ✅ Mengenali & menandai Speaker A/B/C |
| Cloud Backup & Sync | Hanya penyimpanan lokal | ☁️ Auto-sync semua perangkat + cloud storage |
| Pengalaman UI | 100% bebas iklan | 100% bebas iklan |
| Support | Community support | ⚡ Priority email & in-app support |

**Pricing (Sonic Clarity badge):**

```
Regular:  GRATIS                   → badge: bg-[#E2E8F0] text-[#334155]
Bulanan:  Rp 49.000 / bulan        → badge: bg-[#2563EB] text-white
Tahunan:  Rp 399.000 / tahun       → badge: bg-[#BC4800] text-white + "Hemat 32%"
```

### 6.2 Spesifikasi Fitur Premium Eksklusif

#### 6.2.1 SmartNote AI Summary

| **ID** | **Requirement** | **Detail** |
| --- | --- | --- |
| `SMART-01` | Merangkum otomatis transkripsi panjang menjadi poin-poin utama | GPT-4o-mini via `POST /api/history/summarize`; max 3000 token input |
| `SMART-02` | Output ringkasan: Topik Utama, Poin Penting, Action Items | Format JSON diparse dan ditampilkan sebagai card UI |
| `SMART-03` | User dapat meminta ulang ringkasan (regenerate) tanpa biaya tambahan | Maksimal 3 kali regenerate per sesi riwayat |
| `SMART-04` | Ringkasan tersimpan bersama riwayat aslinya di field `summary_content` | Relasi langsung di tabel history database |

**Tampilan SmartNote Card:**
```
bg-gradient-to-r from-[#F8FAFC] to-[#EFF6FF]
border-l-4 border-[#2563EB]
rounded-xl p-5
icon ✨ + label "SmartNote AI" text-[#2563EB] font-semibold
```

#### 6.2.2 Multi-Speaker Recognition

| **ID** | **Requirement** | **Detail** |
| --- | --- | --- |
| `SPEAK-01` | Identifikasi dan pembedaan minimal 3 pembicara berbeda (A/B/C) | Speaker diarization via Whisper extended atau Google Speech API |
| `SPEAK-02` | Label speaker konsisten dalam satu sesi (Speaker A tetap A sepanjang rekaman) | Speaker embedding disimpan selama sesi aktif di Redis |
| `SPEAK-03` | Warna berbeda untuk teks tiap speaker di UI dengan kontras 4.5:1 | Speaker A: `#2563EB`, B: `#BC4800`, C: `#22C55E` |

#### 6.2.3 Cloud Backup & Multi-Device Sync

| **ID** | **Requirement** | **Detail** |
| --- | --- | --- |
| `CLOUD-01` | Sinkronisasi otomatis semua riwayat ke cloud saat sesi selesai | AWS S3 / GCS, enkripsi AES-256 at rest |
| `CLOUD-02` | Akses riwayat konsisten di semua perangkat dengan akun yang sama | Sinkronisasi via REST API, conflict resolution: last-write-wins |
| `CLOUD-03` | Storage cloud per user dibatasi 5GB | UI menampilkan usage indicator `bg-[#2563EB]`, warning saat > 80% |

### 6.3 Alur Upgrade Premium

```
1. User klik banner premium (bg-[#BC4800]) atau menu Profile > Upgrade
       ↓
2. Halaman perbandingan paket — tabel Regular vs Premium (Sonic Clarity card design)
       ↓
3. Pilih durasi: [Bulanan — Rp 49.000] [Tahunan — Rp 399.000 | badge "Hemat 32%"]
       ↓
4. Payment sheet terbuka: Stripe (kartu/internasional) atau Midtrans (GoPay/OVO/bank lokal)
       ↓
5. Bayar berhasil → Webhook dikirim ke POST /api/subscription/webhook
       ↓
6. users.role diubah → 'premium' secara atomik di database
       ↓
7. UI refresh otomatis — flash hijau + banner "Premium Aktif! 🎉"
   Semua fitur eksklusif terbuka tanpa restart
```

---

## 7. Arsitektur Teknis

### 7.1 Stack Teknologi

| **Layer** | **Teknologi** | **Justifikasi** |
| --- | --- | --- |
| Frontend Web | Next.js 14 (App Router) + React + Tailwind CSS + shadcn/ui | SSR untuk SEO, App Router untuk streaming UI, Tailwind untuk Sonic Clarity tokens |
| Mobile | Flutter (primary) | Single codebase iOS+Android, performa native, widget aksesibel |
| Backend API | Node.js + NestJS (modular architecture) + TypeScript | Decorator-based, mudah scaling, type-safe |
| Real-time | Socket.io + WebRTC + Redis (Pub/Sub) | STT streaming; WebRTC untuk audio P2P; Redis untuk session state |
| AI — STT | OpenAI Whisper API | Akurasi tinggi multi-bahasa, pseudo-streaming via chunking |
| AI — Translation | Google Cloud Translation API v3 | Neural Machine Translation, 100+ bahasa |
| AI — Summary | GPT-4o-mini | Cost-efficient untuk summarization, context window 128k token |
| TTS — Standar | Web Speech API (browser) | Zero-cost, cukup untuk Regular Plan |
| TTS — Premium | ElevenLabs API | Suara natural terbaik, mendukung kustomisasi voice |
| Database | PostgreSQL via Prisma ORM | ACID compliant, full-text search, relational |
| Auth | NextAuth.js v5 (Google OAuth + Magic Link) | Zero-config, mendukung JWT & session |
| Storage | AWS S3 / Cloudflare R2 | Scalable, durable, signed URL untuk keamanan |
| Cache | Redis (Upstash) | Rate limiting, session, pub-sub, quota tracking |
| Deployment | Vercel (Frontend) + Railway/GCP (Backend) | Edge functions, auto-scaling |
| Monitoring | Sentry + Datadog + Axiom | Error tracking, APM, logs |

### 7.2 Diagram Arsitektur Sistem

```
═══════════════════════════════════════════════════════════════
  ALUR DATA END-TO-END — STT REALTIME MULTILINGUAL
═══════════════════════════════════════════════════════════════

  [Browser / Flutter App]
      │
      │  chunks Float32Array @ 16kHz (setiap 250ms)
      ▼
  [WebSocket /api/stt/stream — Socket.io]
      │
      ├─── [Redis] ← simpan session state, kuota timer
      │
      │  akumulasi audio buffer (chunking per 2-3 detik)
      ▼
  [OpenAI Whisper API]
      │
      │  teks transkripsi + bahasa terdeteksi
      ▼
  [Google Cloud Translation API]  ← jika source ≠ target language
      │
      │  teks terjemahan
      ▼
  [Socket.io emit 'transcript_final']
      │
      ▼
  [Client UI — auto-scroll render]
      │
      │  sesi selesai (swipe kanan / tap simpan)
      ▼
  [PostgreSQL — tabel history]
      │
      │  jika user Premium
      ▼
  [AWS S3 — Cloud Backup enkripsi AES-256]

═══════════════════════════════════════════════════════════════
```

### 7.3 Skema Database Detail

#### 7.3.1 Tabel: `users`

| **Kolom** | **Tipe** | **Constraint** | **Keterangan** |
| --- | --- | --- | --- |
| `id` | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Identifier unik pengguna |
| `name` | VARCHAR(100) | NOT NULL | Nama lengkap pengguna |
| `email` | VARCHAR(150) | UNIQUE, NOT NULL | Email utama untuk login dan Magic Link |
| `password_hash` | VARCHAR(255) | NOT NULL | bcrypt hash (bukan plaintext), work factor ≥ 12 |
| `role` | VARCHAR(20) | DEFAULT `'regular'` | Nilai: `'regular'` atau `'premium'` |
| `default_language` | VARCHAR(10) | DEFAULT `'id-ID'` | Kode BCP-47 bahasa default |
| `onboarding_completed` | BOOLEAN | DEFAULT `false` | Flag wizard onboarding |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Waktu pendaftaran |

#### 7.3.2 Tabel: `history`

| **Kolom** | **Tipe** | **Constraint** | **Keterangan** |
| --- | --- | --- | --- |
| `id` | UUID | PRIMARY KEY | Identifier riwayat |
| `user_id` | UUID | FK → users(id) ON DELETE CASCADE | Pemilik riwayat |
| `source_language_code` | VARCHAR(10) | FK → languages(code) | Bahasa sumber |
| `target_language_code` | VARCHAR(10) | FK → languages(code), NULLABLE | Bahasa tujuan translasi |
| `original_text` | TEXT | NOT NULL | Teks hasil transkripsi asli |
| `translated_text` | TEXT | NULLABLE | Teks setelah diterjemahkan |
| `summary_content` | TEXT | NULLABLE | Hasil SmartNote AI (Premium) |
| `type` | VARCHAR(10) | NOT NULL | Enum: `'stt'`, `'tts'`, `'conversation'` |
| `label` | VARCHAR(50) | NULLABLE | Contoh: `'kelas'`, `'rapat'`, `'belajar'` |
| `duration_seconds` | INT | DEFAULT 0 | Durasi sesi dalam detik |
| `voice_id` | VARCHAR(100) | NULLABLE | Voice ID (untuk riwayat TTS) |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Waktu sesi dibuat |

#### 7.3.3 Tabel: `subscriptions`

| **Kolom** | **Tipe** | **Constraint** | **Keterangan** |
| --- | --- | --- | --- |
| `id` | UUID | PRIMARY KEY | Identifier langganan |
| `user_id` | UUID | FK → users(id) ON DELETE CASCADE | Pemilik langganan |
| `plan_type` | VARCHAR(50) | NOT NULL | Contoh: `'premium_monthly'`, `'premium_annual'` |
| `valid_until` | TIMESTAMP | NOT NULL | Batas akhir masa aktif |
| `status` | VARCHAR(20) | DEFAULT `'active'` | Enum: `'active'`, `'expired'`, `'cancelled'` |
| `stripe_sub_id` | VARCHAR(100) | NULLABLE | Stripe subscription ID |
| `midtrans_order_id` | VARCHAR(100) | NULLABLE | Midtrans order ID |
| `updated_at` | TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP | Waktu update terakhir |

#### 7.3.4 Tabel: `voice_packs`

| **Kolom** | **Tipe** | **Constraint** | **Keterangan** |
| --- | --- | --- | --- |
| `id` | UUID | PRIMARY KEY | Identifier voice pack |
| `voice_name` | VARCHAR(100) | NOT NULL | Nama tampilan (contoh: "Siti — Wanita Natural") |
| `provider` | VARCHAR(50) | NOT NULL | Contoh: `'elevenlabs'`, `'browser'` |
| `is_premium` | BOOLEAN | DEFAULT false | Apakah voice ini eksklusif Premium |
| `preview_url` | VARCHAR(255) | NULLABLE | URL audio preview singkat |

---

## 8. Spesifikasi API Endpoints

### 8.1 Authentication Endpoints

| **Method** | **Endpoint** | **Body / Params** | **Response** | **Auth Required** |
| --- | --- | --- | --- | --- |
| `POST` | `/api/auth/register` | `{ name, email, password }` | `{ user_id, email, role }` + 201 | ❌ |
| `POST` | `/api/auth/login` | `{ email, password }` atau OAuth token | `{ access_token, refresh_token, role }` + 200 | ❌ |
| `POST` | `/api/auth/magic-link` | `{ email }` | `{ message: 'Email sent' }` + 200 | ❌ |
| `POST` | `/api/auth/refresh` | `{ refresh_token }` | `{ access_token }` + 200 | ❌ |
| `POST` | `/api/auth/logout` | — | 204 No Content | ✅ Bearer |

### 8.2 Core Feature Endpoints

| **Method** | **Endpoint** | **Body / Params** | **Response** | **Auth & Plan** |
| --- | --- | --- | --- | --- |
| `WS` | `/api/stt/stream` | `?source_lang=id-ID&target_lang=en-US` | Stream: `{ text, translated, timestamp }` | ✅ JWT, Regular (15 min limit) |
| `POST` | `/api/tts/generate` | `{ text, voice_id, speed, pitch }` | `{ audio_buffer_base64, duration_ms }` | ✅ JWT, Regular |
| `GET` | `/api/history` | `?search=&type=stt&limit=20&cursor=` | `{ data: [...], total, nextCursor }` | ✅ JWT |
| `GET` | `/api/history/:id` | — | `{ ...historyItem }` | ✅ JWT (owner) |
| `PATCH` | `/api/history/:id` | `{ label }` | `{ ...updatedItem }` | ✅ JWT (owner) |
| `DELETE` | `/api/history/:id` | — | 204 No Content | ✅ JWT (owner) |
| `POST` | `/api/history/summarize` | `{ history_id }` | `{ summary: { topics, points, actions } }` | ✅ JWT, **Premium only** |
| `POST` | `/api/translation/translate` | `{ text, source, target }` | `{ translated, detected_lang, char_count }` | ✅ JWT |
| `GET` | `/api/translation/quota` | — | `{ used, limit, reset_at }` | ✅ JWT |
| `GET` | `/api/voices` | `?plan=premium` | `{ voices: [...] }` | ✅ JWT |
| `POST` | `/api/subscriptions/checkout/stripe` | `{ plan_type }` | `{ checkout_url }` | ✅ JWT |
| `POST` | `/api/subscriptions/checkout/midtrans` | `{ plan_type }` | `{ snap_token }` | ✅ JWT |
| `GET` | `/api/subscriptions/status` | — | `{ plan, valid_until, status }` | ✅ JWT |
| `POST` | `/api/webhooks/stripe` | Stripe webhook payload | 200 OK | 🔐 Webhook Secret |
| `POST` | `/api/webhooks/midtrans` | Midtrans webhook payload | 200 OK | 🔐 Webhook Secret |
| `GET` | `/health` | — | `{ status, db, redis }` | ❌ |

### 8.3 WebSocket Protocol — STT Streaming

| **Event** | **Arah** | **Payload** | **Keterangan** |
| --- | --- | --- | --- |
| `audio_chunk` | Client → Server | `{ chunk: ArrayBuffer, sequence: number }` | Audio RAW 16kHz mono, dikirim setiap 250ms |
| `transcript_partial` | Server → Client | `{ text: string, is_final: false }` | Teks sementara (warna `#94A3B8` di UI) |
| `transcript_final` | Server → Client | `{ text, translated, is_final: true }` | Teks final satu kalimat, sudah ditranslasi |
| `session_warning` | Server → Client | `{ remaining_seconds: number }` | Dikirim saat 60 detik tersisa (Regular) — tampilkan timer `#BC4800` |
| `session_expired` | Server → Client | `{ message: string }` | Regular: sesi diputus setelah 15 menit |
| `error` | Server → Client | `{ code: string, message: string }` | Kode error standar — tampilkan visual flash merah |

### 8.4 Error Response Standard

| **HTTP Code** | **Error Code** | **Kondisi** | **Tindakan Client (Sonic Clarity)** |
| --- | --- | --- | --- |
| `400` | `VALIDATION_ERROR` | Input tidak valid | Pesan error di field terkait, border `#EF4444` |
| `401` | `UNAUTHORIZED` | Token tidak ada atau expired | Redirect ke `/login` |
| `403` | `PREMIUM_REQUIRED` | Akses fitur Premium tanpa langganan | Modal upgrade — card `bg-white` border `#BC4800` |
| `403` | `QUOTA_EXCEEDED` | Melebihi batas kuota harian | Banner `#EAB308` + sisa kuota + tombol upgrade |
| `429` | `RATE_LIMITED` | Terlalu banyak request | Retry setelah delay (exponential backoff) |
| `500` | `INTERNAL_ERROR` | Kesalahan server | Flash merah + pesan "Terjadi kesalahan, coba lagi" |

---

## 9. Panduan Desain UX/UI Aksesibilitas (WCAG 2.1 AA)

### 9.1 Tipografi & Ukuran (Sonic Clarity)

| **Elemen** | **Ukuran Minimum** | **Font** | **Keterangan** |
| --- | --- | --- | --- |
| Teks Transkripsi Utama (STT Output) | `24px` (default `28px`) | Inter Medium | Adjustable hingga `48px` di settings |
| Label Tombol Primer (CTA) | `18px` | Inter SemiBold | Kontras tinggi wajib |
| Teks Body / Deskripsi | `16px` | Inter Regular | Minimum WCAG |
| Teks Navigasi / Tab Bar | `14px` | Inter SemiBold | Dengan ikon pendukung yang jelas |
| Quick Phrase Shortcut | `20px` | Inter SemiBold | Mudah dibaca dan ditap dalam waktu singkat |
| Live Caption Mode | `36px` (default) | Inter Bold | Range `32px` – `64px` |

### 9.2 Rasio Kontras & Tema Warna (Sonic Clarity Pairs)

| **Pasangan Warna** | **Rasio** | **WCAG AA** | **Konteks** |
| --- | --- | --- | --- |
| Putih `#FFFFFF` di Primer `#2563EB` | `5.8:1` | ✅ PASS | Tombol utama, header aktif |
| Hitam `#0F172A` di Putih `#FFFFFF` | `21:1` | ✅ PASS | Body text, konten utama |
| Hitam `#0F172A` di Neutral `#F8FAFC` | `19.6:1` | ✅ PASS | Background halaman |
| Putih `#FFFFFF` di Secondary `#1E293B` | `11.3:1` | ✅ PASS | Sidebar, navigasi |
| Putih `#FFFFFF` di Tertiary `#BC4800` | `4.7:1` | ✅ PASS | Badge Premium, tombol aksen |
| Pure High Contrast (Putih di Hitam) | `21:1` | ✅ PASS (AAA) | Mode kontras tinggi |

### 9.3 Aturan Desain Aksesibilitas Wajib

1. **🔇 DILARANG** menggunakan suara bip, notifikasi audio, atau efek suara apapun sebagai penanda event UI.
2. **🎨 WAJIB** semua event (error, sukses, loading, warning) digantikan visual: flash animasi, loading skeleton, atau badge.
3. **📱 WAJIB** kedalaman navigasi maksimal **3 level** (Home → Fitur → Detail). Tidak ada menu bersarang lebih dari 3 tingkat.
4. **👆 WAJIB** ukuran tap target minimum **44×44px** untuk semua elemen interaktif.
5. **🤚 WAJIB** semua gesture shortcuts memiliki **tombol alternatif yang terlihat di UI**.
6. **🔤 WAJIB** mendukung Dynamic Type / Font Scaling sistem level tanpa merusak layout.
7. **🏷️ WAJIB** semua gambar dan ikon memiliki label alt-text / semantic label untuk screen reader.
8. **⌨️ WAJIB** semua halaman dapat dioperasikan dengan keyboard saja.
9. **🎭 WAJIB** mendukung `prefers-reduced-motion` — semua animasi dapat dimatikan.

### 9.4 Visual Alert System (Menggantikan Suara)

```
SUCCESS (simpan, copy, upload):
  → Overlay: bg-[#22C55E]/40, fixed inset-0, pointer-events-none
  → Duration: 400ms, keyframe: opacity 0 → 0.4 → 0
  → Ikon ✓ (checkmark) muncul 600ms di tengah layar

ERROR (gagal, quota habis, network error):
  → Overlay: bg-[#EF4444]/40, fixed inset-0, pointer-events-none
  → Duration: 400ms, same keyframe
  → Border merah pada elemen yang gagal

WARNING (mendekati batas kuota, timer hampir habis):
  → Banner: fixed top-0, bg-[#EAB308], text-[#1E293B] font-bold
  → Height: 48px, slide-down animasi 200ms

INFO (mulai record, proses berjalan):
  → Pulse ring pada tombol aktif: ring-8 ring-[#2563EB]/30 animate-pulse
  → Duration: selama aksi berlangsung
```

### 9.5 Alur Onboarding Visual

```
Langkah 1: Welcome Screen
  → Logo Swara animasi, headline besar, tombol "Mulai" bg-[#2563EB]
Langkah 2: Izin Mikrofon
  → Ilustrasi mikrofon besar, penjelasan why (bukan teks legalese)
  → Tombol "Izinkan Mikrofon" bg-[#2563EB]
Langkah 3: Gesture Tutorial
  → Demo interaktif: tunjukkan swipe kiri (merah), kanan (hijau), double tap (biru)
Langkah 4: Pilih Bahasa Default
  → Dropdown dengan bendera emoji, simpan ke profil
Langkah 5: Selesai 🎉
  → Flash hijau + "Kamu siap menggunakan Swara!"
  → Redirect ke Dashboard

[Skip] tersedia di setiap langkah (kecuali langkah 1)
Progress: stepper dots di bawah — active: bg-[#2563EB], inactive: bg-[#E2E8F0]
```

---

## 10. Alur Pengguna End-to-End (User Flows)

### 10.1 Alur STT Realtime Multilingual

| **Langkah** | **Aksi Pengguna** | **Respons Sistem** | **Visual State** |
| --- | --- | --- | --- |
| 1 | Buka aplikasi, tap ikon Bahasa di dashboard | Modal pemilih bahasa sumber & tujuan | Modal slide-up `bg-white rounded-t-2xl` |
| 2 | Pilih bahasa EN → ID | Modal tutup, label bahasa di header | Header badge: `bg-[#DBEAFE] text-[#2563EB]` |
| 3 | Tap tombol 'Mulai Mendengarkan' (atau Double Tap) | Izin mikrofon diminta jika belum | Browser permission dialog |
| 4 | Berikan izin mikrofon | WebSocket terhubung | Tombol merah + `ring animate-pulse` biru |
| 5 | Bicara ke mikrofon | Teks partial muncul real-time | Teks `#94A3B8` (interim) → `#0F172A` (final) |
| 6 | Jeda bicara terdeteksi | Teks final + terjemahan di bawah | Font-size: 28px / 18px, auto-scroll |
| 7 | Swipe Kanan (atau tap Simpan) | Flash hijau `#22C55E`, data tersimpan | Green flash overlay 400ms |
| 8 | Tap Stop atau Double Tap | Rekaman berhenti | Tombol kembali ke state idle biru |

### 10.2 Alur TTS & Percakapan

| **Langkah** | **Aksi Pengguna** | **Respons Sistem** | **Visual State** |
| --- | --- | --- | --- |
| 1 | Buka menu Text-to-Speech | Input teks, voice selector, slider speed/pitch | Layout 2-kolom desktop / 1-kolom mobile |
| 2 | Pilih profil suara (misal: Wanita) | Preview audio singkat | Card voice: `border-[#2563EB]` saat selected |
| 3 | Ketik teks atau pilih Quick Phrase | Teks muncul di area input real-time | Char counter update live |
| 4 | Tap tombol Putar | Audio dihasilkan & diputar | Waveform animasi 5 bar `#2563EB` |
| 5 | Simpan Quick Phrase baru | Flash hijau, frasa tersimpan | Frasa muncul di grid Quick Phrases |

---

## 11. Roadmap Implementasi (10 Minggu)

| **Fase** | **Minggu** | **Fokus Utama** | **Deliverable Utama** | **Tim PIC** |
| --- | --- | --- | --- | --- |
| 🔴 Fase 1: Inisiasi & Desain | Minggu 1–2 | Mockup Figma, skema DB, boilerplate | File Figma (Sonic Clarity), ERD final, repo setup | Designer + Backend Lead |
| 🔴 Fase 2: Core Engine | Minggu 3–4 | WebSocket STT, Whisper, TTS streaming | Endpoint STT & TTS berfungsi, unit test | Backend + Frontend |
| 🟠 Fase 3: Aksesibilitas & Multi | Minggu 5–6 | Multilingual, Gesture, 2-Way Conversation | Fitur translasi live, gesture aktif, split-screen UI | Full Stack + Mobile |
| 🟡 Fase 4: Monetisasi & AI | Minggu 7–8 | Stripe/Midtrans, SmartNote, Cloud Sync | Alur upgrade end-to-end, summary AI, cloud backup | Backend + DevOps |
| ✅ Fase 5: QA & Launch | Minggu 9–10 | Stress test, beta, bug fix, release | Laporan QA, APK/IPA, Web Production URL | SELESAI |

### 11.1 Definition of Done (DoD) per Fase

- **Fase 1:** Mockup Figma di-review dan di-approve stakeholder menggunakan Sonic Clarity design tokens secara konsisten.
- **Fase 2:** Endpoint STT dan TTS lolos unit test coverage > 80%; latensi STT < 800ms pada jaringan 4G.
- **Fase 3:** Fitur aksesibilitas diuji dengan minimal 3 pengguna tunarungu; gesture berfungsi di web, iOS & Android.
- **Fase 4:** Alur upgrade premium berhasil end-to-end di sandbox Stripe; SmartNote menghasilkan ringkasan akurat.
- **Fase 5:** Lolos security audit OWASP Top 10; load test WebSocket minimal 500 koneksi concurrent tanpa degradasi.

### 11.2 Daftar Deliverables Akhir

| **No** | **Deliverable** | **Format** | **PIC** |
| --- | --- | --- | --- |
| 1 | File Mockup UI/UX — Sonic Clarity Design System | Figma (link + PDF export) | Designer |
| 2 | Dokumentasi API interaktif OpenAPI 3.0 | Swagger Panel URL (hosted) | Backend Lead |
| 3 | Source Code Backend (NestJS) | GitHub Repository (private) | Backend Dev |
| 4 | Source Code Mobile (Flutter) | GitHub Repository (private) | Mobile Dev |
| 5 | Source Code Frontend Web (Next.js) | GitHub Repository (private) | Frontend Dev |
| 6 | Laporan Hasil QA (Security + Load Test) | PDF Report | QA Lead |
| 7 | Aplikasi Android siap edar | `.APK` / Play Store listing | Mobile Dev + DevOps |
| 8 | Aplikasi iOS siap edar | `.IPA` / App Store listing | Mobile Dev + DevOps |
| 9 | Web Production URL + CDN | HTTPS URL | DevOps |

---

## 12. Non-Functional Requirements (NFR)

### 12.1 Performa

| **Metrik** | **Target** | **Kondisi Pengukuran** |
| --- | --- | --- |
| Latensi STT (audio → teks partial) | < 800ms | Jaringan 4G, chunk audio 250ms |
| Latensi TTS (teks → audio mulai diputar) | < 2 detik | Teks < 200 karakter, Regular Plan |
| API Response Time (non-streaming) | < 500ms (P95) | Load normal < 100 concurrent users |
| App Cold Start Time (Web) | < 3 detik | Jaringan 4G, mid-range device |
| WebSocket Max Concurrent Connections | > 500 concurrent | Tanpa degradasi performa berarti |
| Word Error Rate (WER) STT Bahasa Indonesia | < 10% | Audio indoor kondisi bersih, native speaker |
| Live Caption Lag | < 800ms | Audio ke teks di layar |

### 12.2 Keamanan

- Semua komunikasi menggunakan **HTTPS / WSS** (TLS 1.3 minimum).
- Password disimpan menggunakan **bcrypt** dengan work factor minimum **12**.
- JWT access token expired dalam **15 menit**; refresh token expired dalam **30 hari**.
- Data audio pengguna **TIDAK disimpan permanen** di server — hanya diproses streaming lalu dibuang.
- Cloud backup dienkripsi menggunakan **AES-256 at rest**.
- Rate limiting: maksimal **60 request/menit per IP** pada semua endpoint publik.
- Input sanitization wajib pada semua endpoint yang menerima teks dari pengguna.

### 12.3 Skalabilitas & Ketersediaan

- Target uptime: **99.5% (monthly)**, dengan downtime maintenance terjadwal di luar jam sibuk.
- Arsitektur **stateless** pada backend NestJS untuk mendukung horizontal scaling.
- Redis untuk state management WebSocket session (mendukung multi-instance deployment).
- CDN (Vercel Edge / CloudFront) untuk aset statis frontend web.

### 12.4 Privasi & Kepatuhan

- Aplikasi wajib mematuhi **UU PDP (Perlindungan Data Pribadi) Indonesia**.
- Privacy Policy dan Terms of Service wajib tersedia dan dapat diakses dari dalam aplikasi.
- Pengguna dapat meminta **penghapusan data akun** beserta seluruh riwayatnya (right to erasure).
- Tidak ada data audio yang dikirim ke pihak ketiga selain OpenAI Whisper (dalam konteks processing, bukan storage).

---

## 13. Strategi Testing & Quality Assurance

### 13.1 Matriks Testing

| **Tipe Testing** | **Tools / Metode** | **Coverage Target** | **PIC** |
| --- | --- | --- | --- |
| Unit Testing (Backend) | Jest + Supertest | > 80% line coverage (STT, TTS, Auth) | Backend Dev |
| Integration Testing | Jest + Docker (PG + Redis) | Semua API endpoint tercover | Backend Dev |
| E2E Testing (Web) | Playwright | Happy path semua user flow utama | QA Lead |
| E2E Testing (Mobile) | Flutter Integration Test | Happy path STT, TTS, Login, History | Mobile Dev |
| Accessibility Audit | Axe-core + Manual WCAG checklist | **Zero** critical WCAG 2.1 AA violation | Designer + QA |
| Load Testing (WebSocket) | Artillery.io / k6 | 500 concurrent, WS stability 30 menit | DevOps |
| Security Testing | OWASP ZAP + manual pentest | Zero critical vulnerability | Backend Lead |
| Beta Testing Pengguna | Closed beta komunitas tunarungu (min 20 user) | SUS Score > 70 | Product Manager |
| Design Token Audit | Manual Figma vs code comparison | 100% token compliance Sonic Clarity | Designer + Frontend |

### 13.2 Kriteria Release ke Production

- [ ] Semua P0 requirements lolos acceptance testing 100%
- [ ] Zero crash rate pada sesi beta testing tertutup
- [ ] Load test WebSocket lulus tanpa memory leak atau connection drop signifikan
- [ ] Aksesibilitas: **zero critical violation** pada Axe-core audit
- [ ] Security: zero critical/high severity finding dari OWASP ZAP scan
- [ ] Semua metrik NFR Section 12.1 terpenuhi di lingkungan staging
- [ ] Sonic Clarity design token compliance: 100% di semua halaman

---

## 14. Glosarium & Referensi

### 14.1 Glosarium Teknis

| **Istilah** | **Definisi** |
| --- | --- |
| `STT` | Speech-to-Text — konversi input suara/audio menjadi teks tertulis |
| `TTS` | Text-to-Speech — konversi teks tertulis menjadi output suara sintetis atau natural |
| `WER` | Word Error Rate — persentase kata yang salah transkripsi dibanding teks referensi |
| `WebSocket` | Protokol komunikasi dua arah berbasis TCP untuk streaming data real-time |
| `WebRTC` | Teknologi web untuk komunikasi audio/video peer-to-peer real-time |
| `WCAG 2.1 AA` | Web Content Accessibility Guidelines — standar aksesibilitas level AA |
| `JWT` | JSON Web Token — token terenkripsi untuk autentikasi stateless |
| `BCP-47` | Standar kode bahasa (contoh: `id-ID` = Bahasa Indonesia, `en-US` = English US) |
| `Magic Link` | Metode login tanpa password via tautan unik yang dikirim ke email |
| `Diarization` | Proses identifikasi dan pemisahan pembicara berbeda dalam satu rekaman |
| `SUS` | System Usability Scale — kuesioner 10 pertanyaan untuk mengukur kemudahan penggunaan |
| `Sonic Clarity` | Design System resmi Swara: font Inter, Primary `#2563EB`, Secondary `#1E293B`, Tertiary `#BC4800` |
| `P0 / P1` | Prioritas requirement: P0 = Must Have (wajib MVP), P1 = Should Have |

### 14.2 Referensi & Dokumentasi Eksternal

- **WCAG 2.1 Guidelines:** https://www.w3.org/TR/WCAG21/
- **OpenAI Whisper API:** https://platform.openai.com/docs/guides/speech-to-text
- **ElevenLabs API:** https://docs.elevenlabs.io
- **Google Cloud Translation API:** https://cloud.google.com/translate/docs
- **NestJS Documentation:** https://docs.nestjs.com
- **NextAuth.js v5:** https://authjs.dev
- **Flutter Accessibility:** https://docs.flutter.dev/accessibility-and-localization/accessibility
- **Stripe Payment Integration:** https://stripe.com/docs/payments
- **Midtrans Documentation:** https://docs.midtrans.com
- **Inter Font (Google Fonts):** https://fonts.google.com/specimen/Inter
- **shadcn/ui Components:** https://ui.shadcn.com
- **Tailwind CSS:** https://tailwindcss.com/docs

---

```
╔══════════════════════════════════════════════════════════════════════╗
║  Dokumen ini bersifat LIVING DOCUMENT.                              ║
║  PRD ini akan diperbarui seiring perubahan keputusan produk,        ║
║  feedback beta testing, dan iterasi development.                    ║
║  Setiap perubahan signifikan harus dicatat dalam changelog          ║
║  versi dokumen dan dikomunikasikan kepada seluruh tim.              ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

*— Swara PRD v2.0.0 | Dibuat: 10 Juni 2026 | Berdasarkan Blueprint v2.0.0 | Design System: Sonic Clarity —*
### Typography & Styling Update
- **Font**: Updated to Plus Jakarta Sans for a highly professional, modern, and clean dashboard aesthetic.
- **UI Refinements**: Added dynamic gradient cards, soft shadow layering, and rounded geometry (rounded-2xl) to enhance the visual hierarchy and give a premium feel.
