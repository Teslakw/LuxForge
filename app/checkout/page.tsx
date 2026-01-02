'use client'
import React, { useState, Suspense, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CAR_DATABASE } from '@/data/cars'
import {
  User,
  Phone,
  Mail,
  Calendar,
  Loader2,
  ArrowLeft,
  ShieldCheck,
  Send,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/Footer'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // ==========================================
  // PERBAIKAN DI SINI: Parsing Data 'config'
  // ==========================================

  // 1. Ambil query param tunggal bernama 'config'
  const configParam = searchParams.get('config')

  // 2. Parse JSON string kembali menjadi Object
  const configData = useMemo(() => {
    if (!configParam) return null
    try {
      return JSON.parse(decodeURIComponent(configParam))
    } catch (error) {
      console.error('Gagal memproses data config:', error)
      return null
    }
  }, [configParam])

  // 3. Ekstrak data dari object configData
  const carId = configData?.carId
  const selectedColor = configData?.exteriorColor || '#ffffff'
  const interiorColor = configData?.interiorColor || '#2b2b2b'
  const vehicleType = configData?.vehicleType || 'car'

  // Konversi Object parts (key:value) menjadi Array string untuk ditampilkan
  // ConfigurePage mengirim format: { wheels: 'id_velg', tires: 'id_ban' }
  const rawParts = configData?.parts || {}
  const selectedParts: string[] = Object.values(rawParts).filter(
    (val): val is string => typeof val === 'string' && Boolean(val)
  )

  // Cari Data Mobil di Database
  const car = CAR_DATABASE.find(c => c.id === Number(carId))

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // New: Order type (buy or rent)
  const [orderType, setOrderType] = useState<'buy' | 'rent'>('buy')

  // New: Art modification options
  const [artModification, setArtModification] = useState<string | null>(null)

  const ART_MODIFICATIONS = [
    { id: 'batik', name: 'Batik Design', desc: 'Motif batik Indonesia', price: 'Rp 5.000.000' },
    { id: 'airbrush', name: 'Airbrush Custom', desc: 'Lukisan airbrush custom', price: 'Rp 8.000.000' },
    { id: 'pinstripe', name: 'Pinstripe Art', desc: 'Garis-garis seni klasik', price: 'Rp 3.000.000' },
    { id: 'ukir', name: 'Seni Ukir', desc: 'Ukiran artistik pada parts', price: 'Rp 12.000.000' }
  ]

  // Jika mobil tidak ditemukan
  if (!car)
    return (
      <div className='min-h-screen bg-black flex flex-col items-center justify-center text-white'>
        <p className='mb-4'>No vehicle selected or data invalid.</p>
        <Link
          href='/showroom'
          className='text-xs font-bold uppercase tracking-widest border-b border-white pb-1'
        >
          Return to Showroom
        </Link>
      </div>
    )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const payload = {
      carName: car.name,
      vehicleType: vehicleType,
      orderType: orderType,
      artModification: artModification,
      color: selectedColor,
      interiorColor: interiorColor,
      parts: selectedParts,
      customerName: formData.name,
      phone: formData.phone,
      email: formData.email,
      date: formData.date,
      status: 'Pending Review',
      price: orderType === 'rent' ? car.rentalPrice : car.price
    }

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Failed to submit booking')
      // Success UX
      alert(
        'Permintaan Anda telah diterima! Concierge kami akan segera menghubungi Anda.'
      )
      router.push('/showroom')
    } catch (err) {
      // Fallback: localStorage (dev/offline only)
      try {
        const existing = JSON.parse(
          localStorage.getItem('luxforge_bookings') || '[]'
        )
        const fallbackBooking = {
          ...payload,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString()
        }
        localStorage.setItem(
          'luxforge_bookings',
          JSON.stringify([fallbackBooking, ...existing])
        )
      } catch { }
      alert(
        'Permintaan tersimpan secara lokal. Hubungan jaringan tidak stabil.'
      )
      router.push('/showroom')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='pt-24 min-h-screen bg-neutral-950 flex justify-center px-4 md:px-6 pb-20 font-sans'>
      <div className='w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 border border-white/10 bg-[#050505] shadow-2xl'>
        {/* ======================= */}
        {/* KOLOM KIRI: RINGKASAN   */}
        {/* ======================= */}
        <div className='lg:col-span-5 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/10 bg-[#0a0a0a] relative overflow-hidden'>
          <Link
            href={`/configure/${car.id}`}
            className='absolute top-8 left-8 flex items-center text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors z-10'
          >
            <ArrowLeft size={14} className='mr-2' /> Back to Config
          </Link>

          <div className='mt-12 mb-8'>
            <span className='text-[10px] text-gold font-industrial uppercase tracking-widest block mb-2'>Request Application</span>
            <h1 className='text-3xl font-serif text-white mb-2 uppercase leading-none'>
              {car.name}
            </h1>
            <p className='text-gray-500 font-mono text-sm'>Estimasi mulai dari {car.price}</p>
          </div>

          {/* Preview Mobil */}
          <div className='relative aspect-video bg-black border border-white/10 mb-8 group overflow-hidden'>
            <img
              src={car.image}
              className='w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700 grayscale'
              alt='car preview'
            />
            {/* Overlay Warna Pilihan */}
            <div
              className='absolute inset-0 opacity-20 mix-blend-overlay'
              style={{ backgroundColor: selectedColor }}
            ></div>

            {/* Interior Accent Strip */}
            <div
              className='absolute top-0 right-0 w-2 h-full opacity-60'
              style={{ backgroundColor: interiorColor }}
            ></div>

            <div className='absolute bottom-0 left-0 w-full bg-black/80 backdrop-blur px-4 py-2 border-t border-white/10 flex justify-between items-center'>
              <span className='text-[10px] uppercase text-gray-400 tracking-widest'>
                Bespoke Paint
              </span>
              <div className='flex items-center gap-2'>
                <span className='text-[10px] uppercase text-white font-mono'>
                  {selectedColor}
                </span>
                <div
                  className='w-3 h-3 rounded-full border border-white/30'
                  style={{ backgroundColor: selectedColor }}
                ></div>
              </div>
            </div>
          </div>

          {/* Detail Item */}
          <div className='space-y-4'>
            {/* Vehicle Type Badge */}
            <div className='flex justify-between items-center py-3 border-b border-white/5 text-xs'>
              <span className='text-gray-500 uppercase tracking-wider'>
                Vehicle Type
              </span>
              <span className={`px-3 py-1 text-[10px] uppercase font-bold tracking-wider ${vehicleType === 'motorcycle' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>
                {vehicleType === 'motorcycle' ? 'Motor' : 'Mobil'}
              </span>
            </div>

            {/* Order Type Toggle */}
            <div className='py-3 border-b border-white/5'>
              <span className='text-gray-500 uppercase tracking-wider text-xs block mb-3'>
                Tipe Pemesanan
              </span>
              <div className='grid grid-cols-2 gap-2'>
                <button
                  type='button'
                  onClick={() => setOrderType('buy')}
                  className={`py-3 text-xs font-bold uppercase tracking-widest transition-all ${orderType === 'buy'
                    ? 'bg-gold text-black border border-gold'
                    : 'bg-white/5 text-white/60 border border-white/10 hover:border-white/30'}`}
                >
                  Beli
                </button>
                <button
                  type='button'
                  onClick={() => setOrderType('rent')}
                  className={`py-3 text-xs font-bold uppercase tracking-widest transition-all ${orderType === 'rent'
                    ? 'bg-gold text-black border border-gold'
                    : 'bg-white/5 text-white/60 border border-white/10 hover:border-white/30'}`}
                >
                  Sewa
                </button>
              </div>
              {orderType === 'rent' && car.rentalPrice && (
                <p className='mt-2 text-[10px] text-green-400'>
                  Harga sewa: {car.rentalPrice}/hari
                </p>
              )}
            </div>

            <div className='flex justify-between items-center py-3 border-b border-white/5 text-xs'>
              <span className='text-gray-500 uppercase tracking-wider'>
                {orderType === 'rent' ? 'Estimasi Sewa' : 'Estimasi Harga'}
              </span>
              <span className='text-white font-mono'>
                {orderType === 'rent' ? car.rentalPrice || 'N/A' : car.price}*
              </span>
            </div>
            <p className='text-[9px] text-gray-600 italic py-2'>*Harga final akan ditentukan saat kunjungan ke showroom</p>
            <div className='flex justify-between items-center py-3 border-b border-white/5 text-xs'>
              <span className='text-gray-500 uppercase tracking-wider'>
                Custom Paint
              </span>
              <span className='text-white font-mono'>INCLUDED</span>
            </div>

            <div className='flex justify-between items-center py-3 border-b border-white/5 text-xs'>
              <span className='text-gray-500 uppercase tracking-wider'>
                Interior Color
              </span>
              <div className='flex items-center gap-2'>
                <span className='text-white font-mono'>{interiorColor}</span>
                <span
                  className='w-3 h-3 rounded-full border border-white/30'
                  style={{ backgroundColor: interiorColor }}
                ></span>
              </div>
            </div>

            {/* Menampilkan Parts yang dipilih */}
            {selectedParts.length > 0 && (
              <div className='py-3 border-b border-white/5 text-xs'>
                <span className='text-gray-500 uppercase tracking-wider'>
                  Selected Upgrades
                </span>
                <div className='mt-2 flex flex-wrap gap-2'>
                  {selectedParts.map(p => (
                    <span
                      key={p}
                      className='px-2 py-1 bg-white/10 border border-white/20 text-white text-[10px] uppercase tracking-widest'
                    >
                      {p.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Art Modification Options */}
            <div className='py-3 border-b border-white/5'>
              <span className='text-gray-500 uppercase tracking-wider text-xs block mb-3'>
                Modifikasi Seni (Opsional)
              </span>
              <div className='grid grid-cols-2 gap-2'>
                {ART_MODIFICATIONS.map(art => (
                  <button
                    type='button'
                    key={art.id}
                    onClick={() => setArtModification(artModification === art.id ? null : art.id)}
                    className={`p-3 text-left transition-all ${artModification === art.id
                      ? 'bg-gold/20 border border-gold'
                      : 'bg-white/5 border border-white/10 hover:border-white/30'}`}
                  >
                    <span className={`text-[10px] font-bold uppercase tracking-wider block ${artModification === art.id ? 'text-gold' : 'text-white'}`}>
                      {art.name}
                    </span>
                    <span className='text-[9px] text-gray-500 block mt-1'>{art.desc}</span>
                    <span className='text-[10px] text-green-400 mt-1 block'>{art.price}</span>
                  </button>
                ))}
              </div>
              {artModification && (
                <p className='mt-2 text-[10px] text-gold'>
                  ✓ {ART_MODIFICATIONS.find(a => a.id === artModification)?.name} dipilih
                </p>
              )}
            </div>

            <div className='flex justify-between items-center py-3 border-b border-white/5 text-xs'>
              <span className='text-gray-500 uppercase tracking-wider'>
                Import Duties
              </span>
              <span className='text-white font-mono'>CALCULATED</span>
            </div>
            {/* Important Notice */}
            <div className='mt-8 p-4 bg-amber-500/10 border border-amber-500/30 flex gap-4 items-start'>
              <AlertCircle className='text-amber-400 shrink-0' size={20} />
              <div>
                <h4 className='text-amber-400 text-xs font-bold uppercase mb-1'>
                  Ini Bukan Transaksi Final
                </h4>
                <p className='text-gray-400 text-[10px] leading-relaxed'>
                  Form ini adalah permintaan awal. Setelah kami review, Anda akan menerima konfirmasi via email untuk mengunjungi showroom dan membuat kesepakatan final.
                </p>
              </div>
            </div>

            <div className='mt-4 p-4 bg-white/5 border border-white/10 flex gap-4 items-start'>
              <ShieldCheck className='text-emerald-500 shrink-0' size={20} />
              <div>
                <h4 className='text-white text-xs font-bold uppercase mb-1'>
                  Proses Aman & Transparan
                </h4>
                <p className='text-gray-500 text-[10px] leading-relaxed'>
                  Tidak ada pembayaran sampai Anda bertemu tim kami di showroom dan sepakat dengan harga final.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ======================= */}
        {/* KOLOM KANAN: FORMULIR   */}
        {/* ======================= */}
        <div className='lg:col-span-7 p-8 md:p-12 bg-black'>
          <h3 className='text-xl font-serif text-white mb-2 uppercase'>
            Form Permintaan
          </h3>
          <p className='text-gray-500 text-xs mb-6'>
            Lengkapi data Anda untuk mengajukan permintaan. Tim kami akan menghubungi Anda dalam 1x24 jam.
          </p>

          {/* Process Steps */}
          <div className='grid grid-cols-4 gap-2 mb-10'>
            {[
              { num: '1', label: 'Isi Form' },
              { num: '2', label: 'Review' },
              { num: '3', label: 'Kunjungi' },
              { num: '4', label: 'Deal' }
            ].map((step, i) => (
              <div key={i} className='text-center'>
                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-gold text-black' : 'bg-white/10 text-white/50'}`}>
                  {step.num}
                </div>
                <p className='text-[9px] text-gray-500 mt-1 uppercase'>{step.label}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className='space-y-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-2'>
                <label className='text-[10px] font-bold uppercase tracking-widest text-gray-500'>
                  Full Name
                </label>
                <div className='flex items-center border-b border-white/20 bg-transparent py-2 focus-within:border-white transition-colors'>
                  <User size={16} className='text-gray-500 mr-3' />
                  <input
                    required
                    type='text'
                    className='bg-transparent w-full text-white outline-none text-sm placeholder-gray-700'
                    placeholder='EX: ALEXANDER HAMILTON'
                    onChange={e =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <label className='text-[10px] font-bold uppercase tracking-widest text-gray-500'>
                  Phone Number
                </label>
                <div className='flex items-center border-b border-white/20 bg-transparent py-2 focus-within:border-white transition-colors'>
                  <Phone size={16} className='text-gray-500 mr-3' />
                  <input
                    required
                    type='tel'
                    className='bg-transparent w-full text-white outline-none text-sm placeholder-gray-700'
                    placeholder='+62 812 XXXX XXXX'
                    onChange={e =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className='space-y-2'>
              <label className='text-[10px] font-bold uppercase tracking-widest text-gray-500'>
                Email Address
              </label>
              <div className='flex items-center border-b border-white/20 bg-transparent py-2 focus-within:border-white transition-colors'>
                <Mail size={16} className='text-gray-500 mr-3' />
                <input
                  required
                  type='email'
                  className='bg-transparent w-full text-white outline-none text-sm placeholder-gray-700'
                  placeholder='CLIENT@LOCALFORGE.ID'
                  onChange={e =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className='space-y-2'>
              <label className='text-[10px] font-bold uppercase tracking-widest text-gray-500'>
                Preferred Appointment Date
              </label>
              <div className='flex items-center border-b border-white/20 bg-transparent py-2 focus-within:border-white transition-colors'>
                <Calendar size={16} className='text-gray-500 mr-3' />
                <input
                  required
                  type='date'
                  className='bg-transparent w-full text-white outline-none text-sm [color-scheme:dark] uppercase'
                  onChange={e =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>
            </div>

            <div className='pt-8 mt-8 border-t border-white/10'>
              <button
                disabled={isSubmitting}
                className='w-full py-5 bg-white text-black font-bold uppercase tracking-[0.2em] text-xs hover:bg-gray-200 transition-all flex justify-center items-center gap-3 disabled:opacity-50'
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className='animate-spin' size={16} /> Processing
                    Request...
                  </>
                ) : (
                  <>
                    Kirim Permintaan <Send size={16} />
                  </>
                )}
              </button>
              <p className='text-center text-[10px] text-gray-600 mt-4 uppercase tracking-wider'>
                Dengan mengirim form, Anda setuju dengan Privacy Policy LocalForge.
              </p>
              <p className='text-center text-[10px] text-amber-500/80 mt-2'>
                ⚠️ Ini bukan pembayaran. Harga final ditentukan di showroom.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// Komponen Utama yang diexport
export default function CheckoutPage() {
  return (
    <>
      <Suspense
        fallback={
          <div className='min-h-screen bg-black flex items-center justify-center text-white'>
            <Loader2 className='animate-spin mr-2' /> Memuat Form Permintaan...
          </div>
        }
      >
        <CheckoutContent />
      </Suspense>
      <Footer />
    </>
  )
}
