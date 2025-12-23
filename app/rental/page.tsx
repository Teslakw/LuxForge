'use client'
import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { CAR_DATABASE } from '@/data/cars'
import { Calendar, Car, Check, X, Bike, SlidersHorizontal } from 'lucide-react'
import { AnimateOnScroll, AnimatedSection } from '@/components/AnimateOnScroll'

export default function RentalPage() {
    const [vehicleType, setVehicleType] = useState<'all' | 'car' | 'motorcycle'>('all')
    const [filterOpen, setFilterOpen] = useState(false)

    const rentalVehicles = useMemo(() => {
        let vehicles = CAR_DATABASE.filter(v => v.rentalPrice)
        if (vehicleType !== 'all') {
            vehicles = vehicles.filter(v => v.vehicleType === vehicleType)
        }
        return vehicles
    }, [vehicleType])

    const carCount = CAR_DATABASE.filter(v => v.vehicleType === 'car' && v.rentalPrice).length
    const motorcycleCount = CAR_DATABASE.filter(v => v.vehicleType === 'motorcycle' && v.rentalPrice).length

    return (
        <div className='bg-[#050505] text-white min-h-screen'>
            {/* Hero Section */}
            <div className='relative h-[60vh] flex items-end overflow-hidden'>
                <div className='absolute inset-0'>
                    <img
                        src='https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1920&auto=format&fit=crop'
                        alt='Luxury Car Rental'
                        className='w-full h-full object-cover opacity-30'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent' />
                </div>
                <div className='relative z-10 px-6 md:px-24 pb-16'>
                    <AnimateOnScroll animation='fade'>
                        <span className='text-gold font-industrial text-xs tracking-[0.3em] font-bold block mb-4'>Experience Luxury</span>
                    </AnimateOnScroll>
                    <AnimateOnScroll animation='fade-up' delay={0.1}>
                        <h1 className='text-5xl md:text-8xl font-serif mb-6'>Rental Fleet</h1>
                    </AnimateOnScroll>
                    <AnimateOnScroll animation='fade-up' delay={0.2}>
                        <p className='text-xl text-gray-400 max-w-2xl'>
                            Drive your dream. Premium cars and motorcycles available for daily, weekly, or monthly rental.
                        </p>
                    </AnimateOnScroll>
                </div>
            </div>

            {/* Fleet Grid */}
            <AnimatedSection className='px-6 md:px-24 py-24'>
                <AnimateOnScroll animation='fade-up' className='mb-8'>
                    <div className='flex flex-col gap-6'>
                        <div>
                            <span className='text-gold font-industrial text-xs tracking-[0.3em] font-bold block mb-4'>Available Now</span>
                            <h2 className='text-3xl md:text-5xl font-serif'>Our Fleet</h2>
                        </div>

                        {/* Filter Row */}
                        <div className='flex flex-wrap items-center gap-3'>
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

                            {/* Vehicle Type Tabs */}
                            <div className='flex flex-wrap gap-2'>
                                <button
                                    onClick={() => setVehicleType('all')}
                                    className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-industrial font-bold uppercase tracking-widest transition-all ${vehicleType === 'all'
                                        ? 'bg-gold text-black'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                        }`}
                                >
                                    <span className='hidden sm:inline'>All</span> ({carCount + motorcycleCount})
                                </button>
                                <button
                                    onClick={() => setVehicleType('car')}
                                    className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-industrial font-bold uppercase tracking-widest transition-all ${vehicleType === 'car'
                                        ? 'bg-gold text-black'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                        }`}
                                >
                                    <Car size={16} />
                                    <span className='hidden sm:inline'>Cars</span> ({carCount})
                                </button>
                                <button
                                    onClick={() => setVehicleType('motorcycle')}
                                    className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-industrial font-bold uppercase tracking-widest transition-all ${vehicleType === 'motorcycle'
                                        ? 'bg-gold text-black'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                        }`}
                                >
                                    <Bike size={16} />
                                    <span className='hidden sm:inline'>Motorcycles</span> ({motorcycleCount})
                                </button>
                            </div>
                        </div>
                    </div>
                </AnimateOnScroll>

                {/* Collapsible Filter Panel */}
                <div className={`overflow-hidden transition-all duration-300 ${filterOpen ? 'max-h-40 opacity-100 mb-8' : 'max-h-0 opacity-0'}`}>
                    <div className='bg-white/5 border border-white/10 p-4 md:p-6'>
                        <div className='flex items-center justify-between mb-4'>
                            <span className='text-xs font-industrial uppercase tracking-widest text-gray-500'>Vehicle Type</span>
                            {vehicleType !== 'all' && (
                                <button
                                    onClick={() => setVehicleType('all')}
                                    className='text-xs text-gold hover:underline'
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                        <div className='flex flex-wrap gap-2'>
                            {['all', 'car', 'motorcycle'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setVehicleType(type as 'all' | 'car' | 'motorcycle')}
                                    className={`px-4 py-2 text-xs font-industrial font-bold uppercase tracking-widest transition-all ${vehicleType === type
                                        ? 'bg-gold text-black'
                                        : 'bg-white/5 border border-white/10 text-gray-400 hover:border-gold hover:text-gold'
                                        }`}
                                >
                                    {type === 'all' ? 'All Vehicles' : type === 'car' ? 'Cars Only' : 'Motorcycles Only'}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {rentalVehicles.map((vehicle, idx) => (
                        <AnimateOnScroll key={vehicle.id} animation='fade-scale' delay={0.05 + idx * 0.03}>
                            <div className='lux-card group border border-white/5 overflow-hidden'>
                                {/* Image */}
                                <div className='relative aspect-[16/10] overflow-hidden'>
                                    <img
                                        src={vehicle.image}
                                        alt={vehicle.name}
                                        className='w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700'
                                    />
                                    <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent' />

                                    {/* Vehicle Type Badge */}
                                    <div className='absolute top-4 left-4'>
                                        <span className={`px-2 py-1 text-[10px] uppercase tracking-widest border ${vehicle.vehicleType === 'motorcycle'
                                            ? 'bg-orange-500/20 border-orange-500/50 text-orange-400'
                                            : 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                                            }`}>
                                            {vehicle.vehicleType === 'motorcycle' ? 'Motorcycle' : 'Car'}
                                        </span>
                                    </div>

                                    {/* Availability Badge */}
                                    <div className='absolute top-4 right-4'>
                                        {vehicle.availableForRent ? (
                                            <span className='flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/50 text-green-400 text-xs font-bold uppercase tracking-wider'>
                                                <Check size={12} /> Available
                                            </span>
                                        ) : (
                                            <span className='flex items-center gap-2 px-3 py-1 bg-red-500/20 border border-red-500/50 text-red-400 text-xs font-bold uppercase tracking-wider'>
                                                <X size={12} /> Reserved
                                            </span>
                                        )}
                                    </div>

                                    {/* Rental Price */}
                                    <div className='absolute bottom-4 left-4'>
                                        <div className='text-2xl font-serif text-gold'>{vehicle.rentalPrice}</div>
                                        <div className='text-xs text-gray-400'>per day</div>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className='p-6'>
                                    <span className='text-[10px] text-gold font-industrial uppercase tracking-widest block mb-2'>{vehicle.type}</span>
                                    <h3 className='text-xl font-serif mb-4 group-hover:text-gold transition-colors'>{vehicle.name}</h3>

                                    <div className='flex items-center gap-4 text-xs text-gray-500 mb-6'>
                                        <span>{vehicle.specs.engine}</span>
                                        <span className='text-gold'>•</span>
                                        <span>{vehicle.specs.power}</span>
                                    </div>

                                    {vehicle.availableForRent ? (
                                        <Link
                                            href={`/rental/${vehicle.id}`}
                                            className='lux-button block text-center w-full py-4 bg-gold text-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors'
                                        >
                                            Rent Now
                                        </Link>
                                    ) : (
                                        <button
                                            disabled
                                            className='block w-full py-4 bg-gray-800 text-gray-500 font-bold uppercase tracking-widest text-sm cursor-not-allowed'
                                        >
                                            Not Available
                                        </button>
                                    )}
                                </div>
                            </div>
                        </AnimateOnScroll>
                    ))}
                </div>
            </AnimatedSection>

            {/* Benefits */}
            <AnimatedSection className='px-6 md:px-24 py-24 bg-white/[0.02] border-y border-white/5'>
                <AnimateOnScroll animation='fade-up' className='text-center mb-16'>
                    <span className='text-gold font-industrial text-xs tracking-[0.3em] font-bold block mb-4'>Why Rent With Us</span>
                    <h2 className='text-3xl md:text-5xl font-serif'>The LuxForge Experience</h2>
                </AnimateOnScroll>

                <div className='grid md:grid-cols-4 gap-8'>
                    {[
                        { icon: Car, title: 'Premium Fleet', desc: 'Cars & motorcycles maintained to perfection' },
                        { icon: Calendar, title: 'Flexible Terms', desc: 'Daily, weekly, or monthly rental options' },
                        { title: '24/7', desc: 'Round-the-clock concierge support', isText: true },
                        { title: '0%', desc: 'No hidden fees or surprise charges', isText: true }
                    ].map((item, i) => (
                        <AnimateOnScroll key={i} animation='fade-up' delay={0.1 + i * 0.1}>
                            <div className='text-center p-6'>
                                {item.isText ? (
                                    <div className='text-5xl font-serif text-gold mb-4'>{item.title}</div>
                                ) : (
                                    <div className='w-16 h-16 mx-auto mb-4 border border-white/10 rounded-full flex items-center justify-center'>
                                        {item.icon && <item.icon size={28} className='text-gold' />}
                                    </div>
                                )}
                                {!item.isText && <h3 className='text-lg font-serif mb-2'>{item.title}</h3>}
                                <p className='text-gray-400 text-sm'>{item.desc}</p>
                            </div>
                        </AnimateOnScroll>
                    ))}
                </div>
            </AnimatedSection>

            {/* CTA */}
            <AnimatedSection className='px-6 md:px-24 py-24'>
                <div className='text-center max-w-3xl mx-auto'>
                    <AnimateOnScroll animation='fade-up'>
                        <h2 className='text-3xl md:text-5xl font-serif mb-6'>Need a Custom Rental?</h2>
                    </AnimateOnScroll>
                    <AnimateOnScroll animation='fade-up' delay={0.1}>
                        <p className='text-gray-400 text-lg mb-10'>
                            Looking for a specific vehicle or extended rental? Contact us for personalized arrangements.
                        </p>
                    </AnimateOnScroll>
                    <AnimateOnScroll animation='fade-up' delay={0.2}>
                        <Link
                            href='/contact'
                            className='lux-button inline-block px-12 py-5 bg-gold text-black font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors'
                        >
                            Contact Us
                        </Link>
                    </AnimateOnScroll>
                </div>
            </AnimatedSection>

            <Footer />
        </div>
    )
}
