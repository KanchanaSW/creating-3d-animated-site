import { useEffect, type ReactNode } from 'react'
import { initSmoothScroll } from '../lib/smooth-scroll'
import { SceneScrollBridge } from './SceneScrollBridge'

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = initSmoothScroll()
    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <SceneScrollBridge />
      {children}
    </>
  )
}
