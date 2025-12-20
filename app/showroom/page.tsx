'use client'
import Link from 'next/link'
import { CAR_DATABASE, type Car } from '@/data/cars'
import React, { useMemo, useState } from 'react'
import Footer from '@/components/Footer'
import { AnimateOnScroll, AnimatedSection } from '@/components/AnimateOnScroll'
import { Car as CarIcon, Bike } from 'lucide-react'

export default function Showroom() {
  const [vehicleType, setVehicleType] = useState<'all' | 'car' | 'motorcycle'>('all')
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const filteredVehicles = useMemo(() => {
    let vehicles = CAR_DATABASE

    // Filter by vehicle type
    if (vehicleType !== 'all') {
      vehicles = vehicles.filter(v => v.vehicleType === vehicleType)
    }

    // Filter by category
    if (activeCategory !== 'All') {
      vehicles = vehicles.filter(v => v.category === activeCategory)
    }

    return vehicles
  }, [vehicleType, activeCategory])

  // Get categories based on selected vehicle type
  const categories = useMemo(() => {
    let vehicles = CAR_DATABASE
    if (vehicleType !== 'all') {
      vehicles = vehicles.filter(v => v.vehicleType === vehicleType)
    }
    const cats = [...new Set(vehicles.map(v => v.category))]
    return ['All', ...cats]
  }, [vehicleType])

  const carCount = CAR_DATABASE.filter(v => v.vehicleType === 'car').length
  const motorcycleCount = CAR_DATABASE.filter(v => v.vehicleType === 'motorcycle').length

  return (
    <>
      <div className='pt-32 px-6 md:px-24 min-h-screen bg-[#050505] pb-20'>
        {/* Header */}
        <AnimateOnScroll animation='fade-up' className='mb-8'>
          <span className='text-gold font-industrial uppercase tracking-[0.3em] text-xs font-bold block mb-2'>The Collection</span>
          <h2 className='text-4xl md:text-5xl font-serif text-white'>Inventory</h2>
        </AnimateOnScroll>

        {/* Vehicle Type Tabs */}
        <AnimateOnScroll animation='fade-up' delay={0.1} className='mb-8'>
          <div className='flex gap-4'>
            <button
              onClick={() => { setVehicleType('all'); setActiveCategory('All'); }}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-industrial font-bold uppercase tracking-widest transition-all ${vehicleType === 'all'
                  ? 'bg-gold text-black'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
            >
              All Vehicles ({CAR_DATABASE.length})
            </button>
            <button
              onClick={() => { setVehicleType('car'); setActiveCategory('All'); }}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-industrial font-bold uppercase tracking-widest transition-all ${vehicleType === 'car'
                  ? 'bg-gold text-black'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
            >
              <CarIcon size={18} />
              Cars ({carCount})
            </button>
            <button
              onClick={() => { setVehicleType('motorcycle'); setActiveCategory('All'); }}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-industrial font-bold uppercase tracking-widest transition-all ${vehicleType === 'motorcycle'
                  ? 'bg-gold text-black'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
            >
              <Bike size={18} />
              Motorcycles ({motorcycleCount})
            </button>
          </div>
        </AnimateOnScroll>

        {/* Category filter */}
        <AnimateOnScroll animation='fade-up' delay={0.15} className='mb-12'>
          <div className='flex flex-wrap gap-3'>
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-5 py-2 text-xs font-industrial font-bold uppercase tracking-widest transition-all duration-300 ${activeCategory === c
                    ? 'bg-white text-black'
                    : 'bg-transparent border border-white/20 text-gray-400 hover:border-gold hover:text-gold'
                  }`}
              >
                {c}
              </button>
            ))}
          </div>
        </AnimateOnScroll>

        {/* Vehicle Grid */}
        <AnimatedSection className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12'>
          {filteredVehicles.map((vehicle, idx) => (
            <AnimateOnScroll key={vehicle.id} animation='fade-scale' delay={0.05 + idx * 0.03}>
              <Link href={`/configure/${vehicle.id}`} className='block'>
                <div className='lux-card group cursor-pointer'>
                  {/* Image */}
                  <div className='lux-image relative aspect-[16/9] overflow-hidden mb-5 bg-[#111] border border-white/10 group-hover:border-gold/50 transition-colors'>
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className='w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60' />

                    {/* Vehicle Type Badge */}
                    <div className='absolute top-4 left-4'>
                      <span className={`px-2 py-1 text-[10px] uppercase tracking-widest border ${vehicle.vehicleType === 'motorcycle'
                          ? 'bg-orange-500/20 border-orange-500/50 text-orange-400'
                          : 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                        }`}>
                        {vehicle.vehicleType === 'motorcycle' ? 'Motorcycle' : 'Car'}
                      </span>
                    </div>

                    <div className='absolute bottom-4 left-4'>
                      <span className='px-2 py-1 bg-black/50 backdrop-blur text-[10px] text-white/70 uppercase tracking-widest border border-white/10'>
                        In Stock
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className='flex justify-between items-end border-b border-white/10 pb-4 group-hover:border-gold/30 transition-colors'>
                    <div>
                      <span className='text-[10px] font-industrial font-bold uppercase tracking-[0.2em] text-gold mb-1 block'>
                        {vehicle.type}
                      </span>
                      <h3 className='text-xl font-serif text-white group-hover:text-gold transition-colors'>
                        {vehicle.name}
                      </h3>
                    </div>
                    <span className='text-sm font-mono text-gray-400 group-hover:text-white transition-colors'>
                      {vehicle.price}
                    </span>
                  </div>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </AnimatedSection>

        {filteredVehicles.length === 0 && (
          <div className='text-center py-20 text-gray-500'>
            <p className='text-xl'>No vehicles found</p>
            <button
              onClick={() => { setVehicleType('all'); setActiveCategory('All'); }}
              className='mt-4 text-gold hover:underline'
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}
