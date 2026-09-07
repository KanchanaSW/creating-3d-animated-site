# Scene

One architecture. One named subject. A light rig that is always on.

The agent **models the object in the title**. It does not pick a recipe from an enum. The old `orb | lattice | field | ribbon | terrain` table is gone — those still lifes are what made a keyboard ship as a box grid.

Read these before writing any scene file:

1. [subject.md](subject.md) — how to name, layer, and build the object into `src/subject.js`
2. [renderer.md](renderer.md) — WebGL, ACES, PMREM `RoomEnvironment`, shadow maps, the five-light rig
3. [choreography.md](choreography.md) — one scrubbed scalar `p`, camera arc, explosion windows, overlay gates
4. [realism.md](realism.md) — the pass/fail photograph contract

## What is on screen

- One fixed full-viewport canvas (`#stage > #gl`).
- The subject from `buildSubject({ colors })`, sitting in a fogged room with a contact-shadow pool.
- Overlay UI in reserved corners (hero, chapter, rail, hint, colophon). The object keeps the center.

## What you write per run

- `src/subject.js` — the whole object. Layers, table, bevels, canvas prints, explode offsets.
- `src/textures.js` — canvas generators for whatever is printed on that object.
- `src/config/site.js` — colors, chapter copy, callouts. Recolors lights and materials.

## What you do not write per run

- A second canvas
- A new renderer
- A new camera-pose table (tune start/mid/end only if the object's bounds demand it)
- A sixth overlay that sits on the subject
- A GLTF, HDRI, or image download
- `OrbitControls`, drei, R3F, WebGPU, TSL

## Camera (do not invent a new table)

FOV 32. Three waypoints, pointer parallax, look-at near the origin. Full numbers live in [choreography.md](choreography.md). Last pose `z` stays under ~3.5 on desktop — past that the object is a speck.

## Studio (required)

Always mounted in `main.js`. Not optional per brand.

- `RoomEnvironment` via `PMREMGenerator` at intensity 0.55
- Hemisphere + near-white shadow-casting key + primary rim + fill + underglow
- Fog matched to `colors.background`
- Radial canvas shadow plane
- CSS vignette + grain

Do not add an HDRI. Do not delete the shadow plane to "see the model better".
