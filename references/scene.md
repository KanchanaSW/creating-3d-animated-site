# Scene

One architecture. Five recipes. The agent picks a recipe; it does not invent a new scene graph.

## Pick a recipe

Classify the title. Copy the matching row. Fallback: `lattice`.

| Recipe | Title cues | What is on screen |
|---|---|---|
| `orb` | luxe, jewelry, atelier, maison, interiors | dielectric / metal sphere, studio lights |
| `lattice` | lab, product, platform, ai, app, digital | instanced box grid |
| `field` | night, space, energy, noir, moon | field of small instances |
| `ribbon` | fashion, motion, studio, couture | flowing TSL ribbons |
| `terrain` | travel, earth, organic, garden, trail, harbor, pine | displaced ground plane |

Write the choice as `scene: { recipe: 'orb' }` in `site.ts`. Do not add extra recipe keys.

Palette (from [color-system.md](color-system.md)) and recipe are independent. A coastal palette can sit on `terrain`; a luxe palette should sit on `orb`.

## Camera

Six poses, one per band, lerped from `scrollSnapshot.progress` (0 at the top of the page, 1 at the bottom). Implementation: `src/scene/useScrollCamera.ts`.

| Band | Position | Look at |
|---|---|---|
| hero | `0, 0.35, 5.2` | origin |
| about | `1.6, 0.8, 4.4` | origin |
| features | `0, 1.8, 6.5` | origin |
| gallery | `-1.4, 0.6, 4.0` | origin |
| stories | `0.4, -0.2, 7.2` | origin |
| contact | `0, 2.4, 8.5` | origin |

While `#gallery` is in view, `scrollSnapshot.galleryBeat` (0–1) drives a morph inside the recipe (scale pulse, displacement amount, instance spread). That is the gallery — not four photographs.

Do not add OrbitControls. Do not keyframe a new pose per run.

## Lights

Three lights, colored from config, already in `Scene.tsx`:

- Ambient fill at low intensity
- Directional key = `primary`
- Point = `accent`

Do not add an HDRI `Environment`.

## Recipes live in `src/scene/recipes/`

Each file exports a component that reads `siteConfig.colors` and `scrollSnapshot.galleryBeat`. Idle spin belongs on the parent group in `Scene.tsx`, not duplicated five times.

Lite counts on small viewports (see each file). Do not load textures.

## What you may change per run

- `scene.recipe` in `site.ts`
- The six hexes (which recolor lights and materials)

## What you may not change per run

- Number of canvases
- Import paths
- Camera pose table
- Adding a GLTF, a texture, or a sixth recipe "for this brand"
