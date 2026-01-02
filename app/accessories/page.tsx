'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { ShoppingBag, Star, SlidersHorizontal, X } from 'lucide-react'
import { AnimateOnScroll, AnimatedSection } from '@/components/AnimateOnScroll'

export const ACCESSORIES_DATA = [
    // Performance Parts
    { id: 1, name: 'Öhlins TTX GP Shock', price: 28500000, priceDisplay: 'Rp 28.500.000', image: 'https://trackbikerentals.com/wp-content/uploads/2020/01/ohlins-ttx-gp-shock.jpg', type: 'Suspension', rating: 5, desc: 'Premium racing suspension for maximum performance and control.' },
    { id: 2, name: 'Brembo GP4 Brake Kit', price: 18200000, priceDisplay: 'Rp 18.200.000', image: 'https://brem-p-001.sitecorecontenthub.cloud/api/public/content/9b60718e100740dbb4e7d6304d495659?v=daa336ed', type: 'Braking', rating: 5, desc: 'High-performance brake calipers with exceptional stopping power.' },
    { id: 3, name: 'Akrapovič Titanium Exhaust', price: 32000000, priceDisplay: 'Rp 32.000.000', image: 'https://sklep.kawasaki.pl/29888-large_default/akrapovic-titanium-sports-exhaust-euro-5.jpg', type: 'Exhaust', rating: 5, desc: 'Titanium exhaust system with aggressive sound and power gains.' },
    { id: 4, name: 'K&N High-Flow Air Filter', price: 1200000, priceDisplay: 'Rp 1.200.000', image: 'https://tse3.mm.bing.net/th/id/OIP.8BgiYCD95-SRuWiMrLogcAHaE8?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3', type: 'Performance', rating: 4, desc: 'Washable high-flow air filter for improved engine breathing.' },
    { id: 5, name: 'Quick Throttle Kit', price: 2500000, priceDisplay: 'Rp 2.500.000', image: 'https://th.bing.com/th/id/R.65f3b108e89d44df8060fc85cddb7c1d?rik=n%2fWPzkQmZHYJGA&riu=http%3a%2f%2fimg.f.ridersdiscount.com%2fforum%2fmotion_pro%2fmotion_pro_revolver_throttle_kit-1.jpg&ehk=%2b1%2bTgL%2fzY%2bi8nIxYo5bwYgTKDB64y3K%2ff4P9UA4sURo%3d&risl=&pid=ImgRaw&r=0', type: 'Performance', rating: 5, desc: 'Quick action throttle for faster response and control.' },

    // Riding Gear
    { id: 6, name: 'AGV Pista GP RR Helmet', price: 22500000, priceDisplay: 'Rp 22.500.000', image: 'https://img.alicdn.com/imgextra/i4/6000000004282/O1CN010eYX2p1hVClaBXFn1_!!6000000004282-0-tbvideo.jpg', type: 'Helmet', rating: 5, desc: 'MotoGP-spec carbon fiber helmet with supreme protection.' },
    { id: 7, name: 'Alpinestars Tech Air Vest', price: 15800000, priceDisplay: 'Rp 15.800.000', image: 'https://www.advrider.com/wp-content/uploads/2022/10/ALPINESTARS-TECH-AIR-3-VEST-900x600.jpg', type: 'Apparel', rating: 5, desc: 'Standalone airbag vest with advanced crash detection.' },
    { id: 8, name: 'Dainese Racing Boots', price: 8500000, priceDisplay: 'Rp 8.500.000', image: 'https://s2.paultan.org/image/2016/05/Dainese_TorqueD1OutAir_24-1200x800.jpg', type: 'Boots', rating: 4, desc: 'Professional racing boots with ankle protection system.' },

    // Indonesian Local Art Accessories
    { id: 9, name: 'Batik Mega Mendung Tank Cover', price: 2800000, priceDisplay: 'Rp 2.800.000', image: 'https://lh3.googleusercontent.com/gg-dl/ABS2GSl81JhDaFVCWkTj1FVU_LFuu2-7g6V-akQjWvyWOa4sum2Iiw0zwgbxAPfF7GgAte3a75bcX-8umYdZBmSY3NPvq5RUi1tfEZjvI_9EYB8RgfwpKQeo8NLV8dcobRtRxPsisWwLCPOKE9OPcxRJBsrbApSj-8Fyn_1AfM1nHesqoQ7o1w=s1024-rj', type: 'Seni Lokal', rating: 5, desc: 'Handcrafted tank cover dengan motif Batik Mega Mendung dari Cirebon. Dibuat manual oleh pengrajin lokal.' },
    { id: 10, name: 'Ukiran Bali Custom Dashboard', price: 8500000, priceDisplay: 'Rp 8.500.000', image: 'https://lh3.googleusercontent.com/gg-dl/ABS2GSlJoOw6iJba5HgvVegPbF3KEVYwWkF0DqUSVgKEkWsJGpmUrsSZpr95vtW7oWrXlZgcsP9yrtpDSemg-2kQh3ZSoEVoQIx75YETPzN3ISNYQUy9Dhf_4zX44mBnma1FJNoJdzgTm9lDPTwawlEAgKK-Wj_Lvm70fccK6oyNv-fx74XPlA=s1024-rj', type: 'Seni Lokal', rating: 5, desc: 'Dashboard kayu dengan ukiran khas Bali. Motif Barong dan flora tradisional yang dikerjakan oleh maestro ukir Gianyar.' },
    { id: 11, name: 'Tenun Toraja Seat Cover Set', price: 4500000, priceDisplay: 'Rp 4.500.000', image: 'https://lh3.googleusercontent.com/gg-dl/ABS2GSlep4KD9dUngWSO4I3lEsYxcQHXXXtDmM8P75v2QJqjbH_dGXX4quqoajdmRtS4NjUsmTSAWLCBLiGcOQVIIwQiXheQ-b8WHfpzyutF9TKMFc6zPLDQ_QJMbKWpQqFYi9z0tcC1Y4TXlVNM1gEnp5EvnD8Wc3_zQoF-_yA2ZOUXS3jlkw=s1024-rj', type: 'Seni Lokal', rating: 5, desc: 'Set jok dengan motif Tenun Toraja asli. Dibuat dari bahan tenun tradisional Sulawesi Selatan.' },
    { id: 12, name: 'Wayang Kulit Gear Shift Knob', price: 1500000, priceDisplay: 'Rp 1.500.000', image: 'https://lh3.googleusercontent.com/gg-dl/ABS2GSmnilDebhwai6nZ_ySNlNE9NR7a6Aa5MO8PAM9s45K4--I4aeghRQiNo8F8zvMwn9YILsOYGQhmEqvArz0nRZTNPZ7M-B5tj44yditddwaBKVO3f7jEXLuEQujavuycvAznjLoB0hJVcXOR_oXdc3KWmdxgqMfHAfP7xWGfRn-jmRf8ig=s1024-rj', type: 'Seni Lokal', rating: 4, desc: 'Knob persneling dengan desain Wayang Kulit. Ukiran tangan dari kulit sapi asli dengan motif Punakawan.' },
    { id: 13, name: 'Batik Parang Helmet Wrap', price: 850000, priceDisplay: 'Rp 850.000', image: 'https://i.pinimg.com/1200x/00/08/be/0008bed31ad0e48c3bae1b8b286f1de8.jpg', type: 'Seni Lokal', rating: 5, desc: 'Vinyl wrap helm dengan motif Batik Parang klasik Solo. Tahan air dan UV protected.' },
    { id: 14, name: 'Songket Palembang Interior Trim', price: 6200000, priceDisplay: 'Rp 6.200.000', image: 'https://lh3.googleusercontent.com/gg-dl/ABS2GSnkbBu6y5tAkCb-8zRzpEo7UAdZZlXfSFjd6bd0vh9pBjhKQtMx45O_xLplVC9-nqwa9asWZWDGWqsVpi6-TkzNQ_BVaKsXbQzcchYZTZfoT0RIiSDNcgk_Jux4-f0SEbRBcQmH3aSVB0ow9evoCj3lIlomH9jBBNJ26UtYqBGYRXno=s1024-rj', type: 'Seni Lokal', rating: 5, desc: 'Trim interior dengan kain Songket Palembang asli berbenang emas. Elegan dan eksklusif.' },
    { id: 15, name: 'Reog Ponorogo Mirror Decals', price: 650000, priceDisplay: 'Rp 650.000', image: 'https://lh3.googleusercontent.com/gg-dl/ABS2GSm0Ykxbv39mN3C7ZsAQWGsGLIJiYRxFkMDM-_-LKUSkH-vRAcotet9Br_39RryySwI3U4qZr3VSykeWWULLZkRgZUJIHCKHmUpiUxLpViWcYY6K_b7gbXyE3SdldQ0sjY3kdA_lhX9BrQsynGmuA7Q5c_scYPCwoHkCb1QPTMKtJD7WoA=s1024-rj', type: 'Seni Lokal', rating: 4, desc: 'Stiker spion dengan ilustrasi Singa Barong dari kesenian Reog Ponorogo. Vinyl premium.' },
    { id: 16, name: 'Keris Jawa Exhaust Tip', price: 3800000, priceDisplay: 'Rp 3.800.000', image: 'https://lh3.googleusercontent.com/gg-dl/ABS2GSmdRhj4mVp0SBLTVauyH0k-o5wGuwze3i47C1l9VjQ_GO1i_c9ZT6GYdvpzTxxhrTVNg0oWauGHYtg1Vk1XaOuDaRhxhSnk5Oz0TtcPRfjkjFCmkijmUDGBbdXSAOIR62BJMKjDUaEoPZbVURE1rSZTGL2W2GpQ7gOu_9BfuzQV6Lfa=s1024-rj', type: 'Seni Lokal', rating: 5, desc: 'Tip knalpot stainless steel dengan desain bilah Keris. CNC machined dengan finishing chrome atau black.' },
    { id: 17, name: 'Ondel-Ondel Bobblehead Set', price: 450000, priceDisplay: 'Rp 450.000', image: 'https://lh3.googleusercontent.com/gg-dl/ABS2GSkrmQMaJXzFE3sg6ptTyJaBzKSav8xi8184lWKDd_u_sjjutKuXaQwa2BlOfxAGOb5TULRDikpAqREr6lTr-H0d-WeVOgeH9tyY-YNwoi2iWzcht44Mq1jDzO72TbAmwvCyVBNN24Zm6_YWu93-J87XrEe0u1tnNSFqqMfHUMOUqtP6og=s1024-rj', type: 'Seni Lokal', rating: 4, desc: 'Set boneka Ondel-Ondel Betawi untuk dashboard. Handmade dari resin dengan detail lukis tangan.' },

    // Universal Accessories
    { id: 18, name: 'LED Headlight Kit', price: 3500000, priceDisplay: 'Rp 3.500.000', image: 'https://th.bing.com/th/id/R.59de16033a47f88026981902648da141?rik=VU9%2fLX60UQSnSg&riu=http%3a%2f%2fbestheadlightbulbs.com%2fwp-content%2fuploads%2f2017%2f01%2fAuxbeam-LED-Headlight-Conversion-Kit.jpg&ehk=6bNHinLOM4g2XOut%2bxFWHoPfpVuWYFScvPNVKZh7UV4%3d&risl=&pid=ImgRaw&r=0', type: 'Lighting', rating: 5, desc: 'High-intensity LED headlights for superior night visibility.' },
    { id: 19, name: 'Carbon Fiber Mirror Set', price: 4800000, priceDisplay: 'Rp 4.800.000', image: 'https://www.suncoastparts.com/mm5/graphics/00000002/12/E372-WEB-3__93251.jpg', type: 'Exterior', rating: 4, desc: 'Lightweight carbon fiber mirrors with wide-angle view.' },
    { id: 20, name: 'Smartphone Mount Pro', price: 350000, priceDisplay: 'Rp 350.000', image: 'https://pocketables.com/wp-content/uploads/2020/12/61WlcnPqa1L._AC_SL1500_1-768x862.jpg', type: 'Accessories', rating: 5, desc: 'Premium aluminum smartphone mount with wireless charging support.' }
]

