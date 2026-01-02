'use client'
import React from 'react'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { Award, Shield, Sparkles } from 'lucide-react'
import { AnimateOnScroll, AnimatedSection } from '@/components/AnimateOnScroll'

export default function AboutPage() {
  const team = [
    { name: 'Aria Santoso', title: 'Founder & CEO', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800' },
    { name: 'Dimas Putra', title: 'Head of Design', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800' },
    { name: 'Nadia Prameswari', title: 'Lead Engineer', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800' },
    { name: 'Raka Pratama', title: 'Client Concierge', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800' },
    { name: 'Maya Lestari', title: 'Marketing Director', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800' },
    { name: 'Budi Hartono', title: 'Operations Manager', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800' }
  ]

  const values = [
    { icon: Award, title: 'Excellence', desc: 'Uncompromising quality in every detail of our work.' },
    { icon: Shield, title: 'Trust', desc: 'Transparency and integrity in all client relationships.' },
    { icon: Sparkles, title: 'Craft', desc: 'Artisan approach to automotive customization.' }
  ]

  return (
    <div className='bg-[#050505] text-white min-h-screen'>
      {/* Hero Section */}
      <div className='relative h-[70vh] flex items-end overflow-hidden'>
        <div className='absolute inset-0'>
          <img
            src='https://images.unsplash.com/photo-1558618047-f4b511ce5ad6?q=80&w=1920'
            alt='LocalForge Workshop'
            className='w-full h-full object-cover opacity-30'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent' />
        </div>
        <div className='relative z-10 px-6 md:px-24 pb-20'>
          <AnimateOnScroll animation='fade'>
            <span className='text-gold font-industrial text-xs tracking-[0.3em] font-bold block mb-4'>Est. 2020</span>
          </AnimateOnScroll>
          <AnimateOnScroll animation='fade-up' delay={0.1}>
            <h1 className='text-5xl md:text-8xl font-serif mb-6'>About LocalForge</h1>
          </AnimateOnScroll>
          <AnimateOnScroll animation='fade' delay={0.2}>
            <div className='h-1 w-32 bg-gold' />
          </AnimateOnScroll>
        </div>
      </div>

      {/* Story Section */}
      <AnimatedSection className='px-6 md:px-24 py-24'>
        <div className='grid lg:grid-cols-2 gap-20 items-center'>
          <AnimateOnScroll animation='fade-left'>
            <span className='text-gold font-industrial text-xs tracking-[0.3em] font-bold block mb-6'>Our Story</span>
            <h2 className='text-3xl md:text-5xl font-serif mb-8 leading-tight'>
              Where Passion Meets <span className='text-gold'>Precision</span>
            </h2>
            <p className='text-gray-400 text-lg leading-relaxed mb-6'>
              LocalForge was born from a simple belief: every machine deserves to be extraordinary.
              Founded in Bali by automotive enthusiasts, we've grown into Indonesia's premier
              destination for luxury vehicle curation and bespoke customization.
            </p>
            <p className='text-gray-400 text-lg leading-relaxed'>
              Our team combines decades of engineering expertise with an artist's eye for detail.
              We don't just modify vehicles—we create <span className='text-white'>rolling masterpieces</span>.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll animation='fade-right' delay={0.2}>
            <div className='relative'>
              <img
                src='https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=1200'
                alt='Craftmanship'
                className='lux-image w-full h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-700'
              />
              <div className='absolute -bottom-8 -left-8 w-48 h-48 border border-gold/30' />
            </div>
          </AnimateOnScroll>
        </div>
      </AnimatedSection>

      {/* Values */}
      <AnimatedSection className='px-6 md:px-24 py-24 border-y border-white/5 bg-white/[0.01]'>
        <AnimateOnScroll animation='fade-up' className='text-center mb-16'>
          <span className='text-gold font-industrial text-xs tracking-[0.3em] font-bold block mb-4'>Foundation</span>
          <h2 className='text-3xl md:text-5xl font-serif'>Our Values</h2>
        </AnimateOnScroll>
        <div className='grid md:grid-cols-3 gap-12'>
          {values.map((v, i) => (
            <AnimateOnScroll key={i} animation='fade-up' delay={0.1 + i * 0.1}>
              <div className='text-center group lux-card p-8'>
                <div className='w-20 h-20 mx-auto mb-8 border border-white/10 rounded-full flex items-center justify-center group-hover:border-gold/50 group-hover:bg-gold/5 transition-all duration-500'>
                  <v.icon size={32} className='text-gold lux-icon' />
                </div>
                <h3 className='text-2xl font-serif mb-4'>{v.title}</h3>
                <p className='text-gray-400'>{v.desc}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </AnimatedSection>

      {/* Team */}
      <AnimatedSection className='px-6 md:px-24 py-24'>
        <div className='flex flex-col md:flex-row items-end justify-between mb-16 gap-8'>
          <AnimateOnScroll animation='fade-left'>
            <span className='text-gold font-industrial text-xs tracking-[0.3em] font-bold block mb-4'>The Team</span>
            <h2 className='text-3xl md:text-5xl font-serif'>Leadership</h2>
          </AnimateOnScroll>
          <AnimateOnScroll animation='fade-right' delay={0.1}>
            <p className='text-gray-400 max-w-md text-right'>
              Passionate professionals dedicated to delivering automotive excellence.
            </p>
          </AnimateOnScroll>
        </div>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {team.map((t, i) => (
            <AnimateOnScroll key={i} animation='fade-scale' delay={0.05 + i * 0.08}>
              <div className='group lux-card'>
                <div className='lux-image aspect-[3/4] overflow-hidden mb-6 relative'>
                  <img
                    src={t.photo}
                    alt={t.name}
                    className='w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
                </div>
                <h3 className='text-xl font-serif group-hover:text-gold transition-colors'>{t.name}</h3>
                <p className='text-gray-500 text-sm font-industrial uppercase tracking-widest'>{t.title}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection className='px-6 md:px-24 py-24 border-t border-white/5'>
        <div className='text-center max-w-3xl mx-auto'>
          <AnimateOnScroll animation='fade-up'>
            <h2 className='text-3xl md:text-5xl font-serif mb-6'>Ready to Begin?</h2>
          </AnimateOnScroll>
          <AnimateOnScroll animation='fade-up' delay={0.1}>
            <p className='text-gray-400 text-lg mb-10'>
              Whether you're looking to acquire your dream machine or transform the one you have,
              our team is ready to make it happen.
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
