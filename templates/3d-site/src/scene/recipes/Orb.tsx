import { useMemo } from 'react'
import { MeshStandardNodeMaterial } from 'three/webgpu'
import { color } from 'three/tsl'
import { siteConfig } from '../../config/site'

export function Orb() {
  const { primary, secondary, accent } = siteConfig.colors

  const main = useMemo(() => {
    const material = new MeshStandardNodeMaterial()
    material.colorNode = color(primary)
    material.metalness = 0.78
    material.roughness = 0.16
    return material
  }, [primary])

  const rim = useMemo(() => {
    const material = new MeshStandardNodeMaterial()
    material.colorNode = color(accent)
    material.metalness = 0.35
    material.roughness = 0.28
    material.emissiveNode = color(accent)
    return material
  }, [accent])

  const core = useMemo(() => {
    const material = new MeshStandardNodeMaterial()
    material.colorNode = color(secondary)
    material.metalness = 0.55
    material.roughness = 0.32
    return material
  }, [secondary])

  return (
    <group>
      <mesh>
        <sphereGeometry args={[1.15, 64, 64]} />
        <primitive attach="material" object={main} />
      </mesh>
      <mesh position={[1.7, 0.55, 0.4]}>
        <sphereGeometry args={[0.28, 32, 32]} />
        <primitive attach="material" object={rim} />
      </mesh>
      <mesh position={[-1.45, -0.35, 0.55]}>
        <sphereGeometry args={[0.18, 24, 24]} />
        <primitive attach="material" object={core} />
      </mesh>
      <mesh position={[0.2, 1.35, -0.6]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <primitive attach="material" object={rim} />
      </mesh>
    </group>
  )
}
