import { useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three/webgpu'
import { scrollSnapshot } from './scrollSnapshot'

/** Look below the still-life center so the subject sits in the upper half, above the hero type. */
const POSES: Array<[number, number, number]> = [
  [0, 0.92, 3.65],
  [1.28, 1.02, 3.35],
  [0.18, 1.35, 4.55],
  [-1.18, 0.88, 3.25],
  [0.3, 0.72, 4.95],
  [0, 1.42, 5.45],
]

const LOOK: [number, number, number] = [0, -0.38, 0]

export function useScrollCamera(reduced: boolean) {
  const camera = useThree((state) => state.camera)
  const target = useMemo(() => new Vector3(), [])
  const look = useMemo(() => new Vector3(), [])

  useFrame((_, delta) => {
    if (reduced) {
      camera.position.set(...POSES[0])
      camera.lookAt(...LOOK)
      return
    }

    const scaled = scrollSnapshot.progress * (POSES.length - 1)
    const index = Math.min(Math.floor(scaled), POSES.length - 2)
    const t = scaled - index
    const a = POSES[index]
    const b = POSES[index + 1]
    target.set(
      a[0] + (b[0] - a[0]) * t,
      a[1] + (b[1] - a[1]) * t,
      a[2] + (b[2] - a[2]) * t,
    )
    const lerp = 1 - Math.pow(0.0008, delta)
    camera.position.lerp(target, lerp)
    look.set(...LOOK)
    camera.lookAt(look)
  })
}
