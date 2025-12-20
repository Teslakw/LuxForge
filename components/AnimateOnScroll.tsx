'use client'
import { useEffect, useRef, useState, ReactNode } from 'react'

interface AnimateOnScrollProps {
    children: ReactNode
    className?: string
    animation?: 'fade-up' | 'fade-left' | 'fade-right' | 'fade-scale' | 'fade'
    delay?: number
    duration?: number
    threshold?: number
    once?: boolean
}

export function AnimateOnScroll({
    children,
    className = '',
    animation = 'fade-up',
    delay = 0,
    duration = 0.6,
    threshold = 0.1,
    once = true
}: AnimateOnScrollProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)
    const [hasAnimated, setHasAnimated] = useState(false)

    useEffect(() => {
        // Respect reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReducedMotion) {
            setIsVisible(true)
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && (!once || !hasAnimated)) {
                    setIsVisible(true)
                    setHasAnimated(true)
                } else if (!once) {
                    setIsVisible(entry.isIntersecting)
                }
            },
            { threshold, rootMargin: '0px 0px -50px 0px' }
        )

        const currentRef = ref.current
        if (currentRef) {
            observer.observe(currentRef)
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef)
            }
        }
    }, [threshold, once, hasAnimated])

    const animationStyles: Record<string, { initial: React.CSSProperties; visible: React.CSSProperties }> = {
        'fade-up': {
            initial: { opacity: 0, transform: 'translateY(30px)' },
            visible: { opacity: 1, transform: 'translateY(0)' }
        },
        'fade-left': {
            initial: { opacity: 0, transform: 'translateX(-30px)' },
            visible: { opacity: 1, transform: 'translateX(0)' }
        },
        'fade-right': {
            initial: { opacity: 0, transform: 'translateX(30px)' },
            visible: { opacity: 1, transform: 'translateX(0)' }
        },
        'fade-scale': {
            initial: { opacity: 0, transform: 'scale(0.95)' },
            visible: { opacity: 1, transform: 'scale(1)' }
        },
        'fade': {
            initial: { opacity: 0 },
            visible: { opacity: 1 }
        }
    }

    const currentAnimation = animationStyles[animation]
    const style: React.CSSProperties = {
        ...(isVisible ? currentAnimation.visible : currentAnimation.initial),
        transition: `opacity ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s, transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
        willChange: 'opacity, transform'
    }

    return (
        <div ref={ref} className={className} style={style}>
            {children}
        </div>
    )
}

// Stagger container for multiple children
interface StaggerContainerProps {
    children: ReactNode
    className?: string
    staggerDelay?: number
    baseDelay?: number
    animation?: 'fade-up' | 'fade-left' | 'fade-right' | 'fade-scale' | 'fade'
}

export function StaggerContainer({
    children,
    className = '',
    staggerDelay = 0.1,
    baseDelay = 0,
    animation = 'fade-up'
}: StaggerContainerProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReducedMotion) {
            setIsVisible(true)
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        )

        const currentRef = ref.current
        if (currentRef) {
            observer.observe(currentRef)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <div ref={ref} className={className} data-stagger-visible={isVisible} data-stagger-delay={staggerDelay} data-base-delay={baseDelay} data-animation={animation}>
            {children}
        </div>
    )
}

// Section wrapper with entrance animation
interface AnimatedSectionProps {
    children: ReactNode
    className?: string
    id?: string
}

export function AnimatedSection({ children, className = '', id }: AnimatedSectionProps) {
    const ref = useRef<HTMLElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReducedMotion) {
            setIsVisible(true)
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.05, rootMargin: '0px 0px -100px 0px' }
        )

        const currentRef = ref.current
        if (currentRef) {
            observer.observe(currentRef)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <section
            ref={ref}
            id={id}
            className={`${className} ${isVisible ? 'section-visible' : 'section-hidden'}`}
        >
            {children}
        </section>
    )
}
