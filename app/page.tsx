'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Footer from '@/components/Footer'

type Slide = {
  image: string
  heading: string
  subheading: string
}

const slides: Slide[] = [
  {
    image:
      'https://www.autoblog.com/.image/c_fill,w_1200,h_675,g_faces:center/MjA5MDg5NzM3NjA1NTIzMDU2/2024_nissan_gt-r.jpg',
    heading: 'Beyond Luxury',
    subheading: 'Curated supercars, tailored for connoisseurs'
  },
  {
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/McLaren_P1.jpg/1200px-McLaren_P1.jpg',
    heading: 'Design. Precision. Power.',
    subheading: 'Where craftsmanship meets performance'
  },
  {
    image:
      'https://imgcdnblog.carbay.com/wp-content/uploads/2020/12/31180127/Koenigsegg-Regera-auction-RM-Sothebys-3.jpg',
    heading: 'Rare & Exclusive',
    subheading: 'Reserve only the finest machines'
  },
  {
    image:
      'https://cdn.motor1.com/images/mgl/AkQY0P/s1/genesis-x-gran-racer-vision-gran-turismo-concept.webp',
    heading: 'The Pinnacle',
    subheading: 'An elevated showroom experience'
  }
]

export default function Home () {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setIndex(i => (i + 1) % slides.length)
    }, 6000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className='bg-black'>
      {/* Hero Slider: Ken Burns + Crossfade, full viewport */}
      <section className='relative h-screen w-screen overflow-hidden'>
        {/* Slides */}
        <div className='absolute inset-0'>
          {slides.map((s, i) => (
            <div
              key={s.image}
              className={`absolute inset-0 transition-opacity duration-1400 ${
                i === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className='absolute inset-0 scale-[1.03] animate-[kenburns_16s_ease-in-out_infinite] will-change-transform'>
                <img
                  src={s.image}
                  alt={s.heading}
                  className='w-full h-full object-cover brightness-[0.95]'
                />
              </div>
              <div className='absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-black/70 backdrop-blur-[1px]' />
              {/* Text overlay per slide: varied placement + gold accent */}
              <div
                className={`absolute z-10 ${
                  i % 3 === 0
                    ? 'bottom-24 left-16 md:left-24'
                    : i % 3 === 1
                    ? 'top-24 right-16 md:right-24 text-right'
                    : 'bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 text-center'
                }`}
              >
                <div
                  className={`inline-block max-w-lg px-4 md:px-6 py-3 md:py-4 rounded-lg bg-black/40 backdrop-blur-sm animate-fade-in-slow`}
                >
                  <h1 className='text-4xl md:text-6xl font-serif text-white tracking-tight mb-3'>
                    {s.heading}
                  </h1>
                  <div className='h-0.5 w-24 md:w-32 bg-[#d4af37]/90 mx-auto md:mx-0 mb-3 animate-gold-glow' />
                  <p className='text-sm md:text-base text-gray-200'>
                    {s.subheading}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Top-right CTA */}
        <div className='absolute top-6 right-6 z-10 animate-fade-in'>
          <Link href='/showroom' className='inline-block'>
            <span className='px-4 py-2 bg-white/90 text-black text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white transition'>
              View Collection
            </span>
          </Link>
        </div>
      </section>

      {/* Content below slider: full-image luxury panels with overlay */}
      <section className='text-white animate-fade-in-slow'>
        {/* Section 2 */}
        <div className='relative w-screen h-[70vh] md:h-[80vh] overflow-hidden animate-fade-in-slow'>
          <img
            src='https://lh6.googleusercontent.com/savwFHgzycqHy265FBpFHOxfpPGAabVWpbXuktyIfusRz9epxayL6o9GYrGqLMoKnF3Y9iyhg52E2O9GqxJJ0U51csL3fmhTs7E3WrlcWb0rwumz94xg6bIqBYxAZDWKEWS4sNYPQdTlW6i6PE7tw44'
            alt='Concierge'
            className='absolute inset-0 w-full h-full object-cover opacity-95'
          />
          <div className='absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-black/70 backdrop-blur-[1px]' />
          <div className='absolute bottom-16 left-8 md:left-16 max-w-xl'>
            <div className='bg-black/40 backdrop-blur-sm p-6 rounded-xl animate-fade-in-slow'>
              <h2 className='text-3xl md:text-4xl font-serif mb-3'>
                Private Concierge
              </h2>
              <div className='h-0.5 w-20 bg-[#d4af37] mb-4 animate-gold-glow' />
              <p className='text-gray-200 mb-6'>
                Experience a tailored acquisition journey: from configuration to
                allocation, our concierge ensures every detail meets your
                expectations.
              </p>
              <Link href='/showroom'>
                <span className='inline-block px-5 py-3 bg-white text-black text-[11px] font-bold uppercase tracking-[0.2em]'>
                  Explore Showroom
                </span>
              </Link>
              <div className='mt-4 flex items-center gap-2 text-xs text-gray-300'>
                <span className='px-2 py-1 rounded-full bg-white/10 border border-white/10'>
                  Concierge
                </span>
                <span className='px-2 py-1 rounded-full bg-white/10 border border-white/10'>
                  Allocation
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className='relative w-screen h-[70vh] md:h-[80vh] overflow-hidden animate-fade-in-slow'>
          <img
            src='https://cdn.motor1.com/images/mgl/JOBqOJ/s1/phantom-scintilla-private-collection---0.webp'
            alt='Rarity'
            className='absolute inset-0 w-full h-full object-cover opacity-95'
          />
          <div className='absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-black/70 backdrop-blur-[1px]' />
          <div className='absolute top-20 right-8 md:right-16 max-w-xl text-right'>
            <div className='bg-black/40 backdrop-blur-sm p-6 rounded-xl inline-block text-left md:text-right animate-fade-in-slow'>
              <h2 className='text-3xl md:text-4xl font-serif mb-3'>
                Curated Rarity
              </h2>
              <div className='ml-auto h-0.5 w-20 bg-[#d4af37] mb-4 animate-gold-glow' />
              <div className='ml-auto h-0.5 w-20 bg-[#d4af37] mb-4 animate-gold-glow' />
              <p className='text-gray-200 mb-6'>
                Our selection emphasizes provenance, specification, and rarity —
                presenting only the most desirable supercars.
              </p>
              <Link href='/showroom'>
                <span className='inline-block px-5 py-3 bg-white text-black text-[11px] font-bold uppercase tracking-[0.2em]'>
                  View Collection
                </span>
              </Link>
              <div className='mt-4 flex items-center gap-2 justify-end text-xs text-gray-300'>
                <span className='px-2 py-1 rounded-full bg-white/10 border border-white/10'>
                  Provenance
                </span>
                <span className='px-2 py-1 rounded-full bg-white/10 border border-white/10'>
                  Specification
                </span>
                <span className='px-2 py-1 rounded-full bg-white/10 border border-white/10'>
                  Rarity
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='animate-fade-in'>
        <Footer />
      </div>
    </div>
  )
}
