import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { logger } from '@/lib/logger'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'YemekZen QR Menu Elite Edition',
  description: 'Gelişmiş QR kod tabanlı dijital menü sistemi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (process.env.NODE_ENV === 'development') {
    logger.info('RootLayout mounted (dev mode)')
  }
  return (
    <html lang="tr">
      <body className={inter.className}>
        <main className="min-h-screen bg-gray-50">
          {process.env.NODE_ENV === 'development' && (
            <div className="fixed z-50 bottom-2 right-2 rounded bg-black/80 text-white text-xs px-2 py-1">
              Dev Mode • Check console for structured logs
            </div>
          )}
          {children}
        </main>
      </body>
    </html>
  )
} 