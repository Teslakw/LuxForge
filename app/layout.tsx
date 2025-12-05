import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'LuxForge | Bespoke Automotive',
  description: 'Premium Supercar Marketplace'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <head>
        {/* Import Font Cinzel (Serif Mewah) dan Manrope (Sans Modern) */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Manrope:wght@200;400;600&display=swap'
          rel='stylesheet'
        />
      </head>
      <body className='bg-black text-white font-sans antialiased selection:bg-white selection:text-black overflow-x-hidden'>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
