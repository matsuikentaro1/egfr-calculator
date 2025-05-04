import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'eGFR計算アプリ',
  description: 'eGFR（推算糸球体濾過量）を計算するためのシンプルなツール',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} min-h-screen p-4 md:p-8`}>
        <div className="max-w-md mx-auto">
          {children}
        </div>
      </body>
    </html>
  )
}