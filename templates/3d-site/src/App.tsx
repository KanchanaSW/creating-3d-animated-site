import { useEffect } from 'react'
import { siteConfig } from './config/site'
import { About } from './components/About'
import { Cta } from './components/Cta'
import { Features } from './components/Features'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { SmoothScroll } from './components/SmoothScroll'
import { Testimonials } from './components/Testimonials'
import { WebGPUCanvas } from './scene/WebGPUCanvas'

export default function App() {
  const { colors, title } = siteConfig

  useEffect(() => {
    document.title = title
  }, [title])

  const palette = `:root{
    --c-background:${colors.background};
    --c-foreground:${colors.foreground};
    --c-primary:${colors.primary};
    --c-secondary:${colors.secondary};
    --c-accent:${colors.accent};
    --c-muted:${colors.muted};
  }`

  return (
    <SmoothScroll>
      <style>{palette}</style>
      <WebGPUCanvas />
      <div className="relative z-10 min-h-screen font-sans text-foreground">
        <div aria-hidden className="grain" />
        <Nav />
        <main>
          <Hero />
          <About />
          <Features />
          <Gallery />
          <Testimonials />
          <Cta />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  )
}
