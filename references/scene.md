# Scene

One architecture. Five still-life recipes. A studio that is always on. The agent picks a recipe; it does not invent a new scene graph and it does not strip the room.

Read [realism.md](realism.md) before editing any file under `src/scene/`.

## Pick a recipe

Classify the title. Copy the matching row. Fallback: `lattice`.

| Recipe | Title cues | Still life on screen |
|---|---|---|
| `orb` | luxe, jewelry, atelier, maison, interiors, watch, time, horology, eclipse | Pedestal, metal body, rings, jewels |
| `lattice` | lab, product, platform, ai, app, digital | Mixed-height columns on the floor |
| `field` | night, space, energy, noir, moon | Planet, ring, dust field |
| `ribbon` | fashion, motion, studio, couture | Volume tubes on curves |
| `terrain` | travel, earth, organic, garden, trail, harbor, pine | Multi-octave ground and horizon |

Write the choice as `scene: { recipe: 'orb' }` in `site.ts`. Do not add extra recipe keys.

Palette (from [color-system.md](color-system.md)) and recipe are independent. A coastal palette can sit on `terrain`; a luxe palette should sit on `orb`.

## Camera

Six poses, one per band, lerped from `scrollSnapshot.progress` (0 at the top of the page, 1 at the bottom). Implementation: `src/scene/useScrollCamera.ts`.

The camera stays in the room. Last pose `z` is ~5.5, not 8+. Look-at is `[0, -0.38, 0]` so the still life sits in the **upper half** of the hero — above the type — with the floor still in frame.

| Band | Position | Look at |
|---|---|---|
| hero | `0, 0.92, 3.65` | `0, -0.38, 0` |
| about | `1.28, 1.02, 3.35` | `0, -0.38, 0` |
| features | `0.18, 1.35, 4.55` | `0, -0.38, 0` |
| gallery | `-1.18, 0.88, 3.25` | `0, -0.38, 0` |
| stories | `0.3, 0.72, 4.95` | `0, -0.38, 0` |
| contact | `0, 1.42, 5.45` | `0, -0.38, 0` |

FOV is 36 (product-shot), not a wide demo lens. While `#gallery` is in view, `scrollSnapshot.galleryBeat` (0–1) drives a morph inside the recipe. That is the gallery — not four photographs.

Do not add OrbitControls. Do not keyframe a new pose per run.

## Studio (required)

Always mounted. Not optional per brand.

- `StudioEnvironment` — TSL gradient IBL on `scene.environmentNode`. Metals reflect this.
- `StudioSet` — cyclorama, stone apron, glossy inner disk, contact shadow.
- Lights — hemisphere + near-white key (`foreground`) + cool fill (`accent`) + warm rim/spot (`primary` / `secondary`).
- ACES tone mapping + exposure on the renderer.

Do not add an HDRI `Environment`. Do not delete the set to "see the model better".

## Recipes live in `src/scene/recipes/`

Each file exports a still life that reads `siteConfig.colors` and `scrollSnapshot.galleryBeat`. Idle drift belongs on the subject group in `Scene.tsx` (~0.045 rad/s), not on the studio, and is not duplicated five times.

Lite counts on small viewports (see each file). Do not load textures.

Materials come from `src/scene/studio/materials.ts` (`MeshPhysicalNodeMaterial`, TSL grain, clearcoat). Do not replace them with a flat `colorNode` on `MeshStandardNodeMaterial`.

## What you may change per run

- `scene.recipe` in `site.ts`
- The six hexes (which recolor lights, IBL, and materials)

## What you may not change per run

- Number of canvases
- Import paths
- Camera pose table
- Removing `StudioSet`, `StudioEnvironment`, or ACES tone mapping
- Adding a GLTF, a texture, an HDRI, or a sixth recipe "for this brand"
- Collapsing a recipe to a single primitive
