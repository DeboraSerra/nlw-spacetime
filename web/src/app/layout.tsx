import {
  Bai_Jamjuree as BaiJamJuree,
  Roboto_Flex as Roboto,
} from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'
import Blur from '@/components/Blur'
import Stripes from '@/components/Stripes'
import SignIn from '@/components/SignIn'
import Hero from '@/components/Hero'
import Copyright from '@/components/Copyright'
import { cookies } from 'next/dist/client/components/headers'
import Profile from '@/components/Profile'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamJuree = BaiJamJuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree',
})

export const metadata = {
  title: 'NLW Spacetime',
  description:
    'Uma capsula do tempo construida com React, Next.js, TailwindCSS e TypeScript',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = cookies().has('token')
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baiJamJuree.variable} bg-gray-900 font-sans text-gray-100`}
      >
        <main className="grid min-h-screen grid-cols-2">
          <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16">
            <Blur />
            <Stripes />
            {isAuthenticated ? <Profile /> : <SignIn />}
            <Hero />
            <Copyright />
          </div>
          <div className="flex flex-col bg-[url(../assets/bg-stars.svg)] bg-cover p-16">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
