'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { ArrowRight, Wrench, Car, Users, Hexagon, Star, Search, ClipboardCheck, Mail, Building2, CheckCircle2 } from 'lucide-react'
import { AnimateOnScroll, AnimatedSection } from '@/components/AnimateOnScroll'

// Hero Slides Data
const slides = [
  {
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1920&auto=format&fit=crop',
    heading: 'Mobil. Motor. Semua Kalangan.',
    subheading: 'Dari kendaraan harian hingga supercar, kami siap melayani kebutuhan Anda.'
  },
  {
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1920&auto=format&fit=crop',
    heading: 'Custom & Modifikasi',
    subheading: 'Bengkel resmi dengan sertifikasi brand untuk semua jenis kendaraan.'
  },
  {
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1920&auto=format&fit=crop',
    heading: 'Komunitas Otomotif',
    subheading: 'Bergabung dengan komunitas otomotif terbesar di Indonesia.'
  }
]

// Community Data
const communities = [
  { name: 'Dewata Rockers', desc: 'Cafe Racer & Custom Culture Heritage', icon: 'DR' },
  { name: 'HDCI Bali', desc: 'The Elite Harley Davidson Circle', icon: 'HD' },
  { name: 'BBMC', desc: 'Brotherhood & Classic Machines', icon: '1%' },
  { name: 'QJRiders', desc: 'Modern Performance Pioneers', icon: 'QJ' }
]

// Services Data
const services = [
  { title: 'Jual & Sewa', icon: Car, desc: 'Mobil dan motor untuk dimiliki atau disewa, dari harian hingga premium.', link: '/showroom' },
  { title: 'Custom Works', icon: Wrench, desc: 'Modifikasi dan tuning di bengkel resmi bersertifikasi.', link: '/workshop' },
  { title: 'Parts & Gear', icon: Hexagon, desc: 'Aksesoris performa dan seni lokal Indonesia.', link: '/accessories' },
  { title: 'Komunitas', icon: Users, desc: 'Hub komunitas otomotif dan event di seluruh Indonesia.', link: '/community' }
]

