import { MeshPhysicalNodeMaterial } from 'three/webgpu'
import { color, float, mx_noise_float, uv } from 'three/tsl'
import { siteConfig } from '../../config/site'
import { createStudioEnvNode } from './environment'

function grain(scale: number, amount: number) {
  return mx_noise_float(uv().mul(scale)).mul(amount)
}

function withStudio(mat: MeshPhysicalNodeMaterial) {
  mat.envNode = createStudioEnvNode(siteConfig.colors)
  mat.envMapIntensity = 1.7
  return mat
}

/** Polished metal that actually reflects the studio IBL. */
export function metalMaterial(hex: string, roughness = 0.2) {
  const mat = new MeshPhysicalNodeMaterial()
  mat.colorNode = color(hex)
  mat.metalness = 1
  mat.roughnessNode = float(roughness).add(grain(16, 0.08))
  mat.clearcoat = 0.7
  mat.clearcoatRoughness = 0.18
  return withStudio(mat)
}

/** Lacquered dielectric — plaster, enamel, painted form. */
export function coatMaterial(hex: string, roughness = 0.32) {
  const mat = new MeshPhysicalNodeMaterial()
  mat.colorNode = color(hex)
  mat.metalness = 0.06
  mat.roughnessNode = float(roughness).add(grain(11, 0.1))
  mat.clearcoat = 1
  mat.clearcoatRoughness = 0.16
  return withStudio(mat)
}

/** Soft stone / leather ground. */
export function stoneMaterial(hex: string) {
  const mat = new MeshPhysicalNodeMaterial()
  mat.colorNode = color(hex)
  mat.metalness = 0.14
  mat.roughnessNode = float(0.58).add(grain(28, 0.22))
  return withStudio(mat)
}

/** Small jewel — iridescence instead of transmission (more reliable on WebGPU). */
export function jewelMaterial(hex: string) {
  const mat = new MeshPhysicalNodeMaterial()
  mat.colorNode = color(hex)
  mat.metalness = 0.15
  mat.roughness = 0.08
  mat.clearcoat = 1
  mat.clearcoatRoughness = 0.06
  mat.iridescence = 1
  mat.iridescenceIOR = 1.3
  mat.iridescenceThicknessRange = [120, 420]
  return withStudio(mat)
}

/** Slightly glossy floor disk so the subject has a reflection. */
export function floorMaterial(hex: string) {
  const mat = new MeshPhysicalNodeMaterial()
  mat.colorNode = color(hex)
  mat.metalness = 0.62
  mat.roughnessNode = float(0.22).add(grain(6, 0.05))
  return withStudio(mat)
}
