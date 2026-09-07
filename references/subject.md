# Subject

The canvas shows the **named physical object** in the title, built from primitives and canvas textures. It does not show an abstract still life. There is no recipe enum. If you cannot point at the mesh and say the object's name, the run failed.

`src/subject.js` is authored every run. The template ships a 60% mechanical keyboard as a worked example — replace that file, do not tint it and ship a keyboard for a watch.

## Method

Follow these steps in order. Do not skip to copy.

1. **Name the object.** Read the title. The subject is a real artifact you can hold: a keyboard, a watch, a camera, a fountain pen, a turntable, an espresso machine. If the title is abstract (`Nova Lab`, `Harbor & Pine`), pick the nearest real artifact that belongs to that world and **commit to it in writing** before you model. `Harbor & Pine` is a compass, a trail lantern, or a topographic instrument — not a grid of boxes. Never leave the subject unnamed.

2. **Split it into 4–7 layers.** Layers are physical strata that separate along one axis (usually Y). A keyboard is keycaps → switches → plate → PCB → internals → case. A watch is crystal → hands → dial → movement → caseback. A camera is lens → helicoid → body → film gate → back. If you cannot name four layers, you picked a blob, not an object. Start over.

3. **Write a data table for anything repeated.** The keyboard drives 61 keys from rows of `{ l, s, u, accent }`. A watch chapter ring is 12 hour marks. A camera is a circle of iris blades. Do not model each copy by hand. The table is the source of mesh count.

4. **Build from beveled primitives.** Use a rounded-rect `THREE.Shape` + `ExtrudeGeometry` **with bevel** for anything the user touches (caps, bezels, bodies). Bevels catch the key light; unbeveled boxes read as Minecraft. Then `RoundedBoxGeometry`, `CylinderGeometry`, `TorusGeometry`, `LatheGeometry`. Share geometry across the table. Target **150–400 meshes**. Under 40 is a failed run — that is a sculpture, not a product.

5. **Add a detail pass.** Fasteners, ports, feet, seams, trim, pins, screws. Small parts establish scale. A keyboard without standoffs and USB-C is a toy. A watch without crown and lugs is a puck.

6. **Canvas-draw anything printed.** Legends, silkscreen, dial indexes, serials, logos. `document.createElement('canvas')` → `THREE.CanvasTexture`, `colorSpace = SRGBColorSpace`, `anisotropy = 8` on fine type. Cache by label. **No image downloads.** Forbidding textures was the old skill's mistake; forbidding *files* is the rule.

7. **Register every moving part.** See the contract below. `castShadow` and `receiveShadow` on every mesh that is not an unlit print plane.

## Contract

`src/subject.js` must export exactly this:

```js
export const LAYERS = ['keycaps', 'switches', 'plate', 'pcb', 'internals', 'case']

export const LAYER_WINDOWS = {
  keycaps:   [0.10, 0.32],
  switches:  [0.28, 0.50],
  plate:     [0.46, 0.64],
  pcb:       [0.58, 0.76],
  internals: [0.70, 0.88],
  case:      [0.78, 0.96],
}

export function buildSubject({ colors }) {
  // returns THREE.Group
}

export function applyExplosion(root, p) {
  // smoothstep each part from home → home + explode
}
```

- `LAYERS` has 4–7 ids. They match chapter ids in `site.js` (assembled + exploded may bookend them).
- `LAYER_WINDOWS` overlap. Staggered peel, not a simultaneous pop. Each window is ~0.20–0.24 wide and starts before the previous ends.
- `buildSubject` reads `colors` from `siteConfig`. Recolor materials from those hexes — do not hardcode a second palette.
- Every registered part:

```js
mesh.userData.layer = 'keycaps'
mesh.userData.home = mesh.position.clone()
mesh.userData.explode = new THREE.Vector3(outward.x, 1.18, outward.z)
mesh.castShadow = true
mesh.receiveShadow = true
```

Keep the parts array and named anchors on the group:

```js
root.userData.parts = parts
root.userData.anchors = { keycaps, switches, plate, pcb, internals }
```

Anchors are meshes `main.js` projects into CSS callouts. One anchor per callout.

`applyExplosion` is the template's version. Copy it. Do not rewrite it as a GSAP timeline.

## Geometry notes

| Need | Primitive |
|---|---|
| Keycap, bezel, any touched surface | `Shape` (quadratic corners) + `ExtrudeGeometry` with `bevelEnabled: true`, 2 bevel segments |
| Plate, PCB, housing, foam, case | `RoundedBoxGeometry` from `three/addons/geometries/RoundedBoxGeometry.js` |
| Stem, pin, standoff, foot, crown | `BoxGeometry` / `CylinderGeometry` |
| Glow ring, chapter ring | `TorusGeometry` |
| Watch hands, cam profiles | `LatheGeometry` or a thin `Shape` extrude |

Reuse geos. The keyboard shares one housing, one stem pair, one pin across 61 keys. Unique extrudes only when the table's width (`u`) changes.

Explosion offsets are **radial plus up/down**, not a uniform Y lift. Parts on the left fly left; the case drops; the top layer climbs. Overlapping windows do the rest.

## Materials

Import factories from `src/materials.js`. Do not inline a flat `MeshStandardMaterial({ color })` on a body part.

| Factory | Use |
|---|---|
| `plastic` | Caps, shells — clearcoat 0.7, sheen 0.18 |
| `coat` | Anodized / powder-coated chassis |
| `metal` | Plates, brushed steel. Pass a canvas `map` when there are cutouts |
| `housing` | Smoked switch / crystal-adjacent plastic |
| `emissivePlastic` | Accent stems, glowing trim |
| `hardware` | Screws, pins, USB, crown tube |
| `board` | PCB with silkscreen map |
| `foam` | Felt / poron |
| `rubber` | Feet |
| `glow` | Thin emissive torus |
| `print` | Unlit canvas legend (`toneMapped: false`) |

## What you may not do

- Pick from `orb | lattice | field | ribbon | terrain`. That enum is gone. A lattice of boxes is a failed run even if the title is "product".
- Load a GLTF, HDRI, PNG, JPG, or WEBP. Procedural only.
- Leave `subject.js` as the keyboard example when the title is not a keyboard.
- Collapse the object to one sphere, one box, or one torus "to keep it clean".
- Skip bevels.
- Skip canvas prints on a surface that would have type in real life.
- Register fewer than four layers.
- Drive explosion with `mesh.rotation.y += delta` idle spin. The subject rotates a few degrees across the whole scroll (`-8° + p * 0.35`), that's it.

## Check

After `npm run dev`, open the hero. Any "no" is a failed run:

- Can you name the object in one word without reading the headline?
- Are there 4–7 distinct strata, not one mass?
- Do small parts (screws, pins, feet, a port) exist?
- Does type appear on the object itself (legends, silkscreen, a dial)?
- `window.__audit()` reports `meshes >= 40` (target 150–400) and `shadowCasters > 0`?

The screenshot script in this skill folder (`scripts/shoot.mjs`) enforces the last two. Run it.
