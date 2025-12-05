'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar () {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Sembunyikan navbar di halaman admin agar fokus
  if (pathname.includes('/admin')) return null

  return (
    <nav className='fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-6 bg-black/80 backdrop-blur-md border-b border-white/5 text-white'>
      <Link href='/' className='cursor-pointer'>
        <h1 className='text-2xl font-serif font-bold tracking-[0.2em]'>
          LUX<span className='font-light text-gray-400'>FORGE</span>
        </h1>
      </Link>
      <div className='hidden md:flex gap-8'>
        <Link
          href='/'
          className='text-xs font-bold uppercase tracking-widest hover:text-gray-400 transition-colors'
        >
          Home
        </Link>
        <Link
          href='/showroom'
          className='text-xs font-bold uppercase tracking-widest hover:text-gray-400 transition-colors'
        >
          Showroom
        </Link>
        <Link
          href='/about'
          className='text-xs font-bold uppercase tracking-widest hover:text-gray-400 transition-colors'
        >
          About
        </Link>
      </div>

      {/* Mobile burger */}
      <button
        aria-label='Open Menu'
        className='md:hidden inline-flex items-center justify-center w-10 h-10 rounded border border-white/10 bg-black/40 backdrop-blur hover:bg-black/60 transition-colors'
        onClick={() => setOpen(o => !o)}
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile menu drawer */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-64 bg-black/90 backdrop-blur-lg border-l border-white/10 z-[60] transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className='px-6 py-6 border-b border-white/10 flex items-center justify-between'>
          <Link href='/' className='cursor-pointer' onClick={() => setOpen(false)}>
            <h1 className='text-xl font-serif font-bold tracking-[0.2em]'>
              LUX<span className='font-light text-gray-400'>FORGE</span>
            </h1>
          </Link>
          <button
            aria-label='Close Menu'
            className='inline-flex items-center justify-center w-9 h-9 rounded border border-white/10 bg-black/40 hover:bg-black/60 transition-colors'
            onClick={() => setOpen(false)}
          >
            <X size={16} />
          </button>
        </div>
        <div className='flex flex-col px-6 py-4 gap-4'>
          <Link
            href='/'
            className='text-xs font-bold uppercase tracking-widest hover:text-gray-400 transition-colors py-2'
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            href='/showroom'
            className='text-xs font-bold uppercase tracking-widest hover:text-gray-400 transition-colors py-2'
            onClick={() => setOpen(false)}
          >
            Showroom
          </Link>
          <Link
            href='/about'
            className='text-xs font-bold uppercase tracking-widest hover:text-gray-400 transition-colors py-2'
            onClick={() => setOpen(false)}
          >
            About
          </Link>
        </div>
      </div>

      {/* Backdrop to close menu */}
      {open && (
        <button
          aria-label='Close Menu Backdrop'
          className='md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[55]'
          onClick={() => setOpen(false)}
        />
      )}
    </nav>
  )
}
