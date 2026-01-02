'use client'
import React, { useState } from 'react'
import Footer from '@/components/Footer'
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react'
import { AnimateOnScroll, AnimatedSection } from '@/components/AnimateOnScroll'

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', subject: '', message: ''
    })
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 3000)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className='bg-[#050505] text-white min-h-screen'>
            {/* Hero Section */}
            <div className='relative h-[50vh] flex items-end overflow-hidden'>
                <div className='absolute inset-0'>
                    <img
                        src='https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=1920'
                        alt='Contact'
                        className='w-full h-full object-cover opacity-20'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent' />
                </div>
                <div className='relative z-10 px-6 md:px-24 pb-16'>
                    <AnimateOnScroll animation='fade'>
                        <span className='text-gold font-industrial text-xs tracking-[0.3em] font-bold block mb-4'>Get In Touch</span>
                    </AnimateOnScroll>
                    <AnimateOnScroll animation='fade-up' delay={0.1}>
                        <h1 className='text-5xl md:text-8xl font-serif mb-6'>Contact Us</h1>
                    </AnimateOnScroll>
                    <AnimateOnScroll animation='fade' delay={0.2}>
                        <div className='h-1 w-32 bg-gold' />
                    </AnimateOnScroll>
                </div>
            </div>

            {/* Contact Content */}
            <AnimatedSection className='px-6 md:px-24 py-24'>
                <div className='grid lg:grid-cols-2 gap-20'>
                    {/* Contact Info */}
                    <AnimateOnScroll animation='fade-left'>
                        <h2 className='text-3xl md:text-4xl font-serif mb-8'>Let's Start a <span className='text-gold'>Conversation</span></h2>
                        <p className='text-gray-400 text-lg mb-12'>
                            Whether you're looking to acquire your dream machine, commission a custom build,
                            or simply want to learn more about our services, we're here to help.
                        </p>

                        <div className='space-y-8'>
                            {[
                                { icon: MapPin, title: 'Studio Location', content: 'Jl. Sunset Road No. 88\nSeminyak, Bali 80361' },
                                { icon: Phone, title: 'Phone', content: '+62 361 123 4567' },
                                { icon: Mail, title: 'Email', content: 'hello@localforge.id' },
                                { icon: Clock, title: 'Hours', content: 'Mon - Sat: 9:00 AM - 6:00 PM\nSunday: By Appointment' }
                            ].map((item, i) => (
                                <div key={i} className='flex items-start gap-6 group'>
                                    <div className='w-14 h-14 border border-white/10 rounded-full flex items-center justify-center group-hover:border-gold/50 group-hover:bg-gold/5 transition-all'>
                                        <item.icon size={24} className='text-gold' />
                                    </div>
                                    <div>
                                        <h3 className='font-serif text-lg mb-1'>{item.title}</h3>
                                        <p className='text-gray-400 whitespace-pre-line'>{item.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AnimateOnScroll>

                    {/* Contact Form */}
                    <AnimateOnScroll animation='fade-right' delay={0.2}>
                        <form onSubmit={handleSubmit} className='space-y-6'>
                            <div className='grid md:grid-cols-2 gap-6'>
                                <div>
                                    <label className='block text-xs font-industrial uppercase tracking-widest text-gray-500 mb-2'>Name</label>
                                    <input
                                        type='text' name='name' value={formData.name} onChange={handleChange}
                                        className='w-full bg-white/5 border border-white/10 px-4 py-4 text-white placeholder-gray-600 focus:border-gold/50 focus:outline-none transition-colors'
                                        placeholder='Your name' required
                                    />
                                </div>
                                <div>
                                    <label className='block text-xs font-industrial uppercase tracking-widest text-gray-500 mb-2'>Email</label>
                                    <input
                                        type='email' name='email' value={formData.email} onChange={handleChange}
                                        className='w-full bg-white/5 border border-white/10 px-4 py-4 text-white placeholder-gray-600 focus:border-gold/50 focus:outline-none transition-colors'
                                        placeholder='your@email.com' required
                                    />
                                </div>
                            </div>

                            <div className='grid md:grid-cols-2 gap-6'>
                                <div>
                                    <label className='block text-xs font-industrial uppercase tracking-widest text-gray-500 mb-2'>Phone</label>
                                    <input
                                        type='tel' name='phone' value={formData.phone} onChange={handleChange}
                                        className='w-full bg-white/5 border border-white/10 px-4 py-4 text-white placeholder-gray-600 focus:border-gold/50 focus:outline-none transition-colors'
                                        placeholder='+62 xxx xxx xxxx'
                                    />
                                </div>
                                <div>
                                    <label className='block text-xs font-industrial uppercase tracking-widest text-gray-500 mb-2'>Subject</label>
                                    <select
                                        name='subject' value={formData.subject} onChange={handleChange}
                                        className='w-full bg-white/5 border border-white/10 px-4 py-4 text-white focus:border-gold/50 focus:outline-none transition-colors'
                                        required
                                    >
                                        <option value='' className='bg-black'>Select a topic</option>
                                        <option value='sales' className='bg-black'>Vehicle Sales</option>
                                        <option value='rental' className='bg-black'>Rental Inquiry</option>
                                        <option value='custom' className='bg-black'>Custom Build</option>
                                        <option value='parts' className='bg-black'>Parts & Accessories</option>
                                        <option value='other' className='bg-black'>Other</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className='block text-xs font-industrial uppercase tracking-widest text-gray-500 mb-2'>Message</label>
                                <textarea
                                    name='message' value={formData.message} onChange={handleChange} rows={6}
                                    className='w-full bg-white/5 border border-white/10 px-4 py-4 text-white placeholder-gray-600 focus:border-gold/50 focus:outline-none transition-colors resize-none'
                                    placeholder='Tell us about your project...' required
                                />
                            </div>

                            <button
                                type='submit'
                                className='lux-button w-full px-8 py-5 bg-gold text-black font-bold uppercase tracking-[0.2em] hover:bg-white transition-all flex items-center justify-center gap-3'
                            >
                                {submitted ? 'Message Sent!' : 'Send Message'}
                                <Send size={18} />
                            </button>
                        </form>
                    </AnimateOnScroll>
                </div>
            </AnimatedSection>

            {/* Google Map Section */}
            <AnimatedSection className='px-6 md:px-24 pb-24'>
                <AnimateOnScroll animation='fade-up'>
                    <div className='text-center mb-12'>
                        <span className='text-gold font-industrial text-xs tracking-[0.3em] font-bold block mb-2'>Find Us</span>
                        <h2 className='text-3xl md:text-4xl font-serif'>Our Location</h2>
                    </div>
                </AnimateOnScroll>
                <AnimateOnScroll animation='fade-up' delay={0.2}>
                    <div className='border border-white/10 overflow-hidden'>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.1008478!2d115.1686!3d-8.6916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2471f9e8e3f17%3A0x9c4f3de3f6d3a2be!2sSeminyak%2C%20Bali!5e0!3m2!1sen!2sid!4v1703324400000!5m2!1sen!2sid"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="LocalForge Location"
                        ></iframe>
                    </div>
                    <div className='mt-6 flex flex-wrap justify-center gap-8 text-center'>
                        <div>
                            <p className='text-gold font-serif text-lg'>Jl. Sunset Road No. 88</p>
                            <p className='text-gray-500 text-sm'>Seminyak, Bali 80361</p>
                        </div>
                        <div className='w-px h-12 bg-white/10 hidden md:block'></div>
                        <div>
                            <p className='text-gold font-serif text-lg'>+62 361 123 4567</p>
                            <p className='text-gray-500 text-sm'>Mon - Sat: 9AM - 6PM</p>
                        </div>
                    </div>
                </AnimateOnScroll>
            </AnimatedSection>

            <Footer />
        </div>
    )
}
