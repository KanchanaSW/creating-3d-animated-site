import { useLayoutEffect, useMemo } from 'react'
import { useThree } from '@react-three/fiber'
import { color, mix, positionWorldDirection, saturate } from 'three/tsl'
import { siteConfig } from '../../config/site'

/** Bright studio cards. Page background stays dark; the IBL must not. */
export function createStudioEnvNode(colors: {
  background: string
  primary: string
  accent: string
  foreground: string
}) {
  const dir = positionWorldDirection
  const y = saturate(dir.y.mul(0.5).add(0.5))
  const key = saturate(dir.x.mul(0.55).add(0.45)).mul(saturate(dir.y.mul(0.7).add(0.4)))
  const fill = saturate(dir.x.negate().mul(0.55).add(0.45))
  const zenith = color(colors.foreground).mul(0.92)
  const horizon = color(colors.primary).mul(0.75)
  const floor = color(colors.background).mul(0.35)
  const sky = mix(horizon, zenith, y)
  const studio = mix(floor, sky, saturate(y.mul(1.15)))
  return studio
    .add(color(colors.foreground).mul(key.mul(0.85)))
    .add(color(colors.accent).mul(fill.mul(0.28)))
}

export function StudioEnvironment() {
  const scene = useThree((state) => state.scene)
  const { background, primary, accent, foreground } = siteConfig.colors
  const env = useMemo(
    () => createStudioEnvNode({ background, primary, accent, foreground }),
    [accent, background, foreground, primary],
  )

  useLayoutEffect(() => {
    const next = scene as typeof scene & {
      environmentNode: typeof env | null
      environmentIntensity: number
    }
    next.environmentNode = env
    next.environmentIntensity = 1.65
    return () => {
      next.environmentNode = null
    }
  }, [env, scene])

  return null
}
