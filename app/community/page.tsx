'use client'
import React from 'react'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { Users, Calendar, MapPin } from 'lucide-react'
import { AnimateOnScroll, AnimatedSection } from '@/components/AnimateOnScroll'

const partners = [
    { name: 'Dewata Rockers MG Bali', type: 'Cafe Racer Heritage', members: 450 },
    { name: 'HDCI Bali', type: 'Harley Davidson Chapter', members: 320 },
    { name: 'BBMC Bali', type: 'Brotherhood MC', members: 180 },
    { name: 'QJRiders Indonesia', type: 'Modern Performance', members: 280 },
    { name: 'Vixion Independent Bali', type: 'Sport Touring', members: 520 },
    { name: 'Tiger Association Bali', type: 'Classic Enthusiasts', members: 390 }
]

export default function Community() {
    return (
        <div className='bg-[#050505] text-white min-h-screen'>
            {/* Hero Section */}
            <div className='relative h-[70vh] flex items-end overflow-hidden'>
                <div className='absolute inset-0'>
                    <img
                        src='https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1920'
                        alt='Motorcycle Brotherhood'
                        className='w-full h-full object-cover opacity-30'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent' />
                </div>
                <div className='relative z-10 px-6 md:px-24 pb-20 w-full'>
                    <AnimateOnScroll animation='fade'>
                        <span className='text-gold font-industrial text-xs tracking-[0.3em] font-bold block mb-4'>The Network</span>
                    </AnimateOnScroll>
                    <AnimateOnScroll animation='fade-up' delay={0.1}>
                        <h1 className='text-5xl md:text-9xl font-serif mb-6'>The Brotherhood</h1>
                    </AnimateOnScroll>
                    <AnimateOnScroll animation='fade-up' delay={0.2}>
                        <p className='text-xl text-gray-400 max-w-2xl leading-relaxed'>
                            LocalForge serves as the sanctum for Indonesia's most respected automotive tribes.
                            We honor <span className='text-white'>the code of the road</span> and the bond of the machine.
                        </p>
                    </AnimateOnScroll>
                </div>
            </div>

            <AnimatedSection className='px-6 md:px-24 py-20'>
                {/* Stats Bar */}
                <AnimateOnScroll animation='fade-up'>
                    <div className='flex flex-wrap gap-12 mb-24 py-8 border-y border-white/10'>
                        <div className='flex items-center gap-4'>
                            <Users className='text-gold' size={24} />
                            <div>
                                <div className='text-3xl font-serif'>3,500+</div>
                                <div className='text-xs text-gray-500 uppercase tracking-widest'>Active Riders</div>
                            </div>
                        </div>
                        <div className='flex items-center gap-4'>
                            <Calendar className='text-gold' size={24} />
                            <div>
                                <div className='text-3xl font-serif'>24+</div>
                                <div className='text-xs text-gray-500 uppercase tracking-widest'>Events Yearly</div>
                            </div>
                        </div>
                        <div className='flex items-center gap-4'>
                            <MapPin className='text-gold' size={24} />
                            <div>
                                <div className='text-3xl font-serif'>12</div>
                                <div className='text-xs text-gray-500 uppercase tracking-widest'>Cities Connected</div>
                            </div>
                        </div>
                    </div>
                </AnimateOnScroll>

                {/* Partners Header */}
                <AnimateOnScroll animation='fade-up' className='mb-16'>
                    <span className='text-gold font-industrial text-xs tracking-[0.3em] font-bold block mb-4'>Allied Clubs</span>
                    <h2 className='text-3xl md:text-5xl font-serif'>Our Partners</h2>
                </AnimateOnScroll>

                {/* Partners Grid */}
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24'>
                    {partners.map((p, i) => (
                        <AnimateOnScroll key={i} animation='fade-scale' delay={0.05 + i * 0.08}>
                            <div className='lux-card group p-8 border border-white/10 hover:border-gold/30 transition-all'>
                                <div className='flex items-start justify-between mb-6'>
                                    <span className='w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold font-industrial text-xs'>
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <span className='text-xs text-gray-500 font-mono'>{p.members} members</span>
                                </div>
                                <h3 className='text-xl font-serif mb-2 group-hover:text-gold transition-colors'>{p.name}</h3>
                                <p className='text-sm text-gray-500 uppercase tracking-widest'>{p.type}</p>
                            </div>
                        </AnimateOnScroll>
                    ))}
                </div>

                {/* Event Teaser */}
                <AnimateOnScroll animation='fade-up'>
                    <div className='relative overflow-hidden border border-white/10'>
                        <div className='absolute inset-0'>
                            <img
                                src='https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?q=80&w=1920'
                                alt='Motorcycle Event'
                                className='w-full h-full object-cover opacity-20'
                            />
                            <div className='absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-[#050505]/70' />
                        </div>
                        <div className='relative z-10 py-24 px-12 md:px-24 flex flex-col lg:flex-row items-center justify-between gap-12'>
                            <div className='max-w-2xl'>
                                <span className='text-gold font-industrial text-xs tracking-[0.3em] font-bold block mb-4'>Next Ride</span>
                                <h2 className='text-4xl md:text-6xl font-serif mb-6'>Midnight Run: Kuta to Ubud</h2>
                                <p className='text-gray-400 text-lg mb-4'>Join us for the annual gathering of titans under the Balinese moonlight.</p>
                                <div className='flex items-center gap-6 text-sm text-gray-500'>
                                    <div className='flex items-center gap-2'>
                                        <Calendar size={14} className='text-gold' />
                                        <span>Saturday, 28th October</span>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <MapPin size={14} className='text-gold' />
                                        <span>Kuta Beach Start</span>
                                    </div>
                                </div>
                            </div>
                            <Link
                                href='/events'
                                className='lux-button px-12 py-5 bg-gold text-black font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors whitespace-nowrap'
                            >
                                RSVP Now
                            </Link>
                        </div>
                    </div>
                </AnimateOnScroll>
            </AnimatedSection>
            <Footer />
        </div>
    )
}
