import { motion, useReducedMotion } from 'motion/react'
import { siteConfig } from '../config/site'

export function Hero() {
  const { hero, tagline } = siteConfig
  const words = hero.headline.split(' ')
  const reduced = useReducedMotion()

  return (
    <section
      id="hero"
      className="relative isolate z-10 flex min-h-[100svh] flex-col justify-end overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/42 via-background/6 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/38 via-background/6 to-transparent"
      />
      <div aria-hidden className="glow opacity-70" />

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-40 sm:pb-24">
        <motion.p
          initial={reduced ? false : { y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2.5 rounded-full border border-hairline bg-background/40 px-4 py-1.5 font-mono text-micro uppercase text-foreground/75 backdrop-blur-md"
        >
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary" />
          {hero.eyebrow}
        </motion.p>

        <h1 className="font-display mt-7 max-w-[15ch] text-display font-medium">
          {words.map((word, index) => (
            <span key={`${word}-${index}`} className="mask-line mr-[0.24em]">
              <motion.span
                initial={reduced ? false : { y: '108%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.06 * index, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={reduced ? false : { y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-7 max-w-xl text-sub text-foreground/75"
        >
          {hero.subheadline}
        </motion.p>

        <motion.div
          initial={reduced ? false : { y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <motion.a
            href={hero.primaryCta.href}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-background"
          >
            {hero.primaryCta.label}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </motion.a>
          {hero.secondaryCta ? (
            <motion.a
              href={hero.secondaryCta.href}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full border border-hairline bg-background/40 px-6 py-3.5 text-sm text-foreground backdrop-blur-md transition-colors hover:border-primary/50"
            >
              {hero.secondaryCta.label}
            </motion.a>
          ) : null}
        </motion.div>

        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 border-t border-hairline pt-6 font-mono text-micro uppercase text-foreground/55"
        >
          {tagline}
        </motion.p>
      </div>
    </section>
  )
}
