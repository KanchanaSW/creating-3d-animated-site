import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollSnapshot } from '../scene/scrollSnapshot'

gsap.registerPlugin(ScrollTrigger)

/** Writes page progress and gallery beat into the snapshot R3F reads. */
export function SceneScrollBridge() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const page = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        scrollSnapshot.progress = self.progress
      },
    })

    const gallery = ScrollTrigger.create({
      trigger: '#gallery',
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        scrollSnapshot.galleryBeat = self.progress
      },
      onLeaveBack: () => {
        scrollSnapshot.galleryBeat = 0
      },
      onLeave: () => {
        scrollSnapshot.galleryBeat = 1
      },
    })

    return () => {
      page.kill()
      gallery.kill()
    }
  }, [])

  return null
}
