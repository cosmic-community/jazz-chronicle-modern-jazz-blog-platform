import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Jazz Chronicle - Modern Jazz Blog',
  description: 'Explore the rich world of jazz music through expert articles, artist spotlights, album reviews, and live performance coverage.',
  keywords: 'jazz, music, blog, artists, albums, reviews, history, performances',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-background">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}