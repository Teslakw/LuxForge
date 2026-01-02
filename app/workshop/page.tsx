'use client'
import React from 'react'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { AnimateOnScroll, AnimatedSection } from '@/components/AnimateOnScroll'
import { Award, Shield, MapPin, Phone, Mail, CheckCircle } from 'lucide-react'

// Brand Certifications with proper image logos
const BRAND_CERTIFICATIONS = [
    {
        name: 'Ferrari',
        logo: 'https://upload.wikimedia.org/wikipedia/en/d/d0/Scuderia_Ferrari_Logo.svg',
        cert: 'Authorized Service Partner',
        desc: 'Licensed to modify and service Ferrari vehicles to factory standards.'
    },
    {
        name: 'Porsche',
        logo: 'https://upload.wikimedia.org/wikipedia/en/8/8c/Porsche_logo.svg',
        cert: 'Certified Workshop',
        desc: 'Trained technicians for performance upgrades and maintenance.'
    },
    {
        name: 'Lamborghini',
        logo: 'https://upload.wikimedia.org/wikipedia/en/d/df/Lamborghini_Logo.svg',
        cert: 'Approved Modifier',
        desc: 'Official partner for body kits and performance enhancements.'
    },
    {
        name: 'Mercedes-AMG',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Mercedes-Benz_Logo_2010.svg',
        cert: 'AMG Performance Partner',
        desc: 'Specialists in engine tuning and suspension upgrades.'
    },
    {
        name: 'Harley-Davidson',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Harley-Davidson_logo.svg',
        cert: 'Authorized Dealer',
        desc: 'Custom choppers and touring bike modifications.'
    },
    {
        name: 'Ducati',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Ducati_red_logo.svg',
        cert: 'Performance Center',
        desc: 'Race-ready upgrades and track preparation services.'
    }
]

// Workshop Gallery with proper garage/workshop images
const WORKSHOP_GALLERY = [
    {
        title: 'Main Service Bay',
        image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=800',
        desc: 'Full-service area with 12 lifts and modern diagnostic equipment.'
    },
    {
        title: 'Paint Booth',
        image: 'https://images.unsplash.com/photo-1612544448445-b8232cff3b6c?q=80&w=800',
        desc: 'Professional spray booth for custom paint and color matching.'
    },
    {
        title: 'Engine Room',
        image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800',
        desc: 'Dedicated space for engine rebuilds and performance tuning.'
    },
    {
        title: 'Parts Storage',
        image: 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?q=80&w=800',
        desc: 'Stocked with original and premium aftermarket parts.'
    }
]

// Services in simple English
const WORKSHOP_SERVICES = [
    { name: 'Custom Paint', desc: 'Unique colors, wraps, and airbrush artwork.' },
    { name: 'Performance Upgrades', desc: 'More power, better sound, smoother ride.' },
    { name: 'Body Modifications', desc: 'Wide body kits, spoilers, and custom panels.' },
    { name: 'Interior Makeover', desc: 'New seats, dashboard, and sound systems.' },
    { name: 'Wheels & Suspension', desc: 'Custom rims, lowering kits, and air ride.' },
    { name: 'Local Art Touch', desc: 'Indonesian batik and carving details for your ride.' }
]

