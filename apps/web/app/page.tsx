"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Mic, Volume2, Globe2, ChevronRight, Check, Play, Settings, 
  MessageSquare, FileText, Type, Maximize, Smartphone, 
  ArrowRight, Sparkles, LayoutDashboard, ChevronDown, Quote,
  MonitorSmartphone, Zap, ShieldCheck
} from 'lucide-react';
import Particles from '../components/ui/Particles';

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [scrolled, setScrolled] = useState(false);

  // Handle Navbar styling on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cara Kerja auto-cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const faqs = [
    {
      q: "Apakah percakapan saya direkam atau disimpan di server internet?",
      a: "Sama sekali tidak. Kami sangat memprioritaskan privasi Anda. Seluruh audio diproses secara langsung menjadi teks, dan hanya disimpan pada memori lokal perangkat Anda. Kami tidak memiliki akses ke isi percakapan Anda."
    },
    {
      q: "Bagaimana jika ada lebih dari satu orang yang berbicara bersamaan?",
      a: "Bagi pengguna Premium, Swara dilengkapi dengan sistem pintar untuk membedakan suara. Aplikasi akan secara otomatis menandai 'Pembicara 1', 'Pembicara 2', sehingga Anda dapat mengikuti diskusi dengan mudah di layar."
    },
    {
      q: "Apakah aplikasi ini memerlukan koneksi internet yang sangat cepat?",
      a: "Tidak. Swara dioptimalkan untuk beroperasi secara efisien bahkan pada jaringan 3G atau 4G standar. Proses pengubahan suara menjadi teks tetap berjalan responsif tanpa penundaan berarti."
    },
    {
      q: "Apa perbedaan utama antara paket Gratis dan Premium?",
      a: "Paket Gratis sangat memadai untuk komunikasi harian singkat (batas 15 menit per sesi). Sedangkan paket Premium dirancang bagi Anda yang membutuhkan durasi tanpa batas untuk keperluan intensif seperti rapat panjang atau mendengarkan kelas kuliah seharian."
    }
  ];

  return (
    <div className="font-sans bg-[#FAFCFF] text-slate-900 overflow-x-hidden selection:bg-blue-500/20 selection:text-blue-900">
      
      {/* Absolute Highest Level Decorative Backgrounds */}
      <div className="absolute top-0 inset-x-0 h-[1200px] overflow-hidden pointer-events-none -z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      <div className="absolute top-0 inset-x-0 h-screen overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-300/30 via-transparent to-transparent blur-[100px]"></div>
        <div className="absolute top-[10%] -right-[20%] w-[1000px] h-[1000px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-200/40 via-transparent to-transparent blur-[120px]"></div>
      </div>

      {/* Interactive Particles Background for Hero */}
      <div className="absolute top-0 inset-x-0 h-screen overflow-hidden pointer-events-auto z-0">
        <Particles
          particleColors={["#2563EB", "#3B82F6", "#8B5CF6", "#BC4800", "#EFF6FF"]}
          particleCount={450}
          particleSpread={15}
          speed={0.08}
          particleBaseSize={110}
          moveParticlesOnHover={true}
          particleHoverFactor={3}
          alphaParticles={true}
          sizeRandomness={1.8}
          cameraDistance={25}
          disableRotation={false}
        />
      </div>

      {/* Ultra-Premium Navbar */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${scrolled ? 'bg-white/70 backdrop-blur-2xl border-slate-200/50 shadow-sm shadow-blue-900/5 h-16' : 'bg-transparent border-transparent h-24'}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-full flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <img src="/logo.png" alt="Swara Logo" className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
            <span className="text-[22px] font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">Swara.</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10 bg-white/50 backdrop-blur-md px-8 py-2.5 rounded-full border border-white/80 shadow-sm">
            <Link href="#fitur" className="text-[14px] font-bold text-slate-500 hover:text-blue-600 transition-colors">Fitur</Link>
            <Link href="#cara-kerja" className="text-[14px] font-bold text-slate-500 hover:text-blue-600 transition-colors">Cara Kerja</Link>
            <Link href="#testimoni" className="text-[14px] font-bold text-slate-500 hover:text-blue-600 transition-colors">Ulasan</Link>
            <Link href="#harga" className="text-[14px] font-bold text-slate-500 hover:text-blue-600 transition-colors">Harga</Link>
          </div>
          
          <div className="flex items-center gap-5">
            <Link href="/login" className="hidden sm:block text-[15px] font-bold text-slate-600 hover:text-blue-600 transition-colors">Masuk</Link>
            <Link href="/register" className="text-[14px] font-bold text-white bg-slate-900 hover:bg-blue-600 px-6 py-3 rounded-full transition-all duration-300 shadow-xl shadow-slate-900/10 hover:shadow-blue-600/30 hover:-translate-y-0.5">Daftar Gratis</Link>
          </div>
        </div>
      </nav>

      <main>
        
        {/* Hero Section */}
        <section className="pt-40 pb-20 px-6 md:px-12 text-center max-w-[1000px] mx-auto relative z-10">
          <div className="inline-flex items-center gap-2.5 bg-white/60 backdrop-blur-xl border border-blue-100/50 text-blue-700 text-xs font-bold px-4 py-2 rounded-full mb-8 shadow-xl shadow-blue-900/5 hover:scale-105 transition-transform cursor-default relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100/0 via-blue-100/50 to-blue-100/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <Sparkles className="w-3.5 h-3.5 text-blue-500 relative z-10" />
            <span className="relative z-10 tracking-wide uppercase">Komunikasi Inklusif Tanpa Batas</span>
          </div>
          
          <h1 className="text-5xl md:text-[84px] font-black leading-[1.05] tracking-tighter text-slate-900 mb-8 [text-wrap:balance]">
            Dengar dengan <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">Mata</span>,<br/>Bicara dengan <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-500 to-rose-500">Nyaman</span>.
          </h1>
          
          <p className="text-[20px] text-slate-500 max-w-[720px] mx-auto mb-14 leading-relaxed font-medium [text-wrap:balance]">
            Swara hadir untuk menjembatani komunikasi bagi penyandang disabilitas pendengaran. Ubah ucapan menjadi teks secara seketika, atau ketik pesan Anda untuk disuarakan dengan intonasi natural.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link href="/register" className="w-full sm:w-auto text-[16px] font-bold text-white bg-blue-600 px-8 py-4.5 rounded-full flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:shadow-[0_0_60px_rgba(37,99,235,0.4)] hover:bg-blue-500 hover:-translate-y-1 relative overflow-hidden group">
              <span className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 rounded-full"></span>
              <span className="relative z-10">Mulai Gunakan Swara</span>
              <ArrowRight className="w-4.5 h-4.5 relative z-10" />
            </Link>
            <Link href="#cara-kerja" className="w-full sm:w-auto text-[16px] font-bold text-slate-700 bg-white border border-slate-200/80 px-8 py-4.5 rounded-full flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-slate-200/20 hover:border-blue-200 hover:bg-blue-50/50 hover:text-blue-700">
              <Play className="w-4.5 h-4.5 text-blue-600 fill-current" /> Lihat Cara Kerjanya
            </Link>
          </div>
          
          <div className="mt-14 pt-8 border-t border-slate-200/60 max-w-[600px] mx-auto flex flex-wrap items-center justify-center gap-8">
             <div className="flex items-center gap-2 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
               <MonitorSmartphone className="w-5 h-5 text-slate-700" />
               <span className="text-[13px] font-bold text-slate-700 tracking-wider">BISA DI HP & LAPTOP</span>
             </div>
             <div className="flex items-center gap-2 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
               <Zap className="w-5 h-5 text-amber-500" />
               <span className="text-[13px] font-bold text-slate-700 tracking-wider">CEPAT & RESPONSIF</span>
             </div>
             <div className="flex items-center gap-2 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
               <ShieldCheck className="w-5 h-5 text-emerald-500" />
               <span className="text-[13px] font-bold text-slate-700 tracking-wider">PRIVASI SANGAT AMAN</span>
             </div>
          </div>
        </section>

        {/* Floating Glass Stats Row */}
        <div className="mb-32 mx-6 md:mx-12 max-w-[1000px] xl:mx-auto relative z-20">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur opacity-10"></div>
          <div className="bg-white/70 backdrop-blur-3xl border border-white rounded-[2rem] flex flex-col md:flex-row overflow-hidden shadow-2xl shadow-blue-900/10 relative">
            
            <div className="flex-1 p-10 text-center border-b md:border-b-0 md:border-r border-slate-200/50 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-50/0 to-blue-50/50 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <div className="text-[48px] font-black tracking-tighter text-slate-900 mb-1 relative z-10">10<span className="text-blue-600">+</span></div>
              <div className="text-[13px] font-bold text-slate-400 uppercase tracking-widest relative z-10">Bahasa Asing</div>
            </div>
            
            <div className="flex-1 p-10 text-center border-b md:border-b-0 md:border-r border-slate-200/50 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-50/0 to-blue-50/50 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <div className="text-[48px] font-black tracking-tighter text-slate-900 mb-1 relative z-10">99<span className="text-blue-600">%</span></div>
              <div className="text-[13px] font-bold text-slate-400 uppercase tracking-widest relative z-10">Akurasi Dengar</div>
            </div>
            
            <div className="flex-1 p-10 text-center border-b md:border-b-0 md:border-r border-slate-200/50 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-50/0 to-blue-50/50 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <div className="text-[48px] font-black tracking-tighter text-slate-900 mb-1 relative z-10">0<span className="text-blue-600"> iklan</span></div>
              <div className="text-[13px] font-bold text-slate-400 uppercase tracking-widest relative z-10">Fokus Penuh</div>
            </div>
            
            <div className="flex-1 p-10 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-50/0 to-blue-50/50 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <div className="text-[48px] font-black tracking-tighter text-slate-900 mb-1 relative z-10">&infin;</div>
              <div className="text-[13px] font-bold text-slate-400 uppercase tracking-widest relative z-10">Gratis Dipakai</div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <section id="fitur" className="py-24 px-6 md:px-12 relative">
          <div className="text-center mb-24 relative z-10">
            <div className="inline-block border border-blue-200/50 bg-blue-50/50 px-4 py-1.5 rounded-full text-xs font-bold text-blue-600 tracking-widest uppercase mb-6 shadow-sm">Fitur Utama Kami</div>
            <h2 className="text-4xl md:text-[56px] font-extrabold tracking-tighter leading-[1.05] text-slate-900 mb-8 [text-wrap:balance]">
              Dirancang khusus untuk mendukung<br/>aktivitas harian Anda.
            </h2>
            <p className="text-[20px] text-slate-500 max-w-[640px] mx-auto leading-relaxed font-medium">
              Mulai dari perbincangan ringan bersama keluarga, hingga pertemuan penting di tempat kerja dan sekolah.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1300px] mx-auto relative z-10">
            <FeatureCard 
              icon={<Mic />}
              title="Speech-to-Text"
              desc="Menangkap ucapan di sekitar Anda dan mengubahnya menjadi teks seketika. Sangat peka dan akurat bahkan di lingkungan yang ramai."
              color="blue"
            />
            <FeatureCard 
              icon={<Volume2 />}
              title="Text-to-Speech"
              desc="Ketik pesan yang ingin Anda sampaikan, dan Swara akan menyuarakannya dengan intonasi ramah yang menyerupai suara manusia asli."
              color="orange"
            />
            <FeatureCard 
              icon={<Globe2 />}
              title="Terjemah"
              desc="Hancurkan batasan bahasa. Swara dapat menerjemahkan percakapan dalam bahasa asing langsung ke bahasa Indonesia di layar Anda."
              color="emerald"
            />
            <FeatureCard 
              icon={<MessageSquare />}
              title="Percakapan 2 Arah"
              desc="Layar akan terbagi menjadi dua bagian untuk Anda dan lawan bicara. Komunikasi tatap muka menjadi jauh lebih interaktif dan setara."
              color="purple"
            />
            <FeatureCard 
              icon={<FileText />}
              title="Auto-Summary AI"
              desc="Tidak perlu repot mencatat saat kuliah atau rapat. Swara akan membantu merangkum poin-poin penting secara otomatis setelah percakapan selesai."
              color="slate"
            />
            <FeatureCard 
              icon={<Type />}
              title="Live Caption Mode"
              desc="Teks akan ditampilkan dalam ukuran besar dan bergulir otomatis. Sangat sesuai untuk digunakan di ruang kelas atau saat menonton televisi."
              color="rose"
            />
          </div>
        </section>

        {/* How It Works Section */}
        <section id="cara-kerja" className="py-32 px-6 md:px-12 relative overflow-hidden bg-white border-y border-slate-200/60">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center max-w-[1200px] mx-auto pt-10">
            
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-[3rem] transform -rotate-3 scale-105 opacity-80 blur-lg"></div>
              <div className="bg-white/80 backdrop-blur-xl border border-white shadow-2xl shadow-slate-200/50 rounded-[2.5rem] p-10 relative z-10 min-h-[500px] flex flex-col justify-center gap-6">
                
                <div className={`p-6 border-2 rounded-2xl flex items-center gap-5 transition-all duration-700 transform ${activeStep === 0 ? 'border-blue-500 bg-blue-50 scale-105 shadow-xl shadow-blue-900/5' : 'border-slate-100 scale-100 opacity-60'}`}>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${activeStep === 0 ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 'bg-slate-100 text-slate-400'}`}>
                    <Globe2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-blue-500 mb-1 tracking-widest uppercase">Langkah 1</div>
                    <div className="text-[18px] font-bold text-slate-900">Buka Aplikasi</div>
                  </div>
                </div>
                
                <div className="w-px h-8 bg-slate-200 mx-auto"></div>
                
                <div className={`p-6 border-2 rounded-2xl flex items-center gap-5 transition-all duration-700 transform ${activeStep === 1 ? 'border-emerald-500 bg-emerald-50 scale-105 shadow-xl shadow-emerald-900/5' : 'border-slate-100 scale-100 opacity-60'}`}>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${activeStep === 1 ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30' : 'bg-slate-100 text-slate-400'}`}>
                    <Mic className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-emerald-500 mb-1 tracking-widest uppercase">Langkah 2</div>
                    <div className="text-[18px] font-bold text-slate-900">Tekan Tombol Mikrofon</div>
                  </div>
                </div>
                
                <div className="w-px h-8 bg-slate-200 mx-auto"></div>
                
                <div className={`p-6 border-2 rounded-2xl flex items-center gap-5 transition-all duration-700 transform ${activeStep === 2 ? 'border-orange-500 bg-orange-50 scale-105 shadow-xl shadow-orange-900/5' : 'border-slate-100 scale-100 opacity-60'}`}>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${activeStep === 2 ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30' : 'bg-slate-100 text-slate-400'}`}>
                    <Type className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-orange-500 mb-1 tracking-widest uppercase">Langkah 3</div>
                    <div className="text-[18px] font-bold text-slate-900">Komunikasi Berjalan Lancar</div>
                  </div>
                </div>

              </div>
            </div>

            <div className="order-1 lg:order-2 text-slate-900">
              <div className="inline-block border border-blue-200 bg-blue-50 px-4 py-1.5 rounded-full text-xs font-bold text-blue-600 tracking-widest uppercase mb-6">Mudah dan Praktis</div>
              <h2 className="text-4xl md:text-[56px] font-extrabold tracking-tighter leading-[1.05] mb-8 text-slate-900">
                Mulai berkomunikasi dalam<br/>3 langkah mudah.
              </h2>
              <p className="text-[20px] text-slate-500 mb-12 leading-relaxed font-medium">
                Tidak perlu pengaturan yang rumit. Cukup buka aplikasi Swara, dan Anda siap berinteraksi secara aktif dengan siapa saja.
              </p>
              
              <div className="flex flex-col gap-4 relative">
                <div className="absolute top-8 bottom-8 left-[30px] w-[2px] bg-slate-100 -z-10"></div>
                
                {[
                  { title: "Buka Aplikasi", desc: "Buka aplikasi Swara di perangkat Anda. Pilih mode untuk mengubah suara menjadi teks, atau teks menjadi suara sesuai kebutuhan saat itu." },
                  { title: "Tekan Tombol Mikrofon", desc: "Tekan tombol mikrofon yang tersedia di layar. Letakkan perangkat Anda di meja, dan Swara akan mulai mendengarkan percakapan." },
                  { title: "Komunikasi Berjalan Lancar", desc: "Teks akan langsung muncul dengan jelas di layar. Seluruh riwayat percakapan akan tersimpan rapi sehingga mudah untuk dibaca kembali." }
                ].map((step, idx) => (
                  <div 
                    key={idx}
                    className={`flex gap-8 p-6 rounded-[2rem] cursor-pointer transition-all duration-300 ${activeStep === idx ? 'bg-white border border-slate-200 shadow-xl shadow-slate-200/50' : 'hover:bg-slate-50 border border-transparent'}`}
                    onClick={() => setActiveStep(idx)}
                  >
                    <div className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center text-[16px] font-black shrink-0 transition-colors ${activeStep === idx ? 'bg-blue-600 border-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                      {idx + 1}
                    </div>
                    <div className="pt-2">
                      <div className={`text-[20px] font-bold mb-2 transition-colors ${activeStep === idx ? 'text-slate-900' : 'text-slate-500'}`}>{step.title}</div>
                      <div className="text-[16px] text-slate-500 leading-relaxed font-medium">{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
          <div className="pb-16"></div>
        </section>

        {/* Social Proof / Testimonials Section */}
        <section id="testimoni" className="py-32 px-6 md:px-12 bg-white">
          <div className="max-w-[1200px] mx-auto text-center mb-20">
            <div className="inline-block border border-indigo-200/50 bg-indigo-50/50 px-4 py-1.5 rounded-full text-xs font-bold text-indigo-600 tracking-widest uppercase mb-6 shadow-sm">Ulasan Pengguna Swara</div>
            <h2 className="text-4xl md:text-[56px] font-extrabold tracking-tighter leading-[1.05] text-slate-900 mb-6">
              Memberikan dampak nyata.
            </h2>
            <p className="text-[20px] text-slate-500 max-w-[640px] mx-auto font-medium">
              Lihat bagaimana Swara telah membantu mempermudah rutinitas harian para pengguna dalam bekerja, belajar, dan bersosialisasi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
            {/* Testimonial 1 */}
            <div className="bg-[#FAFCFF] border border-slate-200/80 p-10 rounded-[2.5rem] relative hover:-translate-y-2 transition-transform duration-300">
              <Quote className="absolute top-8 right-8 w-12 h-12 text-blue-100" />
              <div className="flex items-center gap-1 mb-6">
                {[1,2,3,4,5].map(i => <StarIcon key={i} />)}
              </div>
              <p className="text-[16px] text-slate-700 font-medium leading-relaxed mb-8 relative z-10">
                "Sangat membantu saat mengikuti kelas di kampus. Saya tidak lagi kesulitan menangkap penjelasan dosen, cukup meletakkan Swara di meja dan membaca teksnya dengan fokus."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-md">RA</div>
                <div>
                  <div className="text-[15px] font-bold text-slate-900">Rizky Aditya</div>
                  <div className="text-[13px] text-slate-500 font-medium">Mahasiswa Universitas Negeri</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-[#FAFCFF] border border-slate-200/80 p-10 rounded-[2.5rem] relative hover:-translate-y-2 transition-transform duration-300 shadow-xl shadow-slate-200/50">
              <Quote className="absolute top-8 right-8 w-12 h-12 text-blue-100" />
              <div className="flex items-center gap-1 mb-6">
                {[1,2,3,4,5].map(i => <StarIcon key={i} />)}
              </div>
              <p className="text-[16px] text-slate-700 font-medium leading-relaxed mb-8 relative z-10">
                "Fitur layar dua arahnya sangat luar biasa. Saya menggunakannya di toko; pembeli berbicara dan teksnya muncul, lalu saya membalas dengan mengetik untuk disuarakan secara otomatis."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-md">DS</div>
                <div>
                  <div className="text-[15px] font-bold text-slate-900">Dewi Sartika</div>
                  <div className="text-[13px] text-slate-500 font-medium">Pemilik Usaha Kuliner</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-[#FAFCFF] border border-slate-200/80 p-10 rounded-[2.5rem] relative hover:-translate-y-2 transition-transform duration-300">
              <Quote className="absolute top-8 right-8 w-12 h-12 text-blue-100" />
              <div className="flex items-center gap-1 mb-6">
                {[1,2,3,4,5].map(i => <StarIcon key={i} />)}
              </div>
              <p className="text-[16px] text-slate-700 font-medium leading-relaxed mb-8 relative z-10">
                "Akurasi penangkapan kata dalam bahasa Indonesia sangat mengagumkan. Bahkan di lingkungan yang cukup bising seperti stasiun, aplikasi ini tetap menerjemahkan ucapan dengan tepat."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-orange-500 to-rose-500 flex items-center justify-center text-white font-bold text-sm shadow-md">AP</div>
                <div>
                  <div className="text-[15px] font-bold text-slate-900">Arif Prakoso</div>
                  <div className="text-[13px] text-slate-500 font-medium">Desainer Grafis Profesional</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="harga" className="py-32 px-6 bg-[#FAFCFF]">
          <div className="max-w-[800px] mx-auto text-center mb-24">
            <h2 className="text-4xl md:text-[56px] font-extrabold tracking-tighter leading-[1.05] text-slate-900 mb-6">
              Komunikasi tanpa hambatan,<br/>gratis selamanya.
            </h2>
            <p className="text-[20px] text-slate-500 font-medium">
              Swara selalu dapat digunakan secara gratis. Apabila Anda membutuhkan durasi penggunaan ekstra, Anda dapat beralih ke paket langganan.
            </p>
          </div>
          
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            
            {/* Free Plan */}
            <div className="bg-[#E2E8F0]/30 border border-slate-200 rounded-[2.5rem] p-8 md:p-10 hover:border-slate-300 hover:shadow-xl transition-all duration-300 relative group h-full flex flex-col">
              <div className="text-[13px] font-extrabold text-slate-500 tracking-widest uppercase mb-4">Paket Regular</div>
              <div className="text-[48px] font-extrabold text-slate-800 tracking-tighter leading-none mb-4">
                GRATIS
              </div>
              <p className="text-[15px] text-slate-600 mb-8 pb-8 border-b border-slate-200 font-medium leading-relaxed">
                Seluruh fitur esensial yang Anda butuhkan untuk komunikasi sehari-hari.
              </p>
              
              <div className="flex flex-col gap-4 mb-10 flex-1">
                {['Maksimal 30 menit per sesi', 'Batas 1.000 karakter translasi/hari', '3 Preset suara natural', 'Riwayat disimpan lokal', '100% bebas iklan'].map((feat, i) => (
                  <div key={i} className="flex items-start gap-4 text-[14px] font-bold text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-white text-slate-500 flex items-center justify-center shrink-0 mt-0.5 shadow-sm"><Check className="w-3 h-3" /></div>
                    {feat}
                  </div>
                ))}
              </div>
              
              <Link href="/register" className="block text-center w-full py-4 rounded-[1.25rem] text-[15px] font-bold border-2 border-slate-300 text-[#334155] bg-white hover:bg-slate-50 transition-colors mt-auto">
                Mulai Gunakan Gratis
              </Link>
            </div>
            
            {/* Premium Plan - Bulanan */}
            <div className="bg-white border-2 border-blue-600 rounded-[2.5rem] p-10 md:p-12 relative shadow-2xl shadow-blue-900/10 md:scale-105 z-10 overflow-hidden h-full flex flex-col">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/50 rounded-full blur-[80px]"></div>
              
              <div className="absolute top-6 right-6 bg-blue-50 border border-blue-100 text-blue-700 text-[11px] font-bold px-4 py-1.5 rounded-full tracking-widest uppercase shadow-sm">
                Pilihan Populer
              </div>
              
              <div className="text-[13px] font-extrabold text-blue-600 tracking-widest uppercase mb-4">Premium Bulanan</div>
              <div className="text-[48px] font-extrabold text-slate-900 tracking-tighter leading-none mb-2 flex items-end gap-2 relative z-10">
                Rp 49<span className="text-[28px] mb-1">rb</span><span className="text-[14px] font-bold text-slate-500 mb-2">/bln</span>
              </div>
              <p className="text-[15px] text-slate-500 mb-8 pb-8 border-b border-slate-100 font-medium leading-relaxed relative z-10">
                Pilihan terbaik untuk mendukung produktivitas penuh tanpa batasan.
              </p>
              
              <div className="flex flex-col gap-4 mb-10 flex-1 relative z-10">
                {['Unlimited durasi sesi STT', 'Unlimited Real-time Translation', 'SmartNote AI Summary', 'Premium Natural Voices (10+)', 'Multi-Speaker Recognition', 'Cloud Backup & Sync'].map((feat, i) => (
                  <div key={i} className="flex items-start gap-4 text-[14px] font-bold text-slate-800">
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-blue-600/20"><Check className="w-3 h-3" /></div>
                    {feat}
                  </div>
                ))}
              </div>
              
              <Link href="/register" className="block text-center w-full py-4 rounded-[1.25rem] text-[15px] font-bold bg-[#2563EB] hover:bg-blue-700 text-white transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:-translate-y-0.5 mt-auto relative z-10">
                Berlangganan Bulanan
              </Link>
            </div>

            {/* Premium Plan - Tahunan */}
            <div className="bg-[#FFF8F3] border border-[#BC4800]/20 rounded-[2.5rem] p-8 md:p-10 hover:border-[#BC4800]/40 hover:shadow-xl transition-all duration-300 relative overflow-hidden h-full flex flex-col">
              <div className="absolute top-0 right-0 w-80 h-80 bg-orange-100/50 rounded-full blur-[80px]"></div>
              
              <div className="text-[13px] font-extrabold text-[#BC4800] tracking-widest uppercase mb-4">Premium Tahunan</div>
              <div className="text-[48px] font-extrabold text-slate-900 tracking-tighter leading-none mb-2 flex items-end gap-2 relative z-10">
                Rp 399<span className="text-[28px] mb-1">rb</span><span className="text-[14px] font-bold text-slate-500 mb-2">/thn</span>
              </div>
              <p className="text-[15px] text-slate-600 mb-8 pb-8 border-b border-[#BC4800]/10 font-medium leading-relaxed relative z-10">
                Pilihan paling hemat untuk komitmen jangka panjang. Semua fitur Bulanan!
              </p>
              
              <div className="flex flex-col gap-4 mb-10 flex-1 relative z-10">
                <div className="p-3 bg-[#BC4800]/10 rounded-xl border border-[#BC4800]/20 flex items-center justify-center mb-2">
                  <span className="text-[13px] font-extrabold text-[#BC4800] uppercase tracking-wider">🔥 Hemat 32%</span>
                </div>
                {['Semua fitur Premium Bulanan', 'Priority Email & In-App Support', 'Akses beta fitur baru lebih dulu'].map((feat, i) => (
                  <div key={i} className="flex items-start gap-4 text-[14px] font-bold text-slate-800">
                    <div className="w-5 h-5 rounded-full bg-[#BC4800] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-md"><Check className="w-3 h-3" /></div>
                    {feat}
                  </div>
                ))}
              </div>
              
              <Link href="/register" className="block text-center w-full py-4 rounded-[1.25rem] text-[15px] font-bold bg-[#BC4800] hover:bg-[#9c3c00] text-white transition-all shadow-[0_4px_14px_rgba(188,72,0,0.3)] hover:-translate-y-0.5 mt-auto relative z-10">
                Berlangganan Tahunan
              </Link>
            </div>

          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-32 px-6 md:px-12 bg-[#FAFCFF] border-t border-slate-200/60">
          <div className="max-w-[700px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold tracking-tighter text-slate-900 mb-6">Pertanyaan yang Sering Diajukan</h2>
              <p className="text-lg text-slate-500 font-medium">Temukan jawaban untuk pertanyaan umum di bawah ini, atau hubungi tim dukungan kami jika Anda membutuhkan bantuan lebih lanjut.</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  className={`border rounded-2xl overflow-hidden transition-all duration-300 ${activeFaq === idx ? 'bg-white border-blue-200 shadow-xl shadow-blue-900/5' : 'bg-transparent border-slate-200/80 hover:border-slate-300'}`}
                >
                  <button 
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full px-8 py-6 text-left flex items-center justify-between focus:outline-none"
                  >
                    <span className={`text-[17px] font-bold ${activeFaq === idx ? 'text-blue-600' : 'text-slate-900'}`}>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 shrink-0 ${activeFaq === idx ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
                  </button>
                  <div className={`px-8 overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === idx ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-[15px] text-slate-600 font-medium leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Giant CTA */}
        <section className="py-16 md:py-24 px-4 md:px-6 relative">
          <div className="max-w-[1200px] mx-auto bg-white/40 backdrop-blur-3xl rounded-[3rem] p-8 md:p-24 text-center relative overflow-hidden shadow-[0_20px_80px_rgba(37,99,235,0.1)] border border-white">
            {/* Absolute Background Effects inside CTA */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/50 to-indigo-50/80 -z-10"></div>
            <div className="absolute -top-[30%] -left-[10%] w-[500px] h-[500px] rounded-full bg-blue-400/20 blur-[100px] -z-10"></div>
            <div className="absolute -bottom-[30%] -right-[10%] w-[500px] h-[500px] rounded-full bg-indigo-400/20 blur-[100px] -z-10"></div>
            
            {/* Floating Decorative Elements */}
            <div className="absolute top-12 left-12 w-20 h-20 bg-white rounded-2xl shadow-xl shadow-blue-900/5 rotate-12 flex items-center justify-center -z-10 opacity-70">
              <Mic className="w-8 h-8 text-blue-300" />
            </div>
            <div className="absolute bottom-12 right-12 w-24 h-24 bg-white rounded-3xl shadow-xl shadow-indigo-900/5 -rotate-12 flex items-center justify-center -z-10 opacity-70">
              <Globe2 className="w-10 h-10 text-indigo-300" />
            </div>

            <h2 className="text-4xl md:text-[64px] font-black tracking-tighter text-slate-900 mb-6 md:mb-8 relative z-10 [text-wrap:balance] leading-[1.05]">
              Siap untuk mulai berkomunikasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">tanpa batas?</span>
            </h2>
            <p className="text-[18px] md:text-[22px] text-slate-500 mb-10 md:mb-14 max-w-[640px] mx-auto font-medium relative z-10 leading-relaxed [text-wrap:balance]">
              Bergabunglah bersama ribuan pengguna lainnya yang kini dapat berinteraksi dengan lebih nyaman dan percaya diri setiap hari.
            </p>
            
            <div className="relative z-10 flex justify-center">
              <Link href="/register" className="inline-flex text-[16px] md:text-[18px] font-bold text-white bg-blue-600 px-8 md:px-10 py-4 md:py-5 rounded-full items-center gap-3 transition-all duration-300 hover:scale-105 hover:bg-blue-500 shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_rgba(37,99,235,0.6)] whitespace-nowrap">
                Buat Akun Secara Gratis <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
            </div>
            <p className="mt-6 md:mt-8 text-[13px] md:text-[14px] font-bold text-slate-400 relative z-10 flex items-start md:items-center justify-center gap-2.5 text-left md:text-center max-w-[280px] md:max-w-none mx-auto leading-relaxed">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 md:mt-0" /> 
              <span>Proses pendaftaran cepat, tidak memerlukan kartu kredit.</span>
            </p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-[#FAFCFF] border-t border-slate-200/60 pt-24 pb-12 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
        <div className="absolute -bottom-[50%] -left-[10%] w-[800px] h-[800px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent blur-[100px] pointer-events-none"></div>

        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-12 mb-20 relative z-10">
          <div className="col-span-1 md:col-span-2 pr-10">
            <div className="flex items-center gap-3 mb-8">
              <img src="/logo.png" alt="Swara Logo" className="h-10 w-auto object-contain" />
              <span className="text-2xl font-extrabold tracking-tight text-slate-900">Swara.</span>
            </div>
            <p className="text-[16px] font-medium text-slate-500 leading-relaxed mb-8 max-w-[340px]">
              Platform komunikasi yang dibangun dengan dedikasi penuh untuk membantu penyandang disabilitas pendengaran agar dapat saling terhubung tanpa batasan.
            </p>
            <div className="flex items-center gap-4">
              {/* Twitter / X */}
              <a href="#" className="w-11 h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/5 transition-all duration-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="w-11 h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/5 transition-all duration-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" className="w-11 h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/5 transition-all duration-300">
                <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-[12px] font-extrabold tracking-widest uppercase text-slate-900 mb-6 border-l-2 border-blue-600 pl-3">Produk</h4>
            <div className="flex flex-col gap-4">
              <Link href="/stt" className="text-[15px] font-medium text-slate-500 hover:text-blue-600 hover:translate-x-1 transition-all">Speech-to-Text</Link>
              <Link href="/tts" className="text-[15px] font-medium text-slate-500 hover:text-blue-600 hover:translate-x-1 transition-all">Text-to-Speech</Link>
              <Link href="/translation" className="text-[15px] font-medium text-slate-500 hover:text-blue-600 hover:translate-x-1 transition-all">Terjemah</Link>
              <Link href="/premium" className="text-[15px] font-medium text-slate-500 hover:text-blue-600 hover:translate-x-1 transition-all">Harga</Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-[12px] font-extrabold tracking-widest uppercase text-slate-900 mb-6 border-l-2 border-emerald-500 pl-3">Perusahaan</h4>
            <div className="flex flex-col gap-4">
              <Link href="#" className="text-[15px] font-medium text-slate-500 hover:text-blue-600 hover:translate-x-1 transition-all">Tentang Kami</Link>
              <Link href="#" className="text-[15px] font-medium text-slate-500 hover:text-blue-600 hover:translate-x-1 transition-all">Misi Bersama</Link>
              <Link href="#" className="text-[15px] font-medium text-slate-500 hover:text-blue-600 hover:translate-x-1 transition-all">Kisah Komunitas</Link>
              <Link href="#" className="text-[15px] font-medium text-slate-500 hover:text-blue-600 hover:translate-x-1 transition-all">Pusat Bantuan</Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-[12px] font-extrabold tracking-widest uppercase text-slate-900 mb-6 border-l-2 border-orange-500 pl-3">Legal</h4>
            <div className="flex flex-col gap-4">
              <Link href="#" className="text-[15px] font-medium text-slate-500 hover:text-blue-600 hover:translate-x-1 transition-all">Kebijakan Privasi</Link>
              <Link href="#" className="text-[15px] font-medium text-slate-500 hover:text-blue-600 hover:translate-x-1 transition-all">Syarat Pemakaian</Link>
              <Link href="#" className="text-[15px] font-medium text-slate-500 hover:text-blue-600 hover:translate-x-1 transition-all">Info Aksesibilitas</Link>
            </div>
          </div>
        </div>
        
        <div className="max-w-[1200px] mx-auto px-6 border-t border-slate-200/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[14px] font-medium text-slate-400 relative z-10">
          <div>© 2026 <span className="font-bold text-slate-600">Swara Technologies</span>. Hak Cipta Dilindungi.</div>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}

// Reusable Sub-components
function FeatureCard({ icon, title, desc, color }: { icon: React.ReactNode, title: string, desc: string, color: 'blue' | 'orange' | 'emerald' | 'purple' | 'slate' | 'rose' }) {
  const colorMap = {
    blue: "text-blue-600 bg-blue-50 border-blue-100 group-hover:bg-blue-600 group-hover:text-white shadow-blue-500/30",
    orange: "text-orange-600 bg-orange-50 border-orange-100 group-hover:bg-orange-600 group-hover:text-white shadow-orange-500/30",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white shadow-emerald-500/30",
    purple: "text-purple-600 bg-purple-50 border-purple-100 group-hover:bg-purple-600 group-hover:text-white shadow-purple-500/30",
    slate: "text-slate-700 bg-slate-100 border-slate-200 group-hover:bg-slate-700 group-hover:text-white shadow-slate-500/30",
    rose: "text-rose-600 bg-rose-50 border-rose-100 group-hover:bg-rose-600 group-hover:text-white shadow-rose-500/30",
  };

  return (
    <div className="bg-white border border-slate-200/80 p-8 rounded-[2.5rem] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:border-slate-300 transition-all duration-500 group cursor-default hover:-translate-y-2 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      <div className={`w-16 h-16 rounded-[1.25rem] flex items-center justify-center mb-8 border transition-all duration-500 ${colorMap[color]} group-hover:shadow-lg relative z-10`}>
        <div className="w-7 h-7">{icon}</div>
      </div>
      <h3 className="text-[22px] font-extrabold text-slate-900 mb-3 relative z-10 tracking-tight">{title}</h3>
      <p className="text-[15px] text-slate-500 leading-relaxed font-medium relative z-10">
        {desc}
      </p>
    </div>
  );
}

function StarIcon() {
  return (
    <svg className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
