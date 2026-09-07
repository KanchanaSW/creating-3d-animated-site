# Renderer

One `WebGLRenderer` on `#gl`. Import from `'three'` and `'three/addons/...'`. Not `three/webgpu`. Not TSL. Not R3F.

Construct it only in `src/main.js`. These settings are not optional:

```js
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: false,
  powerPreference: 'high-performance',
})
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.05
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
```

## IBL

```js
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'

const pmrem = new THREE.PMREMGenerator(renderer)
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
scene.environmentIntensity = 0.55
```

This is the studio reflection. Do not download an HDRI. Do not skip PMREM "because the lights are enough" — metals will read as plastic.

## Atmosphere

```js
scene.background = new THREE.Color(colors.background)
scene.fog = new THREE.Fog(colors.background, 7.5, 16)
```

Fog color **matches** the background. A mismatched fog draws a halo around the subject.

Camera: `PerspectiveCamera(32, aspect, 0.1, 40)`. FOV 32 is the product shot. Do not open it to 50+.

## Lights

Five lights. Intensities and roles are fixed; colors bind to the palette.

| Light | Type | Color | Intensity | Position | Shadows |
|---|---|---|---|---|---|
| Hemisphere | `HemisphereLight` | sky `foreground`, ground `background` | 0.55 | — | no |
| Key | `DirectionalLight` | `foreground` (near-white) | 1.35 | `(3.2, 5.2, 2.4)` | **yes** — 2048², ortho ±4, near 1 far 16, bias `-0.00025` |
| Rim | `DirectionalLight` | `primary` | 1.7 | `(-3.4, 1.8, -2.6)` | no |
| Fill | `DirectionalLight` | `foreground` | 0.28 | `(-2.2, 2.4, 3.2)` | no |
| Underglow | `PointLight` | `primary` | `1.6 + p * 2.2` | `(0, -0.15, 0)` | no — distance 4.5, decay 1.6 |

The key is **not** a brand color. Colored light lives on the rim and the underglow. If you paint the key `primary`, every material tints and the object disappears into the palette.

## Grounding

Two shadows, both required:

1. The key's shadow map (real contact on the case and plate).
2. A radial-gradient `CanvasTexture` on a `PlaneGeometry(6.2, 3.4)` at `y = -0.13`, `MeshBasicMaterial`, opacity `0.55 - p * 0.22`. This is the pool under the object. A painted `CircleGeometry` at fixed opacity is not a substitute.

CSS on top of the canvas: `.vignette` (radial + vertical falloff in `background`) and `.grain` (SVG fractal noise at 7% overlay). Do not implement these as Three passes. There is no EffectComposer.

## What you may not do

- `WebGPURenderer`, `three/tsl`, `Mesh*NodeMaterial`
- `@react-three/fiber`, `@react-three/drei`
- A second canvas "for fallback"
- `OrbitControls`
- `outputColorSpace` left at default, or tone mapping left linear
- `shadowMap.enabled = false`
- Loading `.hdr` / `.exr` / `.glb`

When the canvas is black, read [gotchas.md](gotchas.md).
