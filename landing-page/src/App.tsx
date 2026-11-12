import { Footer } from './sections/Footer'
import { HeroSection } from './sections/HeroSection'
import { ImageSection } from './sections/ImageSection'
import { Nav } from './sections/Nav'
import { Notes } from './sections/Notes'
import { QuickStart } from './sections/QuickStart'
import { Upkeep } from './sections/Upkeep'
import { Usage } from './sections/Usage'

export default function App() {
  return (
    <>
      <Nav />
      <main id="main">
        <HeroSection />
        <QuickStart />
        <ImageSection />
        <Usage />
        <Upkeep />
        <Notes />
      </main>
      <Footer />
    </>
  )
}