export default function WorkshopPage() {
    return (
        <div className='bg-[#050505] text-white min-h-screen'>
            {/* Hero Section */}
            <div className='relative h-[60vh] flex items-end overflow-hidden'>
                <div className='absolute inset-0'>
                    <img
                        src='https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1920&auto=format&fit=crop'
                        alt='LocalForge Workshop'
                        className='w-full h-full object-cover opacity-30'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent' />
                </div>
                <div className='relative z-10 px-6 md:px-24 pb-16'>
                    <AnimateOnScroll animation='fade'>
                        <span className='text-gold font-industrial text-xs tracking-[0.3em] font-bold block mb-4'>Authorized Workshop</span>
                    </AnimateOnScroll>
                    <AnimateOnScroll animation='fade-up' delay={0.1}>
                        <h1 className='text-5xl md:text-8xl font-serif mb-6'>LocalForge Garage</h1>
                    </AnimateOnScroll>
                    <AnimateOnScroll animation='fade-up' delay={0.2}>
                        <p className='text-xl text-gray-400 max-w-2xl'>
                            A certified workshop trusted by top brands. From everyday cars to supercars, we handle it all.
                        </p>
                    </AnimateOnScroll>
                </div>
            </div>

            {/* Brand Certifications */}
            <AnimatedSection className='px-6 md:px-24 py-24 border-b border-white/5'>
                <AnimateOnScroll animation='fade-up' className='text-center mb-16'>
                    <span className='text-gold font-industrial text-xs tracking-[0.3em] font-bold block mb-4'>Official Partners</span>
                    <h2 className='text-3xl md:text-5xl font-serif'>Certified By The Best</h2>
                    <p className='text-gray-400 mt-4 max-w-2xl mx-auto'>
                        We hold official licenses from leading brands to modify and service vehicles to factory standards.
                    </p>
                </AnimateOnScroll>

                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {BRAND_CERTIFICATIONS.map((brand, idx) => (
                        <AnimateOnScroll key={idx} animation='fade-up' delay={0.1 + idx * 0.05}>
                            <div className='border border-white/10 p-6 hover:border-gold/30 transition-colors group'>
                                <div className='flex items-start gap-4'>
                                    <div className='w-12 h-12 bg-white rounded-lg flex items-center justify-center p-2 shrink-0'>
                                        <img src={brand.logo} alt={brand.name} className='w-full h-full object-contain' />
                                    </div>
                                    <div className='flex-1'>
                                        <h3 className='text-lg font-serif group-hover:text-gold transition-colors'>{brand.name}</h3>
                                        <p className='text-gold text-xs font-industrial uppercase tracking-wider mt-1'>{brand.cert}</p>
                                        <p className='text-gray-500 text-sm mt-2'>{brand.desc}</p>
                                    </div>
                                    <Award className='text-gold' size={20} />
                                </div>
                            </div>
                        </AnimateOnScroll>
                    ))}
                </div>

                {/* Certification Badge */}
                <AnimateOnScroll animation='fade-up' delay={0.5}>
                    <div className='mt-12 p-6 bg-gradient-to-r from-gold/10 via-transparent to-gold/10 border border-gold/20 text-center'>
                        <Shield className='text-gold mx-auto mb-4' size={32} />
                        <p className='text-white font-serif text-lg'>All Work Comes With Warranty</p>
                        <p className='text-gray-400 text-sm mt-2'>1-year warranty on all modifications using original or approved parts.</p>
                    </div>
                </AnimateOnScroll>
            </AnimatedSection>

            {/* Workshop Services */}
            <AnimatedSection className='px-6 md:px-24 py-24 bg-white/[0.02]'>
                <AnimateOnScroll animation='fade-up' className='text-center mb-16'>
                    <span className='text-gold font-industrial text-xs tracking-[0.3em] font-bold block mb-4'>Services</span>
                    <h2 className='text-3xl md:text-5xl font-serif'>What We Can Do</h2>
                </AnimateOnScroll>

                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {WORKSHOP_SERVICES.map((service, idx) => (
                        <AnimateOnScroll key={idx} animation='fade-up' delay={0.1 + idx * 0.05}>
                            <div className='flex items-start gap-3 p-4 bg-white/5 border border-white/10'>
                                <CheckCircle className='text-gold shrink-0' size={18} />
                                <div>
                                    <h4 className='text-white font-bold text-sm'>{service.name}</h4>
                                    <p className='text-gray-500 text-xs mt-1'>{service.desc}</p>
                                </div>
                            </div>
                        </AnimateOnScroll>
                    ))}
                </div>
            </AnimatedSection>

            {/* Workshop Gallery */}
            <AnimatedSection className='px-6 md:px-24 py-24'>
                <AnimateOnScroll animation='fade-up' className='text-center mb-16'>
                    <span className='text-gold font-industrial text-xs tracking-[0.3em] font-bold block mb-4'>Our Facility</span>
                    <h2 className='text-3xl md:text-5xl font-serif'>Inside The Garage</h2>
                </AnimateOnScroll>

                <div className='grid md:grid-cols-2 gap-6'>
                    {WORKSHOP_GALLERY.map((item, idx) => (
                        <AnimateOnScroll key={idx} animation='fade-up' delay={0.1 + idx * 0.1}>
                            <div className='relative aspect-video overflow-hidden group'>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className='w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700'
                                />
                                <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent' />
                                <div className='absolute bottom-0 left-0 right-0 p-6'>
                                    <h3 className='text-xl font-serif text-white'>{item.title}</h3>
                                    <p className='text-gray-400 text-sm mt-1'>{item.desc}</p>
                                </div>
                            </div>
                        </AnimateOnScroll>
                    ))}
                </div>
            </AnimatedSection>

            {/* Location & Contact */}
            <AnimatedSection className='px-6 md:px-24 py-24 bg-white/[0.02] border-t border-white/5'>
                <div className='grid md:grid-cols-2 gap-12'>
                    <AnimateOnScroll animation='fade-up'>
                        <span className='text-gold font-industrial text-xs tracking-[0.3em] font-bold block mb-4'>Location</span>
                        <h2 className='text-3xl md:text-4xl font-serif mb-6'>Visit Our Workshop</h2>

                        <div className='space-y-4'>
                            <div className='flex items-start gap-4'>
                                <MapPin className='text-gold shrink-0' size={20} />
                                <div>
                                    <p className='text-white'>LocalForge Garage</p>
                                    <p className='text-gray-400 text-sm'>Jl. Bypass Ngurah Rai No. 88</p>
                                    <p className='text-gray-400 text-sm'>Seminyak, Bali 80361</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-4'>
                                <Phone className='text-gold' size={20} />
                                <p className='text-white'>+62 361 XXX XXXX</p>
                            </div>
                            <div className='flex items-center gap-4'>
                                <Mail className='text-gold' size={20} />
                                <p className='text-white'>workshop@localforge.id</p>
                            </div>
                        </div>

                        <Link
                            href='/contact'
                            className='inline-block mt-8 px-8 py-4 bg-gold text-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors'
                        >
                            Free Consultation
                        </Link>
                    </AnimateOnScroll>

                    <AnimateOnScroll animation='fade-up' delay={0.2}>
                        <div className='border border-white/10 overflow-hidden h-full min-h-[300px]'>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.1008478!2d115.1686!3d-8.6916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2471f9e8e3f17%3A0x9c4f3de3f6d3a2be!2sSeminyak%2C%20Bali!5e0!3m2!1sen!2sid!4v1703324400000!5m2!1sen!2sid"
                                width="100%"
                                height="100%"
                                style={{ border: 0, minHeight: '300px' }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="LocalForge Workshop Location"
                            ></iframe>
                        </div>
                    </AnimateOnScroll>
                </div>
            </AnimatedSection>

            {/* CTA */}
            <AnimatedSection className='px-6 md:px-24 py-24'>
                <div className='text-center max-w-3xl mx-auto'>
                    <AnimateOnScroll animation='fade-up'>
                        <h2 className='text-3xl md:text-5xl font-serif mb-6'>Ready To Transform Your Ride?</h2>
                    </AnimateOnScroll>
                    <AnimateOnScroll animation='fade-up' delay={0.1}>
                        <p className='text-gray-400 text-lg mb-10'>
                            Share your vision with our team. From daily drivers to dream machines, we bring ideas to life.
                        </p>
                    </AnimateOnScroll>
                    <AnimateOnScroll animation='fade-up' delay={0.2}>
                        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                            <Link
                                href='/showroom'
                                className='px-10 py-4 bg-gold text-black font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors'
                            >
                                View Showroom
                            </Link>
                            <Link
                                href='/accessories'
                                className='px-10 py-4 border border-white/20 text-white font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors'
                            >
                                View Parts & Gear
                            </Link>
                        </div>
                    </AnimateOnScroll>
                </div>
            </AnimatedSection>

            <Footer />
        </div>
    )
}
