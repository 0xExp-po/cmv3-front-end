import type { Metadata } from 'next'

import '@/styles/globals.css'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'use-cmv3',
  description: 'Example frontend for Metaplex utilizing the useCmv3 library',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        {children}
      </body>
    </html>
  )
}
