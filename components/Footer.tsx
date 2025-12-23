import React from 'react'
import Link from 'next/link'
import { Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className='mt-20 border-t border-white/5 bg-[#050505] text-white'>
      <div className='px-6 md:px-16 py-16 flex flex-col lg:flex-row justify-between gap-12'>
        {/* Brand Column */}
        <div className='max-w-md'>
          <h2 className='text-3xl font-serif font-bold tracking-[0.1em] text-white mb-4'>
            LUX<span className='text-gold'>FORGE</span>
          </h2>
          <p className='text-gray-400 text-sm leading-relaxed mb-8'>
            The apex of automotive lifestyle. Specialized in bespoke curation,
            artistic custom modification, and exclusive community experiences in Bali.
            From muscle to modern supercars, we forge excellence.
          </p>
          <div className='flex gap-4'>
            <a href='https://instagram.com' target='_blank' rel='noopener noreferrer' className='w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:border-gold hover:text-gold transition-colors cursor-pointer'>
              <Instagram size={18} />
            </a>
            <a href='https://youtube.com' target='_blank' rel='noopener noreferrer' className='w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:border-gold hover:text-gold transition-colors cursor-pointer'>
              <Youtube size={18} />
            </a>
          </div>
        </div>

        {/* Links Columns */}
        <div className='flex flex-wrap gap-12 lg:gap-24'>
          <div>
            <h3 className='text-gold font-industrial uppercase tracking-widest text-xs font-bold mb-6'>Experience</h3>
            <ul className='space-y-4 text-sm text-gray-400'>
              <li><Link href='/showroom' className='hover:text-white transition-colors'>Showroom</Link></li>
              <li><Link href='/custom-works' className='hover:text-white transition-colors'>Custom Works</Link></li>
              <li><Link href='/rental' className='hover:text-white transition-colors'>Luxury Rental</Link></li>
              <li><Link href='/accessories' className='hover:text-white transition-colors'>Parts & Gear</Link></li>
            </ul>
          </div>

          <div>
            <h3 className='text-gold font-industrial uppercase tracking-widest text-xs font-bold mb-6'>Community</h3>
            <ul className='space-y-4 text-sm text-gray-400'>
              <li><span className='hover:text-white transition-colors cursor-default'>Dewata Rockers</span></li>
              <li><span className='hover:text-white transition-colors cursor-default'>HDCI Bali</span></li>
              <li><span className='hover:text-white transition-colors cursor-default'>BBMC</span></li>
              <li><span className='hover:text-white transition-colors cursor-default'>QJRiders</span></li>
            </ul>
          </div>

          <div>
            <h3 className='text-gold font-industrial uppercase tracking-widest text-xs font-bold mb-6'>Connect</h3>
            <ul className='space-y-4 text-sm text-gray-400'>
              <li><a href='mailto:concierge@luxforge.id' className='hover:text-white transition-colors'>concierge@luxforge.id</a></li>
              <li><span className='block text-xs uppercase tracking-wider text-gray-600 mt-2'>Studio</span>
                Coming Soon<br />Denpasar, Bali
              </li>
              <li><span className='block text-xs uppercase tracking-wider text-gray-600 mt-2'>Hours</span>
                Mon - Sat, 10am - 8pm
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className='px-6 md:px-16 py-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600 uppercase tracking-widest font-industrial'>
        <span>© {new Date().getFullYear()} LuxForge Automotive. All rights reserved.</span>
        <div className='flex gap-8 mt-4 md:mt-0'>
          <Link href='/privacy' className='hover:text-gray-400'>Privacy Policy</Link>
          <Link href='/terms' className='hover:text-gray-400'>Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}
