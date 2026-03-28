import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const quicksand = Quicksand({ 
  subsets: ["latin"],
  variable: '--font-quicksand',
  weight: ['300', '400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'DZ LocLog | Sistema de Gestão para Locadores',
  description: 'O sistema revolucionário para gestão de aluguel de mesas, cadeiras e muito mais. Controle pedidos, estoque, finanças e parceiros em um só lugar.',
  generator: 'Developz',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={quicksand.variable}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
