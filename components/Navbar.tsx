'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { createPortal } from 'react-dom'

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = original
      }
    }
  }, [open])

  if (pathname.includes('/admin')) return null

  const links = [
    { href: '/', label: 'Home' },
    { href: '/showroom', label: 'Showroom' },
    { href: '/rental', label: 'Rental' },
    { href: '/accessories', label: 'Accessories' },
    { href: '/workshop', label: 'Workshop' },
    { href: '/community', label: 'Community' },
    { href: '/events', label: 'Events' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ]

  return (
    <nav className='fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-5 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 text-white'>
      <Link href='/' className='cursor-pointer group'>
        <h1 className='text-3xl font-serif font-bold tracking-[0.1em] group-hover:text-gold transition-colors duration-500'>
          LOCAL<span className='font-light text-gray-400 group-hover:text-white transition-colors'>FORGE</span>
        </h1>
      </Link>

      {/* Desktop Menu */}
      <div className='hidden md:flex gap-8'>
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`lux-link text-xs font-industrial font-bold uppercase tracking-[0.15em] transition-colors relative group py-2 ${pathname === link.href ? 'text-gold' : 'text-gray-300'
              }`}
          >
            {link.label}
            <span className={`absolute bottom-0 left-0 h-[1px] bg-gold transition-all duration-300 ${pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
          </Link>
        ))}
      </div>

      {/* Mobile burger */}
      <button
        aria-label='Open Menu'
        aria-expanded={open}
        className='md:hidden inline-flex items-center justify-center w-10 h-10 rounded-sm border border-white/10 bg-black/40 backdrop-blur hover:bg-black/60 hover:border-gold/50 text-gold transition-all'
        onClick={() => setOpen((o: boolean) => !o)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile menu drawer */}
      {mounted &&
        createPortal(
          <div
            className={`md:hidden fixed top-0 right-0 h-full w-72 bg-[#0a0a0a]/98 backdrop-blur-xl border-l border-white/10 shadow-2xl z-[10000] transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${open ? 'translate-x-0' : 'translate-x-full'
              }`}
            role='dialog'
            aria-modal='true'
          >
            <div className='px-8 py-6 border-b border-white/10 flex items-center justify-between'>
              <span className='text-xl font-serif font-bold tracking-widest text-gold'>MENU</span>
              <button
                aria-label='Close Menu'
                className='inline-flex items-center justify-center w-10 h-10 rounded-sm border border-white/10 bg-black/40 text-gray-400 hover:text-white transition-colors'
                onClick={() => setOpen(false)}
              >
                <X size={18} />
              </button>
            </div>
            <div className='flex flex-col px-8 py-8 gap-6'>
              {links.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className='text-lg font-industrial font-bold uppercase tracking-widest text-gray-400 hover:text-gold hover:pl-2 transition-all duration-300 border-b border-white/5 pb-2'
                  onClick={() => setOpen(false)}
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>,
          document.body
        )}

      {/* Backdrop */}
      {mounted && open && createPortal(
        <div
          className='md:hidden fixed inset-0 bg-black/90 backdrop-blur-sm z-[9999] animate-fade-in'
          onClick={() => setOpen(false)}
        />,
        document.body
      )}
    </nav>
  )
}
