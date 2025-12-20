'use client'
import React from 'react'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { ArrowUpRight } from 'lucide-react'
import { AnimateOnScroll, AnimatedSection } from '@/components/AnimateOnScroll'

const projects = [
    {
        title: 'The Iron Phoenix',
        client: 'For Dewata Rockers MG Bali',
        desc: 'A complete transformation of a vintage CB750—stripped to bare metal and reborn as a neo-cafe racer with carbon fiber detailing.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200',
        year: '2024'
    },
    {
        title: 'Midnight Sovereign',
        client: 'Private Collector, Jakarta',
        desc: 'Blacked-out Rolls Royce Wraith with custom chrome delete, performance exhaust, and bespoke interior quilting.',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200',
        year: '2023'
    },
    {
        title: 'The Serpent',
        client: 'QJRiders Club Commission',
        desc: 'Custom painted SRV 850 with handcrafted leather seat, racing suspension, and titanium exhaust system.',
        image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?q=80&w=1200',
        year: '2023'
    }
]

export default function CustomWorks() {
    return (
        <div className='bg-[#050505] text-white overflow-hidden'>
            {/* Hero Section */}
            <div className='relative h-[60vh] flex items-end overflow-hidden'>
                <div className='absolute inset-0'>
                    <img
                        src='https://images.unsplash.com/photo-1558618047-f4b511ce5ad6?q=80&w=1920'
                        alt='Workshop'
                        className='w-full h-full object-cover opacity-40'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent' />
                </div>
                <div className='relative z-10 px-6 md:px-24 pb-16'>
                    <AnimateOnScroll animation='fade'>
                        <span className='text-gold font-industrial text-xs tracking-[0.3em] font-bold block mb-4'>Portfolio</span>
                    </AnimateOnScroll>
                    <AnimateOnScroll animation='fade-up' delay={0.1}>
                        <h1 className='text-5xl md:text-8xl font-serif mb-6'>Masterpieces</h1>
                    </AnimateOnScroll>
                    <AnimateOnScroll animation='fade' delay={0.2}>
                        <div className='w-32 h-1 bg-gold' />
                    </AnimateOnScroll>
                </div>
            </div>

            {/* Projects */}
            <AnimatedSection className='px-6 md:px-24 py-24'>
                <div className='space-y-32'>
                    {projects.map((p, i) => (
                        <AnimateOnScroll key={i} animation='fade-up' delay={0.1}>
                            <div className={`grid lg:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                                {/* Image */}
                                <div className={`relative group ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                                    <div className='lux-image aspect-[4/3] overflow-hidden border border-white/10 group-hover:border-gold/30 transition-colors'>
                                        <img
                                            src={p.image}
                                            alt={p.title}
                                            className='w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700'
                                        />
                                    </div>
                                    <div className='absolute top-6 right-6 w-12 h-12 border border-gold rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-gold/10'>
                                        <ArrowUpRight className='text-gold' size={20} />
                                    </div>
                                </div>

                                {/* Text */}
                                <div className={`${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                                    <div className='flex items-center gap-4 mb-6'>
                                        <span className='text-gold font-industrial text-xs tracking-[0.3em] font-bold'>Project 00{i + 1}</span>
                                        <span className='text-gray-600'>•</span>
                                        <span className='text-gray-500 font-mono text-xs'>{p.year}</span>
                                    </div>
                                    <h2 className='text-3xl md:text-5xl font-serif mb-6 leading-tight'>{p.title}</h2>
                                    <p className='text-gray-500 text-sm font-mono mb-8 border-l-2 border-gold/50 pl-4'>{p.client}</p>
                                    <p className='text-gray-300 leading-relaxed mb-10 text-lg'>{p.desc}</p>
                                    <Link
                                        href='/contact'
                                        className='group/btn flex items-center gap-4 px-0 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white hover:text-gold transition-colors'
                                    >
                                        <span>View Case Study</span>
                                        <div className='w-12 h-px bg-white group-hover/btn:bg-gold group-hover/btn:w-20 transition-all duration-300' />
                                    </Link>
                                </div>
                            </div>
                        </AnimateOnScroll>
                    ))}
                </div>

                {/* CTA Section */}
                <AnimatedSection className='mt-40 py-24 border-t border-b border-white/10 text-center'>
                    <AnimateOnScroll animation='fade-up'>
                        <h3 className='text-3xl md:text-5xl font-serif mb-6'>Have a Vision?</h3>
                    </AnimateOnScroll>
                    <AnimateOnScroll animation='fade-up' delay={0.1}>
                        <p className='text-gray-400 mb-10 max-w-xl mx-auto'>Let's discuss your next masterpiece. Our team is ready to bring your automotive dreams to life.</p>
                    </AnimateOnScroll>
                    <AnimateOnScroll animation='fade-up' delay={0.2}>
                        <Link
                            href='/contact'
                            className='lux-button inline-block px-12 py-5 bg-gold text-black font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors'
                        >
                            Start a Project
                        </Link>
                    </AnimateOnScroll>
                </AnimatedSection>
            </AnimatedSection>
            <Footer />
        </div>
    )
}
