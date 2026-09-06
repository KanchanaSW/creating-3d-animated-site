import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { InstancedMesh, MeshStandardNodeMaterial, Object3D } from 'three/webgpu'
import { color } from 'three/tsl'
import { siteConfig } from '../../config/site'
import { scrollSnapshot } from '../scrollSnapshot'

export function Field({ lite }: { lite: boolean }) {
  const count = lite ? 80 : 220
  const mesh = useRef<InstancedMesh>(null)
  const dummy = useMemo(() => new Object3D(), [])
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 7.5,
        y: (Math.random() - 0.5) * 7.5,
        z: (Math.random() - 0.5) * 7.5,
        s: 0.04 + Math.random() * 0.07,
      })),
    [count],
  )
  const { primary, accent } = siteConfig.colors

  const material = useMemo(() => {
    const mat = new MeshStandardNodeMaterial()
    mat.colorNode = color(primary)
    mat.emissiveNode = color(accent)
    mat.metalness = 0.2
    mat.roughness = 0.45
    return mat
  }, [accent, primary])

  useLayoutEffect(() => {
    const instanced = mesh.current
    if (!instanced) return
    seeds.forEach((seed, i) => {
      dummy.position.set(seed.x, seed.y, seed.z)
      dummy.scale.setScalar(seed.s)
      dummy.updateMatrix()
      instanced.setMatrixAt(i, dummy.matrix)
    })
    instanced.instanceMatrix.needsUpdate = true
  }, [dummy, seeds])

  useFrame(() => {
    const instanced = mesh.current
    if (!instanced) return
    const grow = 1 + scrollSnapshot.galleryBeat * 0.7
    seeds.forEach((seed, i) => {
      dummy.position.set(seed.x * grow, seed.y * grow, seed.z * grow)
      dummy.scale.setScalar(seed.s * (1 + scrollSnapshot.galleryBeat * 0.4))
      dummy.updateMatrix()
      instanced.setMatrixAt(i, dummy.matrix)
    })
    instanced.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <primitive attach="material" object={material} />
    </instancedMesh>
  )
}
