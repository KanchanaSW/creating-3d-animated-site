import { WebGPURenderer } from 'three/webgpu'

/** The only place WebGPURenderer is constructed. Always await init(). */
export async function createWebGpuRenderer(props: object) {
  const renderer = new WebGPURenderer({
    ...(props as ConstructorParameters<typeof WebGPURenderer>[0]),
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
  })
  await renderer.init()
  return renderer
}