export default function Home() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i: number) => (i + 1) % slides.length)
    }, 6000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className='bg-[#050505] text-white overflow-x-hidden'>
      {/* 1. HERO SECTION */}
      <section className='relative h-screen w-screen overflow-hidden'>
        {slides.map((s, i: number) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === index ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className='absolute inset-0 bg-black/40 z-10' />
            <img
              src={s.image}
              alt={s.heading}
              className='w-full h-full object-cover'
              style={{ animation: 'kenburns 20s ease-in-out infinite' }}
            />
            <div className='absolute inset-0 flex items-center justify-center z-20 text-center px-4'>
              <div className='max-w-4xl'>
                <h1 className='text-5xl md:text-8xl font-serif font-bold tracking-tight mb-6 animate-fade-in'>
                  {s.heading}
                </h1>
                <div className='h-1 w-24 bg-gold mx-auto mb-6 animate-width-in' />
                <p className='text-lg md:text-2xl text-gray-200 font-light tracking-wide animate-fade-in-slow'>
                  {s.subheading}
                </p>
                <div className='mt-10'>
                  <Link href='/showroom' className='lux-button inline-block px-10 py-4 bg-transparent border border-white/20 hover:bg-gold hover:border-gold hover:text-black transition-all duration-300 font-industrial font-bold tracking-[0.2em] text-sm uppercase'>
                    Enter Showroom
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 2. SERVICES GRID */}
      <AnimatedSection className='py-24 px-6 md:px-16 bg-[#0a0a0a] relative'>
        <div className='absolute inset-0 opacity-5' style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

        <div className='max-w-7xl mx-auto'>
          {/* Section Header - Appears First */}
          <AnimateOnScroll animation='fade-up' className='mb-16 text-center'>
            <span className='text-gold font-industrial uppercase tracking-[0.3em] text-xs font-bold'>What We Do</span>
            <h2 className='text-4xl md:text-5xl font-serif mt-4'>Forging Excellence</h2>
          </AnimateOnScroll>

          {/* Cards - Staggered Appearance */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {services.map((service, idx) => (
              <AnimateOnScroll key={idx} animation='fade-up' delay={0.1 + idx * 0.1}>
                <div className='lux-card group p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] relative overflow-hidden h-full'>
                  <div className='absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity'>
                    <service.icon size={64} />
                  </div>
                  <service.icon size={32} className='text-gold mb-6 lux-icon' />
                  <h3 className='text-xl font-serif mb-3'>{service.title}</h3>
                  <p className='text-sm text-gray-400 leading-relaxed mb-6'>{service.desc}</p>
                  <Link href={service.link} className='text-[10px] uppercase font-bold tracking-widest text-white/50 group-hover:text-gold flex items-center gap-2 transition-colors'>
                    Explore <ArrowRight size={12} />
                  </Link>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* WORKSHOP TEASER */}
      <AnimatedSection className='py-16 px-6 md:px-16 bg-gradient-to-r from-gold/5 via-transparent to-gold/5 border-y border-white/5'>
        <div className='max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8'>
          <AnimateOnScroll animation='fade-up' className='flex-1'>
            <span className='text-gold font-industrial uppercase tracking-[0.3em] text-xs font-bold'>Certified Workshop</span>
            <h3 className='text-2xl md:text-3xl font-serif mt-2 mb-4'>We Have Our Own Garage</h3>
            <p className='text-gray-400 text-sm leading-relaxed mb-6'>
              Licensed by Ferrari, Porsche, Lamborghini, and more. From simple touch-ups to full builds, our team handles it all.
            </p>
            <Link href='/workshop' className='inline-flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest hover:text-white transition-colors'>
              Visit Workshop <ArrowRight size={14} />
            </Link>
          </AnimateOnScroll>
          <AnimateOnScroll animation='fade-up' delay={0.2} className='w-full md:w-1/3'>
            <div className='relative aspect-[4/3] overflow-hidden border border-white/10'>
              <img
                src='https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=600'
                alt='LocalForge Workshop'
                className='w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500'
              />
            </div>
          </AnimateOnScroll>
        </div>
      </AnimatedSection>

      {/* 3. HOW IT WORKS */}
      <AnimatedSection className='py-24 px-6 md:px-16 bg-[#050505] relative'>
        <div className='absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent' />

        <div className='max-w-6xl mx-auto'>
          <AnimateOnScroll animation='fade-up' className='text-center mb-16'>
            <span className='text-gold font-industrial uppercase tracking-[0.3em] text-xs font-bold'>Simple Process</span>
            <h2 className='text-4xl md:text-5xl font-serif mt-4'>How It Works</h2>
            <p className='text-gray-400 mt-4 max-w-2xl mx-auto'>From browsing to driving your dream vehicle, we make the process seamless and transparent.</p>
          </AnimateOnScroll>

          <div className='grid grid-cols-1 md:grid-cols-5 gap-6'>
            {[
              { step: '01', title: 'Browse & Request', desc: 'Explore our showroom, configure your vehicle, or submit a rental request online.', Icon: Search },
              { step: '02', title: 'Review & Approval', desc: 'Our team reviews your request and prepares the best options for you.', Icon: ClipboardCheck },
              { step: '03', title: 'Email Confirmation', desc: 'Once approved, you receive a confirmation email with all the details.', Icon: Mail },
              { step: '04', title: 'Visit Showroom', desc: 'Come to our showroom to see the vehicle, discuss details, and finalize the deal.', Icon: Building2 },
              { step: '05', title: 'Deal & Delivery', desc: 'Agreement signed, payment settled, and your dream vehicle is ready!', Icon: CheckCircle2 }
            ].map((item, idx) => (
              <AnimateOnScroll key={idx} animation='fade-up' delay={0.1 + idx * 0.1}>
                <div className='relative text-center p-6'>
                  {/* Connector Line */}
                  {idx < 4 && (
                    <div className='hidden md:block absolute top-12 left-[60%] w-full h-px bg-gradient-to-r from-gold/50 to-transparent' />
                  )}

                  {/* Icon */}
                  <div className='w-16 h-16 mx-auto mb-4 border border-gold/30 rounded-full flex items-center justify-center bg-gold/10'>
                    <item.Icon size={28} className='text-gold' />
                  </div>

                  {/* Step Badge */}
                  <div className='inline-block px-3 py-1 bg-white/5 border border-white/10 text-gray-400 text-[10px] font-industrial font-bold tracking-widest mb-3'>
                    STEP {item.step}
                  </div>

                  <h3 className='text-lg font-serif mb-2'>{item.title}</h3>
                  <p className='text-gray-500 text-sm leading-relaxed'>{item.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* CTA */}
          <AnimateOnScroll animation='fade-up' delay={0.6}>
            <div className='text-center mt-12'>
              <Link href='/showroom' className='lux-button inline-block px-10 py-4 bg-gold text-black font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors'>
                Start Your Journey
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </AnimatedSection>

      {/* 4. THE INNER CIRCLE (Community) */}
      <AnimatedSection className='py-24 bg-[#050505] relative overflow-hidden'>
        <div className='absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent' />

        <div className='container mx-auto px-6 md:px-16'>
          {/* Header Row */}
          <div className='flex flex-col md:flex-row items-end justify-between mb-16 gap-8'>
            <AnimateOnScroll animation='fade-left' className='max-w-2xl'>
              <h2 className='text-4xl md:text-6xl font-serif mb-4'>The Inner Circle</h2>
              <p className='text-gray-400 text-lg'>
                LocalForge is more than a workshop. It is the beating heart of Bali's elite automotive culture.
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll animation='fade-right' delay={0.2}>
              <Link href='/community' className='lux-button px-8 py-3 border border-white/20 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors'>
                Join the Movement
              </Link>
            </AnimateOnScroll>
          </div>

          {/* Community Cards - Staggered */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {communities.map((c, i) => (
              <AnimateOnScroll key={i} animation='fade-scale' delay={0.1 + i * 0.1}>
                <div className='lux-card aspect-square border border-white/10 p-8 flex flex-col justify-between hover:border-gold/50 transition-colors group cursor-default'>
                  <div className='text-6xl font-industrial font-bold text-white/10 group-hover:text-gold/20 transition-colors'>
                    {c.icon}
                  </div>
                  <div>
                    <h4 className='text-xl font-serif mb-2'>{c.name}</h4>
                    <p className='text-xs text-gray-500 uppercase tracking-wider'>{c.desc}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 4. SHOWCASE CTA */}
      <AnimatedSection className='relative py-32 flex items-center justify-center overflow-hidden'>
        <div className='absolute inset-0 z-0'>
          <img
            src='https://images.unsplash.com/photo-1562426522-863a3d540266?q=80&w=1920&auto=format&fit=crop'
            className='w-full h-full object-cover opacity-20'
            alt='Workshop'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-[#050505]' />
        </div>

        <div className='relative z-10 text-center max-w-4xl px-6'>
          {/* Heading First */}
          <AnimateOnScroll animation='fade-up'>
            <h2 className='text-4xl md:text-7xl font-serif mb-8'>Craft Your Legacy</h2>
          </AnimateOnScroll>

          {/* Content Second */}
          <AnimateOnScroll animation='fade-up' delay={0.15}>
            <p className='text-xl text-gray-300 mb-10 font-light'>
              Your vehicle is an extension of your identity. Configure your dream machine with our bespoke visualization engine.
            </p>
          </AnimateOnScroll>

          {/* CTA Last */}
          <AnimateOnScroll animation='fade-up' delay={0.3}>
            <Link href='/showroom' className='lux-button inline-block bg-gold text-black px-12 py-5 font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors'>
              Start Configuration
            </Link>
          </AnimateOnScroll>
        </div>
      </AnimatedSection>

      {/* 5. CLIENT REVIEWS */}
      <AnimatedSection className='py-24 px-6 md:px-16 bg-[#0a0a0a] relative'>
        <div className='absolute inset-0 opacity-5' style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

        <div className='max-w-7xl mx-auto'>
          <AnimateOnScroll animation='fade-up' className='text-center mb-16'>
            <span className='text-gold font-industrial uppercase tracking-[0.3em] text-xs font-bold'>Testimonials</span>
            <h2 className='text-4xl md:text-5xl font-serif mt-4'>What Our Clients Say</h2>
          </AnimateOnScroll>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {[
              {
                name: 'James Anderson',
                date: 'November 2024',
                rating: 5,
                vehicle: 'Rolls-Royce Phantom',
                comment: 'An extraordinary experience from start to finish. The vehicle was immaculate and the service was truly world-class. Highly recommend!'
              },
              {
                name: 'Michelle Chen',
                date: 'October 2024',
                rating: 5,
                vehicle: 'Ducati Monster',
                comment: 'Perfect for my weekend adventure. The bike was in pristine condition and the booking process was seamless. Will definitely return!'
              },
              {
                name: 'Robert Williams',
                date: 'September 2024',
                rating: 4,
                vehicle: 'Toyota Alphard',
                comment: 'Outstanding service and professionalism. The vehicle was spotless and made our family trip truly memorable.'
              },
              {
                name: 'Sarah Thompson',
                date: 'December 2024',
                rating: 5,
                vehicle: 'Ferrari SF90',
                comment: 'Dreams do come true! The team made everything effortless. An unforgettable experience I\'ll cherish forever.'
              }
            ].map((review, idx) => (
              <AnimateOnScroll key={idx} animation='fade-up' delay={0.1 + idx * 0.1}>
                <div className='lux-card bg-white/[0.02] border border-white/5 p-6 h-full flex flex-col hover:border-gold/30 transition-colors'>
                  {/* Stars */}
                  <div className='flex gap-1 mb-4'>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < review.rating ? 'text-gold fill-gold' : 'text-gray-600'}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className='text-gray-300 text-sm leading-relaxed flex-1 mb-4'>
                    "{review.comment}"
                  </p>

                  {/* Author */}
                  <div className='border-t border-white/10 pt-4'>
                    <p className='text-white font-serif text-sm'>{review.name}</p>
                    <p className='text-gray-500 text-[10px] uppercase tracking-widest'>
                      {review.vehicle} • {review.date}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Trust Badges */}
          <AnimateOnScroll animation='fade-up' delay={0.5}>
            <div className='mt-16 flex flex-wrap justify-center items-center gap-12 text-center'>
              <div>
                <p className='text-4xl font-serif text-gold'>500+</p>
                <p className='text-gray-500 text-xs uppercase tracking-widest mt-1'>Happy Clients</p>
              </div>
              <div className='w-px h-12 bg-white/10'></div>
              <div>
                <p className='text-4xl font-serif text-gold'>4.9</p>
                <p className='text-gray-500 text-xs uppercase tracking-widest mt-1'>Client Rating</p>
              </div>
              <div className='w-px h-12 bg-white/10'></div>
              <div>
                <p className='text-4xl font-serif text-gold'>20+</p>
                <p className='text-gray-500 text-xs uppercase tracking-widest mt-1'>Premium Fleet</p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </AnimatedSection>

      <Footer />
    </div>
  )
}
