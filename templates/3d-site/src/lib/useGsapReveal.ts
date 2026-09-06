import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Reveals every [data-reveal] element inside a section once, in a stagger.
 *
 * Uses batched `to` tweens rather than a single `from`: a `from` tween is
 * reverted to its start values on every ScrollTrigger.refresh (fonts settling),
 * which can leave elements stranded at opacity 0.
 */
export function useGsapReveal(
  ref: RefObject<HTMLElement | null>,
  selector = '[data-reveal]',
) {
  useEffect(() => {
    const root = ref.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>(selector)
      if (targets.length === 0) return

      gsap.set(targets, { y: 44, opacity: 0 })

      ScrollTrigger.batch(targets, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.1,
            overwrite: true,
          }),
      })
    }, root)

    return () => ctx.revert()
  }, [ref, selector])
}
