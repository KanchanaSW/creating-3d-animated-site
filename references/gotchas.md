# Gotchas

When the canvas is black, the scroll fights the mouse, or the scene ignores the brand, read this before patching around it.

| Symptom | Cause | Fix |
|---|---|---|
| Black canvas | `import` from `'three'` mixed with `'three/webgpu'` | Delete the default `three` import. One module: `three/webgpu`. |
| Black canvas | `WebGPURenderer` returned without `await init()` | Use `createWebGpuRenderer`. Do not construct the renderer inline. |
| Black canvas | Node materials never `extend`ed | `extend` the `three/webgpu` module in `WebGPUCanvas.tsx`. |
| GLSL compile error / blank on Safari WebGPU | `ShaderMaterial` or raw GLSL | Rewrite as TSL (`three/tsl`) on `MeshStandardNodeMaterial`. |
| Page will not scroll; model spins on drag | `OrbitControls` | Remove it. Camera is scroll-driven. |
| Two scenes, or a flash of WebGL then WebGPU | A second `<Canvas>` "for fallback" | One Canvas. `WebGPURenderer` falls back internally. |
| HTML reveals stuck at `opacity: 0` | `gsap.from` instead of set + `to` | Restore `useGsapReveal`. |
| Double-smoothing on the page | Lenis `autoRaf: true` plus the GSAP ticker | `autoRaf` stays off. Only `initSmoothScroll`. |
| Camera ignores scroll | GSAP tweening `camera.position` | Write a number into `scrollSnapshot`; `useFrame` reads it. |
| Canvas eats clicks | Missing `pointer-events-none` on the canvas wrap | Restore it. |
| Scene is white/orange regardless of title | Hardcoded material colors | Bind TSL `color()` nodes to `siteConfig.colors`. |
| Hero hides the recipe | Opaque hero background or heavy scrim | Light scrims only. The canvas is the photograph. |
| Inverse band unreadable | Inverse left translucent | Inverse stays near-opaque. Quotes are HTML, not 3D. |
| Jank on phone | DPR 2 + full instance counts | `dpr={1}` below 768px; lite counts in recipes. |
| Reduced-motion users get a spinning sphere | `frameloop` left on `always` | `never` after one still frame. |
| Added `drei` for `Environment` | HDRI download + extra RAF helpers | Remove drei. Procedural lights only. |
| Copied a Three.js example that uses `WebGLRenderer` | Wrong renderer family | Stay on `createWebGpuRenderer`. |

**All of these mean: the canvas is wrong. Re-read [webgpu.md](webgpu.md) and [scene.md](scene.md); do not patch around them.**
