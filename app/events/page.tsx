'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { Calendar, MapPin, Clock, Users, ChevronRight, Check } from 'lucide-react'
import { AnimateOnScroll, AnimatedSection } from '@/components/AnimateOnScroll'

const events = [
    {
        id: 1,
        title: 'Midnight Run: Kuta to Ubud',
        date: 'Saturday, 28th October 2024',
        time: '11:00 PM - 4:00 AM',
        location: 'Kuta Beach Start Point',
        description: 'Join us for the annual gathering of titans under the Balinese moonlight. A scenic night ride through the heart of Bali.',
        image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?q=80&w=1200',
        spots: 50, registered: 38
    },
    {
        id: 2,
        title: 'LocalForge Annual Meet',
        date: 'Saturday, 15th November 2024',
        time: '2:00 PM - 10:00 PM',
        location: 'LocalForge Studio, Seminyak',
        description: 'Our biggest event of the year. Custom builds showcase, live music, and networking with the brotherhood.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200',
        spots: 200, registered: 156
    },
    {
        id: 3,
        title: 'Sunrise Cruise: Sanur Edition',
        date: 'Sunday, 8th December 2024',
        time: '5:00 AM - 9:00 AM',
        location: 'Sanur Beach Parking',
        description: 'Early morning ride along the eastern coast. Witness the sunrise while cruising with fellow enthusiasts.',
        image: 'https://images.unsplash.com/photo-1558618047-f4b511ce5ad6?q=80&w=1200',
        spots: 30, registered: 12
    }
]

export default function EventsPage() {
    const [rsvpStatus, setRsvpStatus] = useState<{ [key: number]: boolean }>({})

    const handleRSVP = (eventId: number) => {
        setRsvpStatus({ ...rsvpStatus, [eventId]: true })
    }

    return (
        <div className='bg-[#050505] text-white min-h-screen'>
            {/* Hero Section */}
            <div className='relative h-[60vh] flex items-end overflow-hidden'>
                <div className='absolute inset-0'>
                    <img
                        src='https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1920'
                        alt='Events'
                        className='w-full h-full object-cover opacity-30'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent' />
                </div>
                <div className='relative z-10 px-6 md:px-24 pb-16'>
                    <AnimateOnScroll animation='fade'>
                        <span className='text-gold font-industrial text-xs tracking-[0.3em] font-bold block mb-4'>Gatherings</span>
                    </AnimateOnScroll>
                    <AnimateOnScroll animation='fade-up' delay={0.1}>
                        <h1 className='text-5xl md:text-8xl font-serif mb-6'>Events</h1>
                    </AnimateOnScroll>
                    <AnimateOnScroll animation='fade' delay={0.2}>
                        <div className='h-1 w-32 bg-gold' />
                    </AnimateOnScroll>
                </div>
            </div>

            {/* Events List */}
            <AnimatedSection className='px-6 md:px-24 py-24'>
                <div className='flex flex-col md:flex-row items-end justify-between mb-16 gap-8'>
                    <AnimateOnScroll animation='fade-left'>
                        <span className='text-gold font-industrial text-xs tracking-[0.3em] font-bold block mb-4'>Calendar</span>
                        <h2 className='text-3xl md:text-5xl font-serif'>Upcoming Rides</h2>
                    </AnimateOnScroll>
                    <AnimateOnScroll animation='fade-right' delay={0.1}>
                        <p className='text-gray-400 max-w-md text-right'>
                            Join the brotherhood on our legendary rides and exclusive gatherings.
                        </p>
                    </AnimateOnScroll>
                </div>

                <div className='space-y-12'>
                    {events.map((event, i) => (
                        <AnimateOnScroll key={event.id} animation='fade-up' delay={0.1 + i * 0.1}>
                            <div className='lux-card grid lg:grid-cols-2 gap-0 border border-white/5 overflow-hidden'>
                                {/* Event Image */}
                                <div className='lux-image relative h-[300px] lg:h-auto'>
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className='w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700'
                                    />
                                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />
                                    <div className='absolute top-6 left-6'>
                                        <span className='px-4 py-2 bg-gold text-black text-xs font-industrial font-bold uppercase tracking-widest'>
                                            {event.spots - event.registered} Spots Left
                                        </span>
                                    </div>
                                </div>

                                {/* Event Details */}
                                <div className='p-8 lg:p-12 flex flex-col justify-between bg-white/[0.02]'>
                                    <div>
                                        <h3 className='text-2xl md:text-3xl font-serif mb-6'>{event.title}</h3>

                                        <div className='space-y-4 mb-8'>
                                            <div className='flex items-center gap-4 text-gray-400'>
                                                <Calendar size={18} className='text-gold' />
                                                <span>{event.date}</span>
                                            </div>
                                            <div className='flex items-center gap-4 text-gray-400'>
                                                <Clock size={18} className='text-gold' />
                                                <span>{event.time}</span>
                                            </div>
                                            <div className='flex items-center gap-4 text-gray-400'>
                                                <MapPin size={18} className='text-gold' />
                                                <span>{event.location}</span>
                                            </div>
                                            <div className='flex items-center gap-4 text-gray-400'>
                                                <Users size={18} className='text-gold' />
                                                <span>{event.registered} / {event.spots} Registered</span>
                                            </div>
                                        </div>

                                        <p className='text-gray-400 leading-relaxed mb-8'>{event.description}</p>
                                    </div>

                                    <div className='flex flex-col sm:flex-row gap-4'>
                                        {rsvpStatus[event.id] ? (
                                            <button className='flex-1 px-8 py-4 bg-green-600 text-white font-bold uppercase tracking-widest flex items-center justify-center gap-3'>
                                                <Check size={18} />
                                                RSVP Confirmed
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleRSVP(event.id)}
                                                className='lux-button flex-1 px-8 py-4 bg-gold text-black font-bold uppercase tracking-widest hover:bg-white transition-all'
                                            >
                                                RSVP Now
                                            </button>
                                        )}
                                        <Link
                                            href='/community'
                                            className='px-8 py-4 border border-white/10 text-gray-400 font-bold uppercase tracking-widest hover:border-gold hover:text-gold transition-all text-center flex items-center justify-center gap-2'
                                        >
                                            Learn More <ChevronRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </AnimateOnScroll>
                    ))}
                </div>
            </AnimatedSection>

            {/* CTA */}
            <AnimatedSection className='px-6 md:px-24 py-24 border-t border-white/5'>
                <div className='text-center max-w-3xl mx-auto'>
                    <AnimateOnScroll animation='fade-up'>
                        <h2 className='text-3xl md:text-5xl font-serif mb-6'>Want to Host an Event?</h2>
                    </AnimateOnScroll>
                    <AnimateOnScroll animation='fade-up' delay={0.1}>
                        <p className='text-gray-400 text-lg mb-10'>
                            Partner with LocalForge to organize your club's next ride or gathering.
                            We provide the venue, logistics, and community reach.
                        </p>
                    </AnimateOnScroll>
                    <AnimateOnScroll animation='fade-up' delay={0.2}>
                        <Link
                            href='/contact'
                            className='lux-button inline-block px-12 py-5 bg-gold text-black font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors'
                        >
                            Get In Touch
                        </Link>
                    </AnimateOnScroll>
                </div>
            </AnimatedSection>

            <Footer />
        </div>
    )
}
