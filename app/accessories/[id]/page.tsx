'use client'
import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { Star, Minus, Plus, ShoppingCart, ArrowLeft, Check, Truck, Shield, RotateCcw } from 'lucide-react'
import { AnimateOnScroll, AnimatedSection } from '@/components/AnimateOnScroll'
import { ACCESSORIES_DATA } from '../page'

export default function AccessoryDetailPage() {
    const params = useParams()
    const accessoryId = Number(params.id)
    const accessory = ACCESSORIES_DATA.find(a => a.id === accessoryId)

    const [quantity, setQuantity] = useState(1)
    const [submitted, setSubmitted] = useState(false)
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', address: '', notes: ''
    })

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // Get related products
    const relatedProducts = ACCESSORIES_DATA.filter(a => a.type === accessory?.type && a.id !== accessoryId).slice(0, 4)

    if (!accessory) {
        return (
            <div className='min-h-screen bg-[#050505] text-white flex items-center justify-center'>
                <div className='text-center'>
                    <h1 className='text-4xl font-serif mb-4'>Product Not Found</h1>
                    <Link href='/accessories' className='text-gold hover:underline'>
                        ← Back to Accessories
                    </Link>
                </div>
            </div>
        )
    }

    if (submitted) {
        return (
            <div className='min-h-screen bg-[#050505] text-white flex items-center justify-center'>
                <div className='text-center max-w-lg px-6'>
                    <div className='w-20 h-20 mx-auto mb-8 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center'>
                        <Check size={40} className='text-green-500' />
                    </div>
                    <h1 className='text-4xl font-serif mb-4'>Order Submitted!</h1>
                    <p className='text-gray-400 mb-8'>
                        Thank you for your order. Our team will contact you within 24 hours to confirm your purchase and arrange delivery.
                    </p>
                    <div className='bg-white/5 border border-white/10 p-6 mb-8 text-left'>
                        <h3 className='text-gold font-industrial text-xs tracking-widest mb-4'>ORDER SUMMARY</h3>
                        <div className='space-y-2 text-sm'>
                            <div className='flex justify-between'>
                                <span className='text-gray-400'>Product</span>
                                <span>{accessory.name}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-gray-400'>Quantity</span>
                                <span>{quantity}</span>
                            </div>
                            <div className='flex justify-between border-t border-white/10 pt-2 mt-2'>
                                <span className='text-gray-400'>Total</span>
                                <span className='text-gold'>{formatPrice(accessory.price * quantity)}</span>
                            </div>
                        </div>
                    </div>
                    <Link
                        href='/accessories'
                        className='lux-button inline-block px-8 py-4 bg-gold text-black font-bold uppercase tracking-widest hover:bg-white transition-colors'
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className='bg-[#050505] text-white min-h-screen'>
            {/* Header */}
            <div className='pt-28 pb-8 px-6 md:px-24 border-b border-white/5'>
                <Link href='/accessories' className='inline-flex items-center gap-2 text-gray-400 hover:text-gold transition-colors mb-6'>
                    <ArrowLeft size={16} />
                    <span className='text-sm'>Back to Accessories</span>
                </Link>
            </div>

            {/* Main Content */}
            <AnimatedSection className='px-6 md:px-24 py-16'>
                <div className='grid lg:grid-cols-2 gap-16'>
                    {/* Left: Product Image */}
                    <AnimateOnScroll animation='fade-left'>
                        <div className='sticky top-32'>
                            <div className='aspect-square overflow-hidden border border-white/10 mb-6'>
                                <img
                                    src={accessory.image}
                                    alt={accessory.name}
                                    className='w-full h-full object-cover'
                                />
                            </div>

                            {/* Features */}
                            <div className='grid grid-cols-3 gap-4'>
                                {[
                                    { icon: Truck, label: 'Free Shipping', desc: 'Orders over Rp 5M' },
                                    { icon: Shield, label: 'Warranty', desc: '1 Year Guarantee' },
                                    { icon: RotateCcw, label: 'Returns', desc: '14 Day Policy' }
                                ].map((feat, i) => (
                                    <div key={i} className='bg-white/5 p-4 text-center'>
                                        <feat.icon size={20} className='mx-auto mb-2 text-gold' />
                                        <div className='text-xs font-bold'>{feat.label}</div>
                                        <div className='text-[10px] text-gray-500'>{feat.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </AnimateOnScroll>

                    {/* Right: Product Info & Checkout */}
                    <AnimateOnScroll animation='fade-right' delay={0.2}>
                        <div>
                            {/* Category & Rating */}
                            <div className='flex items-center gap-4 mb-4'>
                                <span className='text-gold font-industrial text-xs tracking-[0.3em] uppercase'>{accessory.type}</span>
                                <div className='flex items-center gap-1'>
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} className={i < accessory.rating ? 'text-gold fill-gold' : 'text-gray-600'} />
                                    ))}
                                </div>
                            </div>

                            {/* Name */}
                            <h1 className='text-3xl md:text-5xl font-serif mb-6'>{accessory.name}</h1>

                            {/* Price */}
                            <div className='text-3xl font-serif text-gold mb-8'>{accessory.priceDisplay}</div>

                            {/* Description */}
                            <p className='text-gray-400 text-lg leading-relaxed mb-8'>{accessory.desc}</p>

                            {/* Quantity Selector */}
                            <div className='mb-8'>
                                <label className='block text-xs font-industrial uppercase tracking-widest text-gray-500 mb-3'>Quantity</label>
                                <div className='flex items-center gap-4'>
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className='w-12 h-12 border border-white/10 flex items-center justify-center hover:border-gold transition-colors'
                                    >
                                        <Minus size={18} />
                                    </button>
                                    <span className='text-2xl font-serif w-16 text-center'>{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className='w-12 h-12 border border-white/10 flex items-center justify-center hover:border-gold transition-colors'
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Subtotal */}
                            <div className='bg-white/5 border border-white/10 p-6 mb-8'>
                                <div className='flex justify-between items-center'>
                                    <span className='text-gray-400'>Subtotal</span>
                                    <span className='text-2xl font-serif text-gold'>{formatPrice(accessory.price * quantity)}</span>
                                </div>
                            </div>

                            {/* Checkout Form */}
                            <form onSubmit={handleSubmit} className='space-y-6'>
                                <h3 className='text-lg font-serif flex items-center gap-3'>
                                    <ShoppingCart size={20} className='text-gold' />
                                    Checkout Details
                                </h3>

                                <div className='grid md:grid-cols-2 gap-4'>
                                    <div>
                                        <label className='block text-xs font-industrial uppercase tracking-widest text-gray-500 mb-2'>Full Name</label>
                                        <input
                                            type='text' name='name' value={formData.name} onChange={handleChange}
                                            className='w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-gold/50 focus:outline-none transition-colors'
                                            placeholder='Your name' required
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-xs font-industrial uppercase tracking-widest text-gray-500 mb-2'>Email</label>
                                        <input
                                            type='email' name='email' value={formData.email} onChange={handleChange}
                                            className='w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-gold/50 focus:outline-none transition-colors'
                                            placeholder='your@email.com' required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className='block text-xs font-industrial uppercase tracking-widest text-gray-500 mb-2'>Phone</label>
                                    <input
                                        type='tel' name='phone' value={formData.phone} onChange={handleChange}
                                        className='w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-gold/50 focus:outline-none transition-colors'
                                        placeholder='+62 xxx xxx xxxx' required
                                    />
                                </div>

                                <div>
                                    <label className='block text-xs font-industrial uppercase tracking-widest text-gray-500 mb-2'>Shipping Address</label>
                                    <textarea
                                        name='address' value={formData.address} onChange={handleChange} rows={3}
                                        className='w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-gold/50 focus:outline-none transition-colors resize-none'
                                        placeholder='Full shipping address' required
                                    />
                                </div>

                                <div>
                                    <label className='block text-xs font-industrial uppercase tracking-widest text-gray-500 mb-2'>Order Notes (Optional)</label>
                                    <textarea
                                        name='notes' value={formData.notes} onChange={handleChange} rows={2}
                                        className='w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-gold/50 focus:outline-none transition-colors resize-none'
                                        placeholder='Any special requests...'
                                    />
                                </div>

                                <button
                                    type='submit'
                                    className='lux-button w-full py-5 bg-gold text-black font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors flex items-center justify-center gap-3'
                                >
                                    <ShoppingCart size={20} />
                                    Place Order - {formatPrice(accessory.price * quantity)}
                                </button>
                            </form>
                        </div>
                    </AnimateOnScroll>
                </div>
            </AnimatedSection>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <AnimatedSection className='px-6 md:px-24 py-24 border-t border-white/5'>
                    <AnimateOnScroll animation='fade-up' className='mb-12'>
                        <h2 className='text-2xl font-serif'>Related Products</h2>
                    </AnimateOnScroll>
                    <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                        {relatedProducts.map((product, idx) => (
                            <AnimateOnScroll key={product.id} animation='fade-scale' delay={0.05 + idx * 0.05}>
                                <Link href={`/accessories/${product.id}`}>
                                    <div className='lux-card group cursor-pointer'>
                                        <div className='aspect-square overflow-hidden mb-4 bg-white/5'>
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className='w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500'
                                            />
                                        </div>
                                        <h3 className='text-sm font-serif group-hover:text-gold transition-colors'>{product.name}</h3>
                                        <p className='text-xs text-gray-500 font-mono'>{product.priceDisplay}</p>
                                    </div>
                                </Link>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </AnimatedSection>
            )}

            <Footer />
        </div>
    )
}
