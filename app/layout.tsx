import type { Metadata, Viewport } from 'next'
import { Inter, Manrope } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LangProvider } from '@/lib/lang-context'
import { WishlistProvider } from '@/lib/wishlist-context'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  variable: '--font-inter',
  display: 'swap'
})

const manrope = Manrope({ 
  subsets: ["latin", "cyrillic"],
  variable: '--font-manrope',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'EduPath Kazakhstan | Your Journey to a Global Degree',
  description: 'Apply to top Kazakhstan universities. From first application to arrival — everything in one place. Your academic future in the heart of Eurasia.',
  generator: 'v0.app',
  keywords: ['Kazakhstan', 'university', 'education', 'study abroad', 'international students', 'Astana', 'Almaty'],
  authors: [{ name: 'EduPath Kazakhstan' }],
  openGraph: {
    title: 'EduPath Kazakhstan | Your Journey to a Global Degree',
    description: 'Apply to top Kazakhstan universities. Your academic future in the heart of Eurasia.',
    type: 'website',
    locale: 'en_US',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#00687a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased">
        <LangProvider>
          <WishlistProvider>
            {children}
          </WishlistProvider>
        </LangProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
