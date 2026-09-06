import { useMemo } from 'react'
import { DoubleSide, MeshStandardNodeMaterial } from 'three/webgpu'
import { color, positionLocal, sin, time, vec3 } from 'three/tsl'
import { siteConfig } from '../../config/site'
import { useGalleryBeatUniform } from '../useGalleryBeat'

export function Ribbon() {
  const beat = useGalleryBeatUniform()
  const { primary, secondary, accent } = siteConfig.colors

  const materials = useMemo(() => {
    const make = (hex: string, offset: number) => {
      const material = new MeshStandardNodeMaterial()
      material.colorNode = color(hex)
      material.metalness = 0.55
      material.roughness = 0.28
      const wave = sin(positionLocal.x.mul(1.8).add(time.mul(0.45)).add(offset))
        .add(sin(positionLocal.x.mul(0.7).add(time.mul(0.2))))
        .mul(0.22)
        .add(beat.mul(0.18))
      material.positionNode = positionLocal.add(vec3(0, wave, 0))
      material.side = DoubleSide
      return material
    }
    return [make(primary, 0), make(secondary, 1.2), make(accent, 2.4)]
  }, [accent, beat, primary, secondary])

  return (
    <group rotation={[0.35, 0.4, 0.1]}>
      {materials.map((material, index) => (
        <mesh key={index} position={[0, (index - 1) * 0.55, 0]}>
          <planeGeometry args={[6.2, 0.42, 80, 1]} />
          <primitive attach="material" object={material} />
        </mesh>
      ))}
    </group>
  )
}
