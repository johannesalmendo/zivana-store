import './globals.css'
import type { Metadata } from 'next'
import { Lexend } from 'next/font/google'
import Navbar from './components/nav/Navbar'
import Footer from './components/footer/Footer'
import CartProvider from '@/providers/CartProvider'
import { Toaster } from 'react-hot-toast'

const lexend = Lexend({ 
  subsets: ['latin'], 
  weight:['400','700'] 
})

export const metadata: Metadata = {
  title: 'Zivana',
  description: '',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={lexend.className}>
        <Toaster toastOptions={{
          style:{
            background: "rgb(104,139,185)",
            color:"#fff",
          }
        }}/>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar/>
            <main className='flex-grow'>{children}</main>
            <Footer/>
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
