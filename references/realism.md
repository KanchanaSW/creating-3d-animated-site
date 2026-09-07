# Realism contract

The canvas must read as a **photographed object**, not a Three.js hello-world and not a studio still life of unrelated primitives. This file exists because a generated keyboard site shipped as a 6×6 grid of pastel boxes — and that is a failed run.

The template already implements the renderer, the light rig, and a worked-example keyboard. Your job is to replace the keyboard with the named subject without stripping the rig. Read [subject.md](subject.md) before editing `src/subject.js`. Read [renderer.md](renderer.md) before touching lights.

## What a passing hero looks like

At the first viewport you can name:

1. **The object in the title.** A keyboard is a keyboard. A watch is a watch. Not a lattice, not an orb, not a ribbon.
2. **Four or more layers** that will separate on scroll — you can already see the stack in the closed state (caps sitting on a plate sitting on a case).
3. **A room** — fogged ink background, a contact shadow pool, and a key light that casts a real shadow. The object sits on something.
4. **Reflections** — metals show `RoomEnvironment`, not a single white specular dot.
5. **Two light temperatures** — a near-white key and a `primary`-colored rim / underglow.

If you cannot name those five things, the run failed. Recolor is not a fix.

## The rig (always on)

Do not delete these from `src/main.js`:

| Piece | Why |
|---|---|
| ACES + exposure 1.05 + sRGB | Filmic response. Linear looks cheap. |
| `PMREMGenerator` + `RoomEnvironment` at 0.55 | Metals need something to reflect. |
| Hemisphere + near-white key (shadows on) + primary rim + fill + underglow | One colored key washes the subject. |
| Fog matched to `colors.background`, near 7.5 far 16 | Unmatched fog draws a halo. |
| Radial canvas shadow plane whose opacity falls with `p` | The object has weight. |
| CSS vignette + grain | Edges hold the overlays. |

Lights: the key is `foreground`, never a saturated brand color. Colored light only on rim and underglow. See [renderer.md](renderer.md) for the exact numbers.

## Materials

Use the factories in `src/materials.js`. Exact starting values:

| Kind | Class | roughness | metalness | Extra |
|---|---|---|---|---|
| Plastic / PBT | `MeshPhysicalMaterial` | 0.34 | 0.04 | clearcoat 0.7, clearcoatRoughness 0.22, sheen 0.18 |
| Chassis coat | `MeshPhysicalMaterial` | 0.46 | 0.22 | clearcoat 0.4 |
| Brushed plate | `MeshPhysicalMaterial` | 0.32 | 0.72 | canvas `map` for cutouts |
| Smoked housing | `MeshPhysicalMaterial` | 0.42 | 0.18 | opacity 0.92 |
| Hardware | `MeshStandardMaterial` | 0.28 | 0.70 | pins, screws, USB |
| Foam | `MeshPhysicalMaterial` | 0.92 | 0 | — |
| Print / legend | `MeshBasicMaterial` | — | — | `toneMapped: false`, canvas map |

A body part with only `{ color }` on `MeshStandardMaterial` is a failed run.

## What you may not do

- Leave the keyboard example in place for a non-keyboard title
- Swap the subject for a sphere / box grid / torus "because it's cleaner"
- Delete the floor shadow or disable `shadowMap`
- Skip `RoomEnvironment` and hope the directional lights will do
- Load an HDRI, a GLTF, or drei `Environment`
- Pull the camera back past `z ≈ 4` on desktop start (the object becomes a speck)
- Auto-spin the subject (`rotation.y += delta`) — scroll rotates it a few degrees, that's all

## Check after `npm run dev`

Open the hero. Any "no" is a failed run:

- Can a stranger name the object without reading the headline?
- Is there a real shadow under it, not a dark disc?
- Do metal or clearcoated surfaces show a studio reflection?
- Are there small parts (screws, pins, a port, feet) that give it scale?
- Does type exist on the object (legends, silkscreen, a dial)?
- `window.__audit().meshes >= 40` and `shadowCasters > 0`?

Then run `scripts/shoot.mjs` against the dev server. A box grid will fail the mesh floor. A chrome sphere will fail shadow casters or the "name the object" test. Both are failed runs — restore the subject, do not patch the checker.
