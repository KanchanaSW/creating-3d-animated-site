# WebGPU

Pin this stack. Do not "simplify" it back to WebGL-only Three.js.

| Layer | Choice |
|---|---|
| three | `three` (WebGPU entry) |
| shading | `three/tsl` |
| react | `@react-three/fiber` **^9.6** — not v10 alpha |
| renderer | `WebGPURenderer` via the async `gl` factory |

## Imports

```ts
import * as THREE from 'three/webgpu'
import { color, time, sin, positionLocal, vec3 } from 'three/tsl'
import { Canvas, extend } from '@react-three/fiber'
```

Never `import … from 'three'`. That loads a second renderer family. Materials and math will silently disagree, and the canvas stays black.

Never `ShaderMaterial`, never a GLSL `vertexShader` / `fragmentShader` string. GLSL does not run on WebGPU. TSL compiles to WGSL (and to GLSL on the WebGL fallback).

## Renderer

The only constructor lives in `src/scene/createWebGpuRenderer.ts`:

```ts
import { WebGPURenderer } from 'three/webgpu'

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
```

Pass it to R3F v9 as `gl={createWebGpuRenderer}`. Always `await renderer.init()`. Returning an uninitialized renderer is the usual black-canvas bug.

`WebGPURenderer` already falls back to WebGL 2 when WebGPU is missing. Do not mount a second `<Canvas>` for that case.

## Extend once

R3F's catalog is WebGL-era by default. After importing `three/webgpu`, `extend` that module so node materials exist as JSX (or construct them with `new THREE.MeshStandardNodeMaterial()` and attach via `<primitive>`).

Do this in `WebGPUCanvas.tsx` only.

## One Canvas

```tsx
<Canvas
  gl={createWebGpuRenderer}
  dpr={isMobile ? 1 : [1, 1.75]}
  frameloop={reduced ? 'never' : 'always'}
  camera={{ position: [0, 0.35, 5.2], fov: 42, far: 24 }}
>
```

- `pointer-events-none` on the wrapping div so the page scrolls and links work.
- `z-0`, `position: fixed`, `inset: 0`.
- Clear color and fog = `siteConfig.colors.background`.

## Reduced motion and mobile

- Reduced motion: `frameloop="never"`. Invalidate once after init so a still frame paints.
- Below 768px: `dpr={1}` and the lite instance counts in each recipe. Do not unmount the canvas.

## Do not add

- `@react-three/drei` (HDRI `Environment`, `useGLTF`, `OrbitControls`)
- `OrbitControls` from addons
- `WebGLRenderer` imported beside `WebGPURenderer`
- Postprocessing stacks that assume the WebGL composer
