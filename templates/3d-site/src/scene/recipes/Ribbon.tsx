import { useMemo } from 'react'
import { CatmullRomCurve3, Vector3 } from 'three/webgpu'
import { siteConfig } from '../../config/site'
import { useGalleryBeatUniform } from '../useGalleryBeat'
import { metalMaterial } from '../studio/materials'
import { positionLocal, vec3 } from 'three/tsl'

function ribbonCurve(phase: number, radius: number) {
  const points = Array.from({ length: 10 }, (_, i) => {
    const t = (i / 9) * Math.PI * 2
    return new Vector3(
      Math.cos(t + phase) * radius,
      Math.sin(t * 2 + phase) * 0.42,
      Math.sin(t + phase) * radius * 0.72,
    )
  })
  return new CatmullRomCurve3(points, true, 'catmullrom', 0.35)
}

export function Ribbon() {
  const beat = useGalleryBeatUniform()
  const { primary, secondary, accent } = siteConfig.colors

  const curves = useMemo(
    () => [ribbonCurve(0, 1.85), ribbonCurve(1.1, 1.55), ribbonCurve(2.2, 2.05)],
    [],
  )

  const materials = useMemo(() => {
    return [primary, secondary, accent].map((hex, index) => {
      const mat = metalMaterial(hex, 0.18 + index * 0.04)
      mat.positionNode = positionLocal.add(vec3(0, beat.mul(0.12 * (index - 1)), 0))
      return mat
    })
  }, [accent, beat, primary, secondary])

  return (
    <group rotation={[0.28, 0.35, 0.08]} position={[0, 0.15, 0]}>
      {curves.map((curve, index) => (
        <mesh key={index}>
          <tubeGeometry args={[curve, 140, 0.055 + index * 0.01, 12, true]} />
          <primitive attach="material" object={materials[index]} />
        </mesh>
      ))}
    </group>
  )
}
