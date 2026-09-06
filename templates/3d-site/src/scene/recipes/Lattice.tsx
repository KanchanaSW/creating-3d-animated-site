import { useMemo } from 'react'
import { siteConfig } from '../../config/site'
import { scrollSnapshot } from '../scrollSnapshot'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Group } from 'three/webgpu'
import { coatMaterial, metalMaterial, stoneMaterial } from '../studio/materials'

type Column = {
  x: number
  z: number
  h: number
  kind: 'metal' | 'coat' | 'stone'
}

export function Lattice({ lite }: { lite: boolean }) {
  const group = useRef<Group>(null)
  const { primary, secondary, accent, muted } = siteConfig.colors
  const side = lite ? 4 : 6

  const columns = useMemo<Column[]>(() => {
    const items: Column[] = []
    const kinds: Column['kind'][] = ['metal', 'coat', 'stone']
    for (let x = 0; x < side; x++) {
      for (let z = 0; z < side; z++) {
        const n = (x * 5 + z * 11) % 7
        items.push({
          x: (x - (side - 1) / 2) * 0.58,
          z: (z - (side - 1) / 2) * 0.58,
          h: 0.42 + n * 0.2,
          kind: kinds[(x + z) % 3],
        })
      }
    }
    return items
  }, [side])

  const metal = useMemo(() => metalMaterial(primary, 0.24), [primary])
  const coat = useMemo(() => coatMaterial(secondary, 0.36), [secondary])
  const stone = useMemo(() => stoneMaterial(muted), [muted])
  const trim = useMemo(() => metalMaterial(accent, 0.18), [accent])

  const materials = { metal, coat, stone }

  useFrame(() => {
    const root = group.current
    if (!root) return
    const spread = 1 + scrollSnapshot.galleryBeat * 0.18
    root.scale.set(spread, 1, spread)
  })

  return (
    <group ref={group} position={[0, -1.16, 0]}>
      {columns.map((column) => (
        <mesh key={`${column.x}-${column.z}`} position={[column.x, column.h / 2, column.z]}>
          <boxGeometry args={[0.36, column.h, 0.36]} />
          <primitive attach="material" object={materials[column.kind]} />
        </mesh>
      ))}
      <mesh position={[0, 1.55, 0]}>
        <boxGeometry args={[0.22, 0.22, 0.22]} />
        <primitive attach="material" object={trim} />
      </mesh>
    </group>
  )
}
