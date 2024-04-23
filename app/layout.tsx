import React from 'react'
import type { Metadata } from 'next'
import { ToastContainer } from 'react-toastify'

import { Header } from '@/components/Header'
import Providers from '@/components/Providers'

import 'react-toastify/dist/ReactToastify.css'
import './globals.sass'

export const metadata: Metadata = {
  title: 'Doctor`s App',
  description: 'This application is designed to make the work of doctors much easier',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <ToastContainer />
        </Providers>
      </body>
    </html>
  )
}
