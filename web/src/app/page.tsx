import Blur from '@/components/Blur'
import Copyright from '@/components/Copyright'
import Hero from '@/components/Hero'
import SignIn from '@/components/SignIn'
import Stripes from '@/components/Stripes'

export default function Home() {
  return (
    <main className="grid min-h-screen grid-cols-2">
      {/** Left */}
      <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16">
        <Blur />
        <Stripes />
        <SignIn />
        <Hero />
        <Copyright />
      </div>
      {/** Right */}
      <div className="flex flex-col bg-[url(../assets/bg-stars.svg)] bg-cover p-16">
        <div className="flex flex-1 items-center justify-center">
          <p className="w-[360px] text-center leading-relaxed">
            Voce ainda nao registrou nenhuma lembrança, comece a{' '}
            <a href="" className="underline hover:text-gray-50">
              criar agora
            </a>
            !
          </p>
        </div>
      </div>
    </main>
  )
}
