import { useEffect } from 'react'
import { Canvas, extend, useThree } from '@react-three/fiber'
import * as THREE from 'three/webgpu'
import { useLiteDensity, usePrefersReducedMotion } from '../lib/media'
import { createWebGpuRenderer } from './createWebGpuRenderer'
import { Scene } from './Scene'

extend(THREE as never)

function PaintOnce({ enabled }: { enabled: boolean }) {
  const invalidate = useThree((state) => state.invalidate)

  useEffect(() => {
    if (enabled) invalidate()
  }, [enabled, invalidate])

  return null
}

export function WebGPUCanvas() {
  const reduced = usePrefersReducedMotion()
  const lite = useLiteDensity()

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        gl={createWebGpuRenderer}
        dpr={lite ? 1 : [1, 1.75]}
        frameloop={reduced ? 'never' : 'always'}
        camera={{ position: [0, 0.35, 5.2], fov: 42, far: 24 }}
      >
        <PaintOnce enabled={reduced} />
        <Scene reduced={reduced} lite={lite} />
      </Canvas>
    </div>
  )
}
