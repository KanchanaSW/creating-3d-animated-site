import { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { uniform } from 'three/tsl'
import { scrollSnapshot } from './scrollSnapshot'

export function useGalleryBeatUniform() {
  const beat = useMemo(() => uniform(0), [])

  useFrame(() => {
    beat.value = scrollSnapshot.galleryBeat
  })

  return beat
}
