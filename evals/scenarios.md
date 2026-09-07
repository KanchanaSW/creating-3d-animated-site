# Evaluation scenarios

Technique-skill checks. An agent following this skill should pass all six.

## 1. Happy path

**User:** `Create a 3D animated site titled Harbor & Pine, color #2F4F3E`

**Pass when:**

- Project is scaffolded outside the skill folder from `templates/3d-stage/`
- `src/config/site.js` has title `Harbor & Pine`
- `colors.primary` is `#2F4F3E`
- Remaining colors are derived, not left empty
- The named object is a real artifact from that world (compass, lantern, topographic instrument — **not** a box grid and **not** the keyboard example)
- `src/subject.js` exports `LAYERS`, `LAYER_WINDOWS`, `buildSubject`, `applyExplosion`
- `node scripts/check-palette.mjs` passes on the six values in `site.js`
- No `.jpg`, `.png`, `.webp`, `.gltf`, `.glb`, or `.hdr` files were written (canvas textures in JS are fine)
- `index.html` title is `Harbor & Pine`
- Overlays were not rewritten with hardcoded marketing copy
- The app imports from `three` and `three/addons/...`, not `three/webgpu`

## 2. Missing title

**User:** `Make me a fancy 3D website in teal`

**Pass when:**

- Agent asks for a title
- Agent does not scaffold a project
- Agent does not invent a title such as Untitled or Teal Studio

## 3. No colors

**User:** `Create a 3D animated site titled Night Market Ramen`

**Pass when:**

- Title is `Night Market Ramen`
- Palette comes from [color-system.md](../references/color-system.md) (`nocturnal` for night, or `solar` only if the agent argues warmth — not Tailwind default blue)
- The object is a real artifact (a ramen bowl and noren, a noodle cart, a lantern — **not** `field`, **not** a particle system, **not** the keyboard)
- `site.js` is complete (hero, 6 chapters, callouts, colophon)
- `accent` is in the primary family (≤ 30°), not a complementary "pop" color
- No image URLs and no downloaded assets

## 4. Composition

**User:** `Create a 3D animated site titled Meridian Circuit, a travel brand`

This is the scenario a weak 3D template fails: a black canvas, OrbitControls fighting scroll, and six opaque bands that hide the scene.

**Pass when:**

- Palette is `terrain` (travel cue), not a brown one-hue-with-cyan palette, and the checker passes
- Accent hue is within 30° of primary
- The object is a travel artifact (sextant, compass, field camera), modeled in `subject.js`
- Overlay zones match [visual-system.md](../references/visual-system.md): hero bottom-left, chapter right, rail left. No feature cards, no testimonials, no gallery tiles
- One canvas only — no second WebGL canvas
- No `OrbitControls`, no `ShaderMaterial`, no GLSL strings, no `three/webgpu`
- No overlay was given an opaque background that hides the canvas
- `RoomEnvironment` via `PMREMGenerator` is still in `main.js`
- `renderer.shadowMap.enabled === true`

## 5. Realism (the keyboard-as-boxes failure)

**User:** `Create a 3D animated site titled Mechanical — Inside the Keyboard`

This is the scenario the skill-built site failed: a 6×6 lattice of pastel boxes, copy about keycaps, no explosion.

**Pass when:**

- The subject is a keyboard you can name in the hero without reading the headline
- `LAYERS` includes keycaps, switches, and a case (or equivalent strata) — 4–7 layers
- Keys come from a layout table, not 36 independent boxes
- Caps use beveled `ExtrudeGeometry`, not `boxGeometry`
- Canvas textures stamp legends (and preferably a PCB/plate map)
- `window.__audit().meshes >= 40` (target 150–400) and `shadowCasters > 0`
- Scroll peels layers via `LAYER_WINDOWS`; there is no idle `rotation.y += delta`
- No `.hdr`, `.gltf`, `.glb`, and no `@react-three/drei`
- After `npm run dev`, the hero shows a real shadow and a studio reflection on coated plastic

## 6. Subject naming (the watch title)

**User:** `Create a 3D animated site titled Eclipse, a watch manufacture`

**Pass when:**

- The agent names a watch (crystal, hands, dial, movement, case / caseback) before scaffolding
- `src/subject.js` is rewritten — the keyboard example is gone
- At least four layers explode on scroll
- Small parts exist (crown, lugs, or screws)
- Dial indexes or a logo are canvas-printed
- Mesh count ≥ 40, shadow casters > 0
- `scripts/shoot.mjs --url <dev>` exits 0
- Palette is `luxe` (watch / manufacture cue) unless the user supplied colors
