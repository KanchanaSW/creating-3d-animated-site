import { motion } from 'motion/react'
import { siteConfig } from '../config/site'
import { Band } from './Band'

export function Cta() {
  const { cta } = siteConfig

  return (
    <Band id={cta.id} tone={cta.tone ?? 'base'}>
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary via-primary to-secondary px-8 py-16 text-background sm:px-14 sm:py-20">
        <div
          aria-hidden
          className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-accent/40 blur-3xl"
        />
        <div className="relative">
          <h2 data-reveal className="font-display max-w-3xl text-heading font-medium">
            {cta.title}
          </h2>
          <p data-reveal className="mt-5 max-w-xl text-sub text-background/75">
            {cta.body}
          </p>
          <motion.a
            data-reveal
            href={cta.button.href}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3.5 text-sm font-medium text-foreground"
          >
            {cta.button.label}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </motion.a>
        </div>
      </div>
    </Band>
  )
}
