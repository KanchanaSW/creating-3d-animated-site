import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three/webgpu'
import { siteConfig } from '../config/site'
import { scrollSnapshot } from './scrollSnapshot'
import { useScrollCamera } from './useScrollCamera'
import { StudioEnvironment } from './studio/environment'
import { StudioSet } from './studio/StudioSet'
import { Orb } from './recipes/Orb'
import { Lattice } from './recipes/Lattice'
import { Field } from './recipes/Field'
import { Ribbon } from './recipes/Ribbon'
import { Terrain } from './recipes/Terrain'

export function Scene({ reduced, lite }: { reduced: boolean; lite: boolean }) {
  const group = useRef<Group>(null)
  const recipe = siteConfig.scene.recipe
  const { background, primary, secondary, accent, foreground } = siteConfig.colors

  useScrollCamera(reduced)

  useFrame((_, delta) => {
    const root = group.current
    if (!root) return
    if (!reduced) root.rotation.y += delta * 0.045
    const scale = 1 + scrollSnapshot.galleryBeat * 0.08
    root.scale.setScalar(scale)
  })

  return (
    <>
      <color attach="background" args={[background]} />
      <fog attach="fog" args={[background, 10, 24]} />
      <StudioEnvironment />
      <hemisphereLight args={[foreground, background, 0.42]} />
      <directionalLight position={[5.4, 7.2, 3.1]} intensity={2.05} color={foreground} />
      <directionalLight position={[-4.6, 2.4, 4.2]} intensity={0.55} color={accent} />
      <directionalLight position={[0.2, 3.8, -5.5]} intensity={0.4} color={secondary} />
      <spotLight
        position={[2.2, 6.4, 2.4]}
        angle={0.38}
        penumbra={0.72}
        intensity={1.55}
        color={primary}
      />
      <pointLight position={[-2.4, 1.4, 1.6]} intensity={0.45} color={accent} />
      <StudioSet />
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
