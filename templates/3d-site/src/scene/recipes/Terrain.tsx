import { useMemo } from 'react'
import { MeshPhysicalNodeMaterial } from 'three/webgpu'
import { color, float, mix, positionLocal, sin, time, vec3 } from 'three/tsl'
import { siteConfig } from '../../config/site'
import { useGalleryBeatUniform } from '../useGalleryBeat'
import { metalMaterial, stoneMaterial } from '../studio/materials'

export function Terrain({ lite }: { lite: boolean }) {
  const beat = useGalleryBeatUniform()
  const { primary, secondary, muted } = siteConfig.colors
  const segments = lite ? 64 : 128

  const land = useMemo(() => {
    const mat = new MeshPhysicalNodeMaterial()
    const wave = sin(positionLocal.x.mul(0.42).add(time.mul(0.12)))
      .add(sin(positionLocal.z.mul(0.31).add(time.mul(0.08))))
      .add(sin(positionLocal.x.mul(0.9).add(positionLocal.z.mul(0.7))).mul(0.35))
      .mul(float(0.28).add(beat.mul(0.22)))
    mat.positionNode = positionLocal.add(vec3(0, wave, 0))
    mat.colorNode = mix(color(secondary), color(primary), wave.mul(1.1).add(0.55))
    mat.metalness = 0.08
    mat.roughness = 0.72
    mat.envMapIntensity = 0.45
    return mat
  }, [beat, primary, secondary])

  const apron = useMemo(() => stoneMaterial(muted), [muted])
  const sun = useMemo(() => metalMaterial(primary, 0.08), [primary])

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.55, 0]}>
        <planeGeometry args={[14, 14, segments, segments]} />
        <primitive attach="material" object={land} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.92, 0]}>
        <circleGeometry args={[18, 48]} />
        <primitive attach="material" object={apron} />
      </mesh>
      <mesh position={[-2.4, 1.35, -3.2]}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <primitive attach="material" object={sun} />
      </mesh>
    </group>
  )
}
