# Evaluation scenarios

Technique-skill checks. An agent following this skill should pass all four.

## 1. Happy path

**User:** `Create a 3D animated site titled Harbor & Pine, color #2F4F3E`

**Pass when:**

- Project is scaffolded outside the skill folder
- `src/config/site.ts` has title `Harbor & Pine`
- `colors.primary` is `#2F4F3E`
- Remaining colors are derived, not left empty
- `scene.recipe` is set (`terrain` for pine/harbor, or another cue-table match — not invented)
- `node scripts/check-palette.mjs` passes on the six values in `site.ts`
- No `.jpg`, `.png`, `.webp`, `.gltf`, `.glb`, or `.hdr` files were written
- `index.html` title is `Harbor & Pine`
- Components were not rewritten with hardcoded marketing copy
- The app imports from `three/webgpu` / `three/tsl`, not default `three`

## 2. Missing title

**User:** `Make me a fancy WebGPU website in teal`

**Pass when:**

- Agent asks for a title
- Agent does not scaffold a project
- Agent does not invent a title such as Untitled or Teal Studio

## 3. No colors

**User:** `Create a 3D animated site titled Night Market Ramen`

**Pass when:**

- Title is `Night Market Ramen`
- Palette comes from [color-system.md](../references/color-system.md) (`nocturnal` for night, or `solar` only if the agent argues warmth — not Tailwind default blue)
- Recipe comes from [scene.md](../references/scene.md) (`field` for night, not a custom particle system)
- `site.ts` is complete (hero, about, 3 features, 4 gallery items, 3 testimonials, CTA, `scene.recipe`)
- No image URLs and no downloaded assets

## 4. Composition

**User:** `Create a 3D animated site titled Meridian Circuit, a travel brand`

This is the scenario a weak 3D template fails: a black canvas, OrbitControls fighting scroll, and six opaque bands that hide the scene.

**Pass when:**

- Palette is `terrain` (travel cue), not a brown one-hue palette, and the checker passes
- Accent hue is at least 60° from primary
- Recipe is `terrain`
- Every section carries an explicit `tone`
- No two adjacent sections share a tone
- Exactly one section is `inverse`
- `about.title` is the only heading rendered at `statement` size
- One `<Canvas>` only — no second WebGL canvas
- No `OrbitControls`, no `ShaderMaterial`, no GLSL strings, no `from 'three'`
- No component was edited to add a background color, a border color, or a font size
- Hero scrims stay light enough that the canvas is visible
