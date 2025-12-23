'use client'
import React, { useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { CAR_DATABASE } from '@/data/cars'
import { Calendar, Clock, CreditCard, User, Mail, Phone, FileText, Check, ArrowLeft } from 'lucide-react'
import { AnimateOnScroll, AnimatedSection } from '@/components/AnimateOnScroll'

export default function RentalBookingPage() {
    const params = useParams()
    const carId = Number(params.id)
    const car = CAR_DATABASE.find(c => c.id === carId)

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', idNumber: '', notes: ''
    })
    const [agreed, setAgreed] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    // Calculate rental duration and price
    const rentalDetails = useMemo(() => {
        if (!startDate || !endDate || !car?.rentalPrice) {
            return { days: 0, totalPrice: 0, weeklyDiscount: false, monthlyDiscount: false }
        }

        const start = new Date(startDate)
        const end = new Date(endDate)
        const diffTime = Math.abs(end.getTime() - start.getTime())
        const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        // Parse rental price (e.g., "Rp 25.000.000" -> 25000000)
        const dailyRate = parseInt(car.rentalPrice.replace(/[^0-9]/g, ''))

        let totalPrice = dailyRate * days
        let weeklyDiscount = false
        let monthlyDiscount = false

        // Apply discounts
        if (days >= 30) {
            totalPrice = totalPrice * 0.7 // 30% off for monthly
            monthlyDiscount = true
        } else if (days >= 7) {
            totalPrice = totalPrice * 0.85 // 15% off for weekly
            weeklyDiscount = true
        }

        return { days, totalPrice, weeklyDiscount, monthlyDiscount }
    }, [startDate, endDate, car?.rentalPrice])

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
        if (agreed && rentalDetails.days > 0) {
            setSubmitted(true)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    if (!car) {
        return (
            <div className='min-h-screen bg-[#050505] text-white flex items-center justify-center'>
                <div className='text-center'>
                    <h1 className='text-4xl font-serif mb-4'>Vehicle Not Found</h1>
                    <Link href='/rental' className='text-gold hover:underline'>
                        ← Back to Fleet
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
                    <h1 className='text-4xl font-serif mb-4'>Booking Submitted!</h1>
                    <p className='text-gray-400 mb-8'>
                        Thank you for your rental request. Our team will contact you within 24 hours to confirm your booking.
                    </p>
                    <div className='bg-white/5 border border-white/10 p-6 mb-8 text-left'>
                        <h3 className='text-gold font-industrial text-xs tracking-widest mb-4'>BOOKING SUMMARY</h3>
                        <div className='space-y-2 text-sm'>
                            <div className='flex justify-between'>
                                <span className='text-gray-400'>Vehicle</span>
                                <span>{car.name}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-gray-400'>Duration</span>
                                <span>{rentalDetails.days} days</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-gray-400'>Total</span>
                                <span className='text-gold'>{formatPrice(rentalDetails.totalPrice)}</span>
                            </div>
                        </div>
                    </div>
                    <Link
                        href='/rental'
                        className='lux-button inline-block px-8 py-4 bg-gold text-black font-bold uppercase tracking-widest hover:bg-white transition-colors'
                    >
                        Back to Fleet
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className='bg-[#050505] text-white min-h-screen'>
            {/* Header */}
            <div className='pt-28 pb-8 px-6 md:px-24 border-b border-white/5'>
                <Link href='/rental' className='inline-flex items-center gap-2 text-gray-400 hover:text-gold transition-colors mb-6'>
                    <ArrowLeft size={16} />
                    <span className='text-sm'>Back to Fleet</span>
                </Link>
                <AnimateOnScroll animation='fade-up'>
                    <span className='text-gold font-industrial text-xs tracking-[0.3em] font-bold block mb-2'>Rental Booking</span>
                    <h1 className='text-3xl md:text-5xl font-serif'>{car.name}</h1>
                </AnimateOnScroll>
            </div>

            {/* Main Content */}
            <AnimatedSection className='px-6 md:px-24 py-16'>
                <div className='grid lg:grid-cols-2 gap-16'>
                    {/* Left: Vehicle Info & Pricing */}
                    <AnimateOnScroll animation='fade-left'>
                        <div className='sticky top-32'>
                            {/* Vehicle Image */}
                            <div className='relative aspect-[16/10] overflow-hidden mb-8 border border-white/10'>
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className='w-full h-full object-cover'
                                />
                                {!car.availableForRent && (
                                    <div className='absolute inset-0 bg-black/70 flex items-center justify-center'>
                                        <span className='text-red-400 text-xl font-bold'>Currently Reserved</span>
                                    </div>
                                )}
                            </div>

                            {/* Specs */}
                            <div className='grid grid-cols-3 gap-4 mb-8'>
                                {(car.vehicleType === 'motorcycle' ? [
                                    { label: 'Displacement', value: car.specs.engine },
                                    { label: 'Power', value: car.specs.power },
                                    { label: 'Top Speed', value: car.specs.speed }
                                ] : [
                                    { label: 'Engine', value: car.specs.engine },
                                    { label: 'Power', value: car.specs.power },
                                    { label: 'Top Speed', value: car.specs.speed }
                                ]).map((spec, i) => (
                                    <div key={i} className='bg-white/5 p-4 text-center'>
                                        <div className='text-xs text-gray-500 uppercase tracking-widest mb-1'>{spec.label}</div>
                                        <div className='text-sm font-serif'>{spec.value}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Pricing Table */}
                            <div className='bg-white/5 border border-white/10 p-6'>
                                <h3 className='text-gold font-industrial text-xs tracking-widest mb-6'>PRICING</h3>
                                <div className='space-y-4'>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-gray-400'>Daily Rate</span>
                                        <span className='text-xl font-serif'>{car.rentalPrice}</span>
                                    </div>
                                    <div className='flex justify-between items-center text-sm'>
                                        <span className='text-gray-500'>Weekly (7+ days)</span>
                                        <span className='text-green-400'>15% OFF</span>
                                    </div>
                                    <div className='flex justify-between items-center text-sm'>
                                        <span className='text-gray-500'>Monthly (30+ days)</span>
                                        <span className='text-green-400'>30% OFF</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimateOnScroll>

                    {/* Right: Booking Form */}
                    <AnimateOnScroll animation='fade-right' delay={0.2}>
                        <form onSubmit={handleSubmit} className='space-y-8'>
                            {/* Date Selection */}
                            <div className='bg-white/5 border border-white/10 p-6'>
                                <h3 className='flex items-center gap-3 text-lg font-serif mb-6'>
                                    <Calendar size={20} className='text-gold' />
                                    Select Dates
                                </h3>
                                <div className='grid md:grid-cols-2 gap-6'>
                                    <div>
                                        <label className='block text-xs font-industrial uppercase tracking-widest text-gray-500 mb-2'>
                                            Start Date
                                        </label>
                                        <input
                                            type='date'
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            min={new Date().toISOString().split('T')[0]}
                                            className='w-full bg-black border border-white/10 px-4 py-4 text-white focus:border-gold/50 focus:outline-none transition-colors [color-scheme:dark]'
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-xs font-industrial uppercase tracking-widest text-gray-500 mb-2'>
                                            End Date
                                        </label>
                                        <input
                                            type='date'
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            min={startDate || new Date().toISOString().split('T')[0]}
                                            className='w-full bg-black border border-white/10 px-4 py-4 text-white focus:border-gold/50 focus:outline-none transition-colors [color-scheme:dark]'
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Duration & Price Summary */}
                                {rentalDetails.days > 0 && (
                                    <div className='mt-6 pt-6 border-t border-white/10'>
                                        <div className='flex justify-between items-center mb-2'>
                                            <span className='flex items-center gap-2 text-gray-400'>
                                                <Clock size={16} />
                                                Duration
                                            </span>
                                            <span className='font-serif'>{rentalDetails.days} days</span>
                                        </div>
                                        {(rentalDetails.weeklyDiscount || rentalDetails.monthlyDiscount) && (
                                            <div className='flex justify-between items-center mb-2 text-sm'>
                                                <span className='text-green-400'>Discount Applied</span>
                                                <span className='text-green-400'>
                                                    {rentalDetails.monthlyDiscount ? '30% OFF' : '15% OFF'}
                                                </span>
                                            </div>
                                        )}
                                        <div className='flex justify-between items-center pt-4 border-t border-white/10'>
                                            <span className='flex items-center gap-2 text-gold'>
                                                <CreditCard size={16} />
                                                Total Price
                                            </span>
                                            <span className='text-2xl font-serif text-gold'>
                                                {formatPrice(rentalDetails.totalPrice)}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Personal Info */}
                            <div className='bg-white/5 border border-white/10 p-6'>
                                <h3 className='flex items-center gap-3 text-lg font-serif mb-6'>
                                    <User size={20} className='text-gold' />
                                    Personal Information
                                </h3>
                                <div className='space-y-4'>
                                    <div>
                                        <label className='block text-xs font-industrial uppercase tracking-widest text-gray-500 mb-2'>
                                            Full Name
                                        </label>
                                        <input
                                            type='text' name='name' value={formData.name} onChange={handleChange}
                                            className='w-full bg-black border border-white/10 px-4 py-4 text-white focus:border-gold/50 focus:outline-none transition-colors'
                                            placeholder='Your full name' required
                                        />
                                    </div>
                                    <div className='grid md:grid-cols-2 gap-4'>
                                        <div>
                                            <label className='block text-xs font-industrial uppercase tracking-widest text-gray-500 mb-2'>
                                                <Mail size={12} className='inline mr-2' />Email
                                            </label>
                                            <input
                                                type='email' name='email' value={formData.email} onChange={handleChange}
                                                className='w-full bg-black border border-white/10 px-4 py-4 text-white focus:border-gold/50 focus:outline-none transition-colors'
                                                placeholder='your@email.com' required
                                            />
                                        </div>
                                        <div>
                                            <label className='block text-xs font-industrial uppercase tracking-widest text-gray-500 mb-2'>
                                                <Phone size={12} className='inline mr-2' />Phone
                                            </label>
                                            <input
                                                type='tel' name='phone' value={formData.phone} onChange={handleChange}
                                                className='w-full bg-black border border-white/10 px-4 py-4 text-white focus:border-gold/50 focus:outline-none transition-colors'
                                                placeholder='+62 xxx xxx xxxx' required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className='block text-xs font-industrial uppercase tracking-widest text-gray-500 mb-2'>
                                            <FileText size={12} className='inline mr-2' />ID / Passport Number
                                        </label>
                                        <input
                                            type='text' name='idNumber' value={formData.idNumber} onChange={handleChange}
                                            className='w-full bg-black border border-white/10 px-4 py-4 text-white focus:border-gold/50 focus:outline-none transition-colors'
                                            placeholder='Your ID or passport number' required
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-xs font-industrial uppercase tracking-widest text-gray-500 mb-2'>
                                            Special Requests (Optional)
                                        </label>
                                        <textarea
                                            name='notes' value={formData.notes} onChange={handleChange} rows={3}
                                            className='w-full bg-black border border-white/10 px-4 py-4 text-white focus:border-gold/50 focus:outline-none transition-colors resize-none'
                                            placeholder='Any special requests or notes...'
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Terms */}
                            <div className='flex items-start gap-4'>
                                <input
                                    type='checkbox'
                                    id='terms'
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                    className='mt-1 w-5 h-5 accent-gold'
                                    required
                                />
                                <label htmlFor='terms' className='text-sm text-gray-400'>
                                    I agree to the <span className='text-gold cursor-pointer hover:underline'>rental terms and conditions</span>,
                                    including the security deposit policy and insurance coverage details.
                                </label>
                            </div>

                            {/* Submit */}
                            <button
                                type='submit'
                                disabled={!car.availableForRent || rentalDetails.days === 0 || !agreed}
                                className={`lux-button w-full py-5 font-bold uppercase tracking-[0.2em] transition-colors ${car.availableForRent && rentalDetails.days > 0 && agreed
                                    ? 'bg-gold text-black hover:bg-white'
                                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                {!car.availableForRent
                                    ? 'Vehicle Not Available'
                                    : rentalDetails.days === 0
                                        ? 'Select Dates to Continue'
                                        : `Book for ${formatPrice(rentalDetails.totalPrice)}`
                                }
                            </button>
                        </form>
                    </AnimateOnScroll>
                </div>
            </AnimatedSection>

            <Footer />
        </div>
    )
}
