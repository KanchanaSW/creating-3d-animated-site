# Realism contract

The canvas must read as a **studio photograph**, not a Three.js hello-world. This file exists because a generated watch site shipped as a chrome sphere in a black void — and that is a failed run.

The template already implements the contract. Do not strip it. Do not replace a recipe with a single untextured primitive.

## What a passing hero looks like

At the first viewport you can name:

1. **A subject** with more than one form (body + rings / columns / planet + field / ribbons / hills).
2. **A room** — a ground plane, a contact shadow, a cyclorama. The object sits on something.
3. **Reflections** — metals show the studio, not a single white specular dot on flat plastic.
4. **Two light temperatures** — a warm key and a cooler fill or rim, plus the procedural IBL.

If you cannot name those four things, the run failed. Recolor is not a fix. Re-read [scene.md](scene.md) and restore `StudioSet` + `StudioEnvironment`.

## The set (always on)

These stay mounted in `Scene.tsx` for every recipe:

| Piece | File | Why |
|---|---|---|
| Procedural IBL | `src/scene/studio/environment.ts` | Metals need something to reflect. No HDRI download. |
| Cyclorama + floor + contact shadow | `src/scene/studio/StudioSet.tsx` | Stops the subject floating in a void. |
| Physical materials | `src/scene/studio/materials.ts` | `MeshPhysicalNodeMaterial` + TSL roughness grain, clearcoat, optional iridescence. |
| ACES tone mapping | `createWebGpuRenderer.ts` | Filmic response. Do not leave default linear. |

Lights: hemisphere + a near-white key + cool fill + warm rim/spot. Key is `foreground`, not a saturated brand color. Colored lights only on fill/rim.

## What each recipe must be

A recipe is a **still life**, not a primitive.

| Recipe | Still life |
|---|---|
| `orb` | Pedestal + main body + at least two rings + accent jewels |
| `lattice` | Columns of mixed height and material standing on the floor |
| `field` | A planet (or moon) + a ring + a dust field with size falloff |
| `ribbon` | Volume tubes on curves, not flat waving planes |
| `terrain` | Multi-octave ground, a horizon apron, one distant light |

Idle motion is a slow drift (`~0.045` rad/s) on the **subject group only**. The studio does not spin.

## What you may not do

- Delete `StudioSet` or `StudioEnvironment` "to simplify"
- Swap physical materials back to a flat `MeshStandardNodeMaterial` color
- Add `@react-three/drei` `Environment` or an HDRI / GLTF / texture download
- Leave the subject as one sphere / one box / one plane
- Pull the camera so far back the still life reads as a speck (`z` stays under ~6.2)

## Check after `npm run dev`

Open the hero. Any "no" is a failed run:

- Is there a floor or pedestal under the subject?
- Do metal surfaces show a studio reflection, not a single highlight?
- Can you see at least two distinct forms besides the main body?
- Does the scene still peek through About and Features (not a solid fill)?
- Is the motion a slow drift, not a fidget-spinner?

A GLTF without this set still looks fake. The set is what makes the page look real.
