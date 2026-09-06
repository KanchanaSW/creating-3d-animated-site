import { useRef, type ReactNode } from 'react'
import { useGsapReveal } from '../lib/useGsapReveal'
import type { SectionTone } from '../types/site'

const toneClass: Record<SectionTone, string> = {
  base: 'bg-background/25',
  surface: 'border-y border-hairline bg-surface/80 backdrop-blur-[2px]',
  inverse: '',
}

export function Band({
  id,
  tone = 'base',
  glow = false,
  className = '',
  innerClassName = '',
  children,
}: {
  id?: string
  tone?: SectionTone
  glow?: boolean
  className?: string
  innerClassName?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLElement>(null)
  useGsapReveal(ref)

  return (
    <section
      id={id}
      ref={ref}
      data-tone={tone}
      className={`relative isolate overflow-hidden py-24 sm:py-32 ${toneClass[tone]} ${className}`}
    >
      {glow ? <div aria-hidden className="glow" /> : null}
      <div className={`relative mx-auto w-full max-w-6xl px-6 ${innerClassName}`}>{children}</div>
    </section>
  )
}