const categories = ['All', 'Seni Lokal', 'Suspension', 'Braking', 'Exhaust', 'Performance', 'Helmet', 'Apparel', 'Boots', 'Lighting', 'Exterior', 'Accessories']

export default function Accessories() {
    const [activeFilter, setActiveFilter] = useState('All')
    const [filterOpen, setFilterOpen] = useState(false)
    const filteredParts = activeFilter === 'All' ? ACCESSORIES_DATA : ACCESSORIES_DATA.filter(p => p.type === activeFilter)

    return (
        <div className='bg-[#050505] text-white'>
            {/* Hero Header */}
            <div className='pt-32 pb-16 px-6 md:px-24 border-b border-white/5'>
                <div className='flex flex-col md:flex-row items-end justify-between gap-8'>
                    <div>
                        <AnimateOnScroll animation='fade'>
                            <span className='text-gold font-industrial text-xs tracking-[0.3em] font-bold block mb-4'>The Armory</span>
                        </AnimateOnScroll>
                        <AnimateOnScroll animation='fade-up' delay={0.1}>
                            <h1 className='text-4xl md:text-7xl font-serif'>Parts & Gear</h1>
                        </AnimateOnScroll>
                    </div>
                    <AnimateOnScroll animation='fade-right' delay={0.2}>
                        <div className='text-right max-w-md'>
                            <p className='text-gray-400 text-lg leading-relaxed'>
                                Premium parts, riding gear, dan <span className='text-gold'>seni lokal Indonesia</span> untuk kendaraan Anda.
                            </p>
                        </div>
                    </AnimateOnScroll>
                </div>
            </div>

            {/* Indonesian Art Banner */}
            <AnimatedSection className='px-6 md:px-24 py-8 bg-gradient-to-r from-gold/10 via-transparent to-gold/5 border-b border-white/5'>
                <AnimateOnScroll animation='fade-up'>
                    <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
                        <div>
                            <span className='text-gold font-industrial text-xs tracking-widest'>🇮🇩 SENI LOKAL INDONESIA</span>
                            <p className='text-sm text-gray-400 mt-1'>Batik, Ukiran, Tenun, dan kerajinan tradisional untuk kendaraan Anda</p>
                        </div>
                        <button
                            onClick={() => setActiveFilter('Seni Lokal')}
                            className={`px-6 py-2 text-xs font-industrial uppercase tracking-widest transition-all ${activeFilter === 'Seni Lokal' ? 'bg-gold text-black' : 'border border-gold text-gold hover:bg-gold hover:text-black'
                                }`}
                        >
                            Lihat Koleksi Seni Lokal
                        </button>
                    </div>
                </AnimateOnScroll>
            </AnimatedSection>

            {/* Filter Section */}
            <AnimatedSection className='px-6 md:px-24 py-8 border-b border-white/5'>
                <AnimateOnScroll animation='fade-up'>
                    <div className='flex flex-wrap items-center gap-3 mb-4'>
                        {/* Filter Toggle Button */}
                        <button
                            onClick={() => setFilterOpen(!filterOpen)}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-industrial font-bold uppercase tracking-widest transition-all ${filterOpen
                                ? 'bg-gold text-black'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                                }`}
                        >
                            {filterOpen ? <X size={18} /> : <SlidersHorizontal size={18} />}
                            <span className='hidden sm:inline'>Filter</span>
                        </button>

                        {/* Quick Category Buttons */}
                        <div className='flex flex-wrap gap-2'>
                            <button
                                onClick={() => setActiveFilter('All')}
                                className={`px-4 py-3 text-xs sm:text-sm font-industrial font-bold uppercase tracking-widest transition-all ${activeFilter === 'All'
                                    ? 'bg-gold text-black'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                    }`}
                            >
                                All ({ACCESSORIES_DATA.length})
                            </button>
                            <button
                                onClick={() => setActiveFilter('Seni Lokal')}
                                className={`px-4 py-3 text-xs sm:text-sm font-industrial font-bold uppercase tracking-widest transition-all ${activeFilter === 'Seni Lokal'
                                    ? 'bg-gold text-black'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                    }`}
                            >
                                🇮🇩 <span className='hidden sm:inline'>Seni Lokal</span> ({ACCESSORIES_DATA.filter(p => p.type === 'Seni Lokal').length})
                            </button>
                        </div>
                    </div>

                    {/* Collapsible Category Panel */}
                    <div className={`overflow-hidden transition-all duration-300 ${filterOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className='bg-white/5 border border-white/10 p-4 md:p-6 mt-4'>
                            <div className='flex items-center justify-between mb-4'>
                                <span className='text-xs font-industrial uppercase tracking-widest text-gray-500'>Filter by Category</span>
                                {activeFilter !== 'All' && (
                                    <button
                                        onClick={() => setActiveFilter('All')}
                                        className='text-xs text-gold hover:underline'
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                            <div className='flex flex-wrap gap-2'>
                                {categories.map(cat => {
                                    const count = cat === 'All' ? ACCESSORIES_DATA.length : ACCESSORIES_DATA.filter(p => p.type === cat).length
                                    if (count === 0 && cat !== 'All') return null
                                    return (
                                        <button
                                            key={cat}
                                            onClick={() => setActiveFilter(cat)}
                                            className={`px-4 py-2 text-xs font-industrial font-bold uppercase tracking-widest transition-all ${activeFilter === cat
                                                ? 'bg-gold text-black'
                                                : 'bg-white/5 border border-white/10 text-gray-400 hover:border-gold hover:text-gold'
                                                }`}
                                        >
                                            {cat} ({count})
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </AnimateOnScroll>
            </AnimatedSection>

            {/* Product Grid */}
            <AnimatedSection className='px-6 md:px-24 py-16'>
                <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                    {filteredParts.map((part, idx) => (
                        <AnimateOnScroll key={part.id} animation='fade-scale' delay={0.05 + idx * 0.03}>
                            <Link href={`/accessories/${part.id}`}>
                                <div className='lux-card group cursor-pointer h-full'>
                                    <div className='lux-image relative aspect-[4/5] overflow-hidden mb-6 bg-white/5'>
                                        <img
                                            src={part.image}
                                            alt={part.name}
                                            className='w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700'
                                        />
                                        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />

                                        {/* Seni Lokal Badge */}
                                        {part.type === 'Seni Lokal' && (
                                            <div className='absolute top-4 left-4'>
                                                <span className='px-2 py-1 bg-red-600/90 text-white text-[10px] font-bold uppercase tracking-wider'>
                                                    🇮🇩 Lokal
                                                </span>
                                            </div>
                                        )}

                                        <div className='absolute bottom-4 right-4 w-10 h-10 bg-gold rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                                            <ShoppingBag size={18} className='text-black' />
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-1 mb-2'>
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={12} className={i < part.rating ? 'text-gold fill-gold' : 'text-gray-600'} />
                                        ))}
                                    </div>
                                    <span className='text-[10px] text-gold font-industrial uppercase tracking-widest block mb-1'>{part.type}</span>
                                    <h3 className='text-lg font-serif mb-2 group-hover:text-gold transition-colors'>{part.name}</h3>
                                    <p className='text-sm text-gray-500 font-mono'>{part.priceDisplay}</p>
                                </div>
                            </Link>
                        </AnimateOnScroll>
                    ))}
                </div>
            </AnimatedSection>

            {/* Made to Order Banner */}
            <AnimatedSection className='mx-6 md:mx-24 mb-20'>
                <AnimateOnScroll animation='fade-up'>
                    <div className='relative py-20 px-12 border border-white/10 overflow-hidden'>
                        <div className='absolute inset-0 bg-gradient-to-r from-gold/10 via-transparent to-gold/5' />
                        <div className='relative z-10 flex flex-col md:flex-row items-center justify-between gap-8'>
                            <div className='max-w-xl'>
                                <span className='text-gold font-industrial text-xs tracking-[0.3em] font-bold block mb-4'>Made to Order</span>
                                <h3 className='text-3xl md:text-4xl font-serif mb-4'>Custom Accessory Creation</h3>
                                <p className='text-gray-400'>Ingin aksesori dengan motif Batik daerah Anda? Kami bisa membuatnya sesuai desain, fungsi, dan preferensi estetika Anda.</p>
                            </div>
                            <Link
                                href='/contact'
                                className='lux-button px-10 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gold transition-colors whitespace-nowrap'
                            >
                                Request Custom
                            </Link>
                        </div>
                    </div>
                </AnimateOnScroll>
            </AnimatedSection>

            <Footer />
        </div>
    )
}
