import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'LuxForge | Bespoke Automotive',
  description: 'Premium Supercar Marketplace'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <head>
        {/* Import Fonts: Cinzel (Luxury Serif), Oswald (Industrial), Inter (UI) */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700&family=Inter:wght@300;400;500;600&family=Oswald:wght@300;400;500;700&display=swap'
          rel='stylesheet'
        />
      </head>
      <body className='bg-[#050505] text-white font-sans antialiased selection:bg-[#C5A059] selection:text-black overflow-x-hidden'>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
