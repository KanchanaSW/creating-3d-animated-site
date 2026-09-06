import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three/webgpu'
import { siteConfig } from '../config/site'
import { scrollSnapshot } from './scrollSnapshot'
import { useScrollCamera } from './useScrollCamera'
import { Orb } from './recipes/Orb'
import { Lattice } from './recipes/Lattice'
import { Field } from './recipes/Field'
import { Ribbon } from './recipes/Ribbon'
import { Terrain } from './recipes/Terrain'

export function Scene({ reduced, lite }: { reduced: boolean; lite: boolean }) {
  const group = useRef<Group>(null)
  const recipe = siteConfig.scene.recipe
  const { background, primary, secondary, accent } = siteConfig.colors

  useScrollCamera(reduced)

  useFrame((_, delta) => {
    const root = group.current
    if (!root) return
    if (!reduced) root.rotation.y += delta * 0.12
    const scale = 1 + scrollSnapshot.galleryBeat * 0.14
    root.scale.setScalar(scale)
  })

  return (
    <>
      <color attach="background" args={[background]} />
      <fog attach="fog" args={[background, 8, 18]} />
      <ambientLight intensity={0.32} />
      <directionalLight position={[4.5, 6, 4]} intensity={1.35} color={primary} />
      <directionalLight position={[-3, 1.4, 5]} intensity={0.45} color={secondary} />
      <pointLight position={[-4, 2.2, -2]} intensity={1.15} color={accent} />
      <group ref={group}>
        {recipe === 'orb' ? <Orb /> : null}
        {recipe === 'lattice' ? <Lattice lite={lite} /> : null}
        {recipe === 'field' ? <Field lite={lite} /> : null}
        {recipe === 'ribbon' ? <Ribbon /> : null}
        {recipe === 'terrain' ? <Terrain lite={lite} /> : null}
      </group>
    </>
  )
}
