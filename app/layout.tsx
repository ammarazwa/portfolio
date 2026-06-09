import type { Metadata } from 'next'
import { Playfair_Display, Inter, Space_Mono } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Ammara Azwadiena Alfiantie - Portfolio',
  description: 'Full-Stack Developer · UI/UX Engineer · Open to work.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="id"
      className={`${playfair.variable} ${inter.variable} ${spaceMono.variable}`}
    >
      <body className="bg-newsprint text-ink font-sans">
        {children}
      </body>
    </html>
  )
}