import { useMemo } from 'react'
import { MeshStandardNodeMaterial } from 'three/webgpu'
import { color, float, positionLocal, sin, time, vec3 } from 'three/tsl'
import { siteConfig } from '../../config/site'
import { useGalleryBeatUniform } from '../useGalleryBeat'

export function Terrain({ lite }: { lite: boolean }) {
  const beat = useGalleryBeatUniform()
  const { primary, secondary } = siteConfig.colors
  const segments = lite ? 48 : 96

  const material = useMemo(() => {
    const mat = new MeshStandardNodeMaterial()
    mat.colorNode = color(primary)
    mat.metalness = 0.12
    mat.roughness = 0.62
    const wave = sin(positionLocal.x.mul(0.55).add(time.mul(0.28)))
      .add(sin(positionLocal.z.mul(0.4).add(time.mul(0.18))))
      .mul(float(0.22).add(beat.mul(0.28)))
    mat.positionNode = positionLocal.add(vec3(0, wave, 0))
    return mat
  }, [beat, primary])

  const floor = useMemo(() => {
    const mat = new MeshStandardNodeMaterial()
    mat.colorNode = color(secondary)
    mat.metalness = 0.08
    mat.roughness = 0.85
    return mat
  }, [secondary])

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]}>
        <planeGeometry args={[10, 10, segments, segments]} />
        <primitive attach="material" object={material} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.95, 0]}>
        <planeGeometry args={[14, 14, 1, 1]} />
        <primitive attach="material" object={floor} />
      </mesh>
    </group>
  )
}
