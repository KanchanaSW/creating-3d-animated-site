import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { InstancedMesh, Object3D } from 'three/webgpu'
import { siteConfig } from '../../config/site'
import { scrollSnapshot } from '../scrollSnapshot'
import { coatMaterial, jewelMaterial, metalMaterial } from '../studio/materials'

export function Field({ lite }: { lite: boolean }) {
  const count = lite ? 90 : 200
  const mesh = useRef<InstancedMesh>(null)
  const dummy = useMemo(() => new Object3D(), [])
  const { primary, secondary, accent } = siteConfig.colors

  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const u = (i + 1) / count
        const a = i * 2.399
        const r = 0.9 + u * 3.6
        return {
          x: Math.cos(a) * r,
          y: (Math.sin(i * 1.7) * 0.7 + u * 0.4) * 1.1,
          z: Math.sin(a) * r * 0.85,
          s: 0.025 + (1 - u) * 0.055,
        }
      }),
    [count],
  )

  const dust = useMemo(() => metalMaterial(primary, 0.35), [primary])
  const planet = useMemo(() => coatMaterial(secondary, 0.28), [secondary])
  const ring = useMemo(() => metalMaterial(accent, 0.16), [accent])
  const core = useMemo(() => jewelMaterial(accent), [accent])

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
    const grow = 1 + scrollSnapshot.galleryBeat * 0.45
    seeds.forEach((seed, i) => {
      dummy.position.set(seed.x * grow, seed.y, seed.z * grow)
      dummy.scale.setScalar(seed.s * (1 + scrollSnapshot.galleryBeat * 0.3))
      dummy.updateMatrix()
      instanced.setMatrixAt(i, dummy.matrix)
    })
    instanced.instanceMatrix.needsUpdate = true
  })

  return (
    <group>
      <mesh position={[0, 0.15, 0]}>
        <sphereGeometry args={[0.92, 64, 64]} />
        <primitive attach="material" object={planet} />
      </mesh>
      <mesh position={[0, 0.15, 0]} rotation={[1.2, 0.2, 0.1]}>
        <torusGeometry args={[1.45, 0.03, 16, 96]} />
        <primitive attach="material" object={ring} />
      </mesh>
      <mesh position={[0, 0.15, 0]}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <primitive attach="material" object={core} />
      </mesh>
      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        <sphereGeometry args={[1, 10, 10]} />
        <primitive attach="material" object={dust} />
      </instancedMesh>
    </group>
  )
}
