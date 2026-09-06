import { useMemo } from 'react'
import { siteConfig } from '../../config/site'
import { useGalleryBeatUniform } from '../useGalleryBeat'
import { coatMaterial, jewelMaterial, metalMaterial, stoneMaterial } from '../studio/materials'
import { positionLocal, vec3 } from 'three/tsl'

export function Orb() {
  const beat = useGalleryBeatUniform()
  const { primary, secondary, accent, muted } = siteConfig.colors

  const body = useMemo(() => metalMaterial(primary, 0.16), [primary])
  const ring = useMemo(() => metalMaterial(secondary, 0.12), [secondary])
  const jewel = useMemo(() => jewelMaterial(accent), [accent])
  const plinth = useMemo(() => stoneMaterial(muted), [muted])
  const cap = useMemo(() => coatMaterial(secondary, 0.4), [secondary])

  const ringA = useMemo(() => {
    const mat = metalMaterial(primary, 0.1)
    mat.positionNode = positionLocal.add(vec3(0, beat.mul(0.08), 0))
    return mat
  }, [beat, primary])

  const ringB = useMemo(() => {
    const mat = metalMaterial(accent, 0.14)
    mat.positionNode = positionLocal.add(vec3(0, beat.mul(-0.06), 0))
    return mat
  }, [accent, beat])

  return (
    <group>
      <mesh position={[0, -0.98, 0]}>
        <cylinderGeometry args={[0.62, 0.74, 0.34, 48]} />
        <primitive attach="material" object={plinth} />
      </mesh>
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.04, 48]} />
        <primitive attach="material" object={cap} />
      </mesh>
      <mesh position={[0, 0.22, 0]}>
        <sphereGeometry args={[1.02, 96, 96]} />
        <primitive attach="material" object={body} />
      </mesh>
      <mesh rotation={[1.15, 0.2, 0.15]} position={[0, 0.22, 0]}>
        <torusGeometry args={[1.32, 0.055, 24, 96]} />
        <primitive attach="material" object={ringA} />
      </mesh>
      <mesh rotation={[0.4, 1.1, 0.7]} position={[0, 0.22, 0]}>
        <torusGeometry args={[1.52, 0.034, 16, 96]} />
        <primitive attach="material" object={ringB} />
      </mesh>
      <mesh position={[1.55, 0.48, 0.35]}>
        <sphereGeometry args={[0.16, 32, 32]} />
        <primitive attach="material" object={jewel} />
      </mesh>
      <mesh position={[-1.38, -0.05, 0.55]}>
        <sphereGeometry args={[0.11, 24, 24]} />
        <primitive attach="material" object={ring} />
      </mesh>
      <mesh position={[0.15, 1.28, -0.45]}>
        <sphereGeometry args={[0.08, 20, 20]} />
        <primitive attach="material" object={jewel} />
      </mesh>
    </group>
  )
}
