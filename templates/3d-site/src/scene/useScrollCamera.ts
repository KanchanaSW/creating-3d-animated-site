import { useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three/webgpu'
import { scrollSnapshot } from './scrollSnapshot'

const POSES: Array<[number, number, number]> = [
  [0, 0.35, 5.2],
  [1.6, 0.8, 4.4],
  [0, 1.8, 6.5],
  [-1.4, 0.6, 4.0],
  [0.4, -0.2, 7.2],
  [0, 2.4, 8.5],
]

const ORIGIN: [number, number, number] = [0, 0, 0]

export function useScrollCamera(reduced: boolean) {
  const camera = useThree((state) => state.camera)
  const target = useMemo(() => new Vector3(), [])
  const look = useMemo(() => new Vector3(), [])

  useFrame((_, delta) => {
    if (reduced) {
      camera.position.set(...POSES[0])
      camera.lookAt(...ORIGIN)
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
    look.set(0, 0, 0)
    camera.lookAt(look)
  })
}
