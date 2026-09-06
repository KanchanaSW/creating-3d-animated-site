import { useLayoutEffect, useMemo, useRef } from 'react'
import { InstancedMesh, MeshStandardNodeMaterial, Object3D } from 'three/webgpu'
import { color } from 'three/tsl'
import { siteConfig } from '../../config/site'
import { scrollSnapshot } from '../scrollSnapshot'
import { useFrame } from '@react-three/fiber'

export function Lattice({ lite }: { lite: boolean }) {
  const count = lite ? 27 : 64
  const mesh = useRef<InstancedMesh>(null)
  const dummy = useMemo(() => new Object3D(), [])
  const { primary } = siteConfig.colors

  const material = useMemo(() => {
    const mat = new MeshStandardNodeMaterial()
    mat.colorNode = color(primary)
    mat.metalness = 0.42
    mat.roughness = 0.38
    return mat
  }, [primary])

  useLayoutEffect(() => {
    const instanced = mesh.current
    if (!instanced) return
    const side = Math.round(Math.cbrt(count))
    let i = 0
    for (let x = 0; x < side; x++) {
      for (let y = 0; y < side; y++) {
        for (let z = 0; z < side; z++) {
          if (i >= count) break
          dummy.position.set(
            (x - (side - 1) / 2) * 0.72,
            (y - (side - 1) / 2) * 0.72,
            (z - (side - 1) / 2) * 0.72,
          )
          dummy.rotation.set(x * 0.08, y * 0.08, z * 0.04)
          dummy.updateMatrix()
          instanced.setMatrixAt(i, dummy.matrix)
          i += 1
        }
      }
    }
    instanced.instanceMatrix.needsUpdate = true
  }, [count, dummy])

  useFrame(() => {
    const instanced = mesh.current
    if (!instanced) return
    const side = Math.round(Math.cbrt(count))
    const spread = 0.72 + scrollSnapshot.galleryBeat * 0.28
    let i = 0
    for (let x = 0; x < side; x++) {
      for (let y = 0; y < side; y++) {
        for (let z = 0; z < side; z++) {
          if (i >= count) break
          dummy.position.set(
            (x - (side - 1) / 2) * spread,
            (y - (side - 1) / 2) * spread,
            (z - (side - 1) / 2) * spread,
          )
          dummy.updateMatrix()
          instanced.setMatrixAt(i, dummy.matrix)
          i += 1
        }
      }
    }
    instanced.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.38, 0.38, 0.38]} />
      <primitive attach="material" object={material} />
    </instancedMesh>
  )
}
