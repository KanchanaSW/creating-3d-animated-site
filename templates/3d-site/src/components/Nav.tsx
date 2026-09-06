import { useState } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { siteConfig } from '../config/site'

export function Nav() {
  const { scrollY } = useScroll()
  const [lifted, setLifted] = useState(false)
  const reduced = useReducedMotion()

  useMotionValueEvent(scrollY, 'change', (value) => {
    setLifted(value > 40)
  })

  return (
    <motion.header
      initial={reduced ? false : { y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6"
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-6 rounded-full py-2 pl-5 pr-2 transition-all duration-500 ${
          lifted
            ? 'border border-hairline bg-background/70 shadow-[0_18px_50px_-30px_rgb(0_0_0/0.9)] backdrop-blur-xl'
            : 'border border-transparent bg-transparent'
        }`}
      >
        <a href="#hero" className="font-display text-lg font-medium tracking-tight">
          {siteConfig.title}
        </a>

        <nav className="hidden items-center gap-7 text-sm md:flex">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative text-foreground/70 transition-colors hover:text-foreground after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <motion.a
          href={siteConfig.cta.button.href}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-background"
        >
          {siteConfig.cta.button.label}
        </motion.a>
      </div>
    </motion.header>
  )
}
