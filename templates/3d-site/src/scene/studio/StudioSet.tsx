import { useMemo } from 'react'
import { BackSide, MeshBasicNodeMaterial } from 'three/webgpu'
import { color, float, mix, positionLocal, saturate } from 'three/tsl'
import { siteConfig } from '../../config/site'
import { floorMaterial, metalMaterial, stoneMaterial } from './materials'

/**
 * The room the subject sits in. A recipe with no set is a primitive in a void
 * — the failure this skill exists to prevent.
 */
export function StudioSet() {
  const { background, primary, secondary, accent, muted, foreground } = siteConfig.colors

  const cyclorama = useMemo(() => {
    const mat = new MeshBasicNodeMaterial()
    const y = saturate(positionLocal.y.mul(0.04).add(0.38))
    const band = saturate(float(1).sub(positionLocal.y.abs().mul(0.12)))
    mat.colorNode = mix(color(background), color(primary).mul(0.42), y).add(
      color(foreground).mul(band.mul(0.1)),
    )
    mat.side = BackSide
    return mat
  }, [background, foreground, primary])

  const shadow = useMemo(() => {
    const mat = new MeshBasicNodeMaterial()
    mat.colorNode = color('#000000')
    mat.transparent = true
    mat.opacity = 0.42
    mat.depthWrite = false
    return mat
  }, [])

  const keyCard = useMemo(() => {
    const mat = new MeshBasicNodeMaterial()
    mat.colorNode = color(primary).mul(1.15)
    return mat
  }, [primary])

  const fillCard = useMemo(() => {
    const mat = new MeshBasicNodeMaterial()
    mat.colorNode = color(accent).mul(0.55)
    return mat
  }, [accent])

  const floor = useMemo(() => floorMaterial(secondary), [secondary])
  const apron = useMemo(() => stoneMaterial(muted), [muted])
  const lip = useMemo(() => metalMaterial(primary, 0.28), [primary])

  return (
    <group>
      <mesh>
        <sphereGeometry args={[22, 32, 20]} />
        <primitive attach="material" object={cyclorama} />
      </mesh>
      <mesh position={[-6.2, 3.4, -5.5]} rotation={[0, 0.55, 0]}>
        <planeGeometry args={[4.2, 2.4]} />
        <primitive attach="material" object={keyCard} />
      </mesh>
      <mesh position={[6.8, 1.6, -4.2]} rotation={[0, -0.7, 0]}>
        <planeGeometry args={[2.6, 3.2]} />
        <primitive attach="material" object={fillCard} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.18, 0]}>
        <circleGeometry args={[16, 64]} />
        <primitive attach="material" object={apron} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.165, 0]}>
        <circleGeometry args={[3.6, 64]} />
        <primitive attach="material" object={floor} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.155, 0]}>
        <ringGeometry args={[3.55, 3.72, 64]} />
        <primitive attach="material" object={lip} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.15, 0]}>
        <circleGeometry args={[1.6, 32]} />
        <primitive attach="material" object={shadow} />
      </mesh>
    </group>
  )
}
