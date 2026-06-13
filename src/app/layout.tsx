import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { ServiceWorkerRegistration } from '@/components/ServiceWorkerRegistration'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WorksOffline.in - Privacy-First Tools That Work Offline',
  description: 'Free, privacy-first utility tools powered by WebAssembly. Process PDFs, images, and more — everything happens locally on your device. No servers, no uploads, complete data privacy.',
  manifest: '/manifest.json',
  keywords: ['offline tools', 'privacy', 'WASM', 'WebAssembly', 'PDF tools', 'image processing', 'secure', 'client-side'],
  authors: [{ name: 'WorksOffline.in' }],
  openGraph: {
    title: 'WorksOffline.in - Privacy-First Tools That Work Offline',
    description: 'Free, privacy-first utility tools powered by WebAssembly. Your data never leaves your device.',
    url: 'https://worksoffline.in',
    siteName: 'WorksOffline.in',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WorksOffline.in - Privacy-First Tools',
    description: 'Free, privacy-first utility tools powered by WebAssembly. Your data never leaves your device.',
  },
}

export const viewport: Viewport = {
  themeColor: '#0ea5e9',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon.svg" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Google Analytics 4 — only injected in production builds so localhost dev doesn't pollute the GA property */}
        {process.env.NODE_ENV === 'production' && (
          <>
            <Script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-Q1Y0YHLJ8K"
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-Q1Y0YHLJ8K');
              `}
            </Script>
          </>
        )}
      </head>
      <body className={inter.className}>
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  )
}
