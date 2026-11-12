import { Footer } from '@/sections/footer'
import { Header } from '@/sections/header'
import { Hero } from '@/sections/hero'
import { Image } from '@/sections/image'
import { Notes } from '@/sections/notes'
import { QuickStart } from '@/sections/quick-start'
import { Upkeep } from '@/sections/upkeep'
import { Usage } from '@/sections/usage'

export default function App() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <QuickStart />
        <Image />
        <Usage />
        <Upkeep />
        <Notes />
      </main>
      <Footer />
    </>
  )
}
