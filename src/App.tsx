import { useState, Suspense } from 'react'
import { useLenis } from './hooks/useLenis'
import { Cursor } from './components/ui/Cursor/Cursor'
import { Loader } from './components/ui/Loader/Loader'
import { Navbar } from './components/ui/Navbar/Navbar'
import { ScrollProgress } from './components/ui/ScrollProgress/ScrollProgress'
import { Hero } from './sections/Hero/Hero'
import { TrustedBrands } from './sections/TrustedBrands/TrustedBrands'
import { About } from './sections/About/About'
import { Manufacturing } from './sections/Manufacturing/Manufacturing'
import { Products } from './sections/Products/Products'
import { WhyChooseUs } from './sections/WhyChooseUs/WhyChooseUs'
import { PrintingTech } from './sections/PrintingTech/PrintingTech'
import { Factory } from './sections/Factory/Factory'
import { Testimonials } from './sections/Testimonials/Testimonials'
import { GlobalExport } from './sections/GlobalExport/GlobalExport'
import { FAQ } from './sections/FAQ/FAQ'
import { CTA } from './sections/CTA/CTA'
import { Footer } from './sections/Footer/Footer'

const App = () => {
  const [loaded, setLoaded] = useState(false)

  useLenis()

  return (
    <>
      {/* Custom cursor */}
      <Cursor />

      {/* Cinematic loader */}
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      {/* Noise/film grain overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Page */}
      <div className={`page ${loaded ? 'page--visible' : ''}`}>
        <ScrollProgress />
        <Navbar />

        <main>
          <Hero />
          <TrustedBrands />
          <About />
          <Manufacturing />
          <Products />
          <WhyChooseUs />
          <PrintingTech />
          <Factory />
          <Testimonials />
          <GlobalExport />
          <FAQ />
          <CTA />
        </main>

        <Footer />
      </div>
    </>
  )
}

export default App
