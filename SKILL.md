---
name: creating-3d-animated-site
description: Use when the user wants a new single-page 3D animated website, Three.js product teardown, scroll-driven exploded view, or a generated 3D site that looks fake, flat, or like a spinning primitive in a void. Not for 2D GSAP/photo motion sites or horizontal-scroll portfolios.
---

# Creating a 3D animated site

Scaffold the bundled Vite template, then **model the named object** into `src/subject.js` and write copy, colors, and view into `src/config/site.js`. A persistent WebGL canvas fills the viewport. Overlay chapters ride a 620vh scroll track. Scroll peels the object apart layer by layer.

## Inputs

- **Required:** `title`
- **Optional:** colors (hex or names), **view** (`dossier` | `plinth` | `vitrine` | `atelier` | `folio`), output directory (default: kebab-case title at the workspace root)

If the title is missing, ask once and stop. Do not invent a title. Do not scaffold.

## Workflow

Follow these steps in order. Do not skip.

1. Confirm the title. **Name the physical object** it refers to, and list 4–7 layers that will separate on scroll. If the title is abstract, pick the nearest real artifact and commit to it before modeling. Read [references/subject.md](references/subject.md).
2. Parse colors or choose a mood palette from [references/color-system.md](references/color-system.md). One dominant chroma against a neutral ground. A second hue only if the real object has one.
3. **Pick a view** from [references/views.md](references/views.md). User `view` wins. Otherwise pick from the object (watch → `plinth`, machine → `dossier`, exhibit → `vitrine`, workshop → `atelier`, editorial → `folio`). Do not default every run to `dossier`.
4. Validate the palette: `node scripts/check-palette.mjs <background> <foreground> <primary> <secondary> <accent> <muted>`. All checks must pass before you write any config.
5. Copy `templates/3d-stage/` to the output directory. Do not scaffold inside this skill folder.
6. **Rewrite `src/subject.js`** for the named object (data table, beveled extrudes, detail pass, canvas prints, `LAYERS` / `LAYER_WINDOWS` / `buildSubject` / `applyExplosion`). Rewrite `src/textures.js` to match. Do not ship the keyboard example unless the title is a keyboard.
7. Generate chapter and callout copy from the layers using [references/section-recipes.md](references/section-recipes.md). Write `src/config/site.js` so it satisfies [references/content-schema.md](references/content-schema.md), including `view`.
8. Set `index.html` `<title>` to the site title (also set from `site.js` at runtime).
9. Keep the template stacks. See [references/animations.md](references/animations.md) and [references/renderer.md](references/renderer.md). Do not add another library. Do not delete the light rig, PMREM, or shadow map.
10. Run `npm install && npm run dev` in the output directory.
11. From the **output directory**, run the screenshot audit in this skill folder against the dev server: `npm i -D playwright-core && node <skill-root>/scripts/shoot.mjs --url <dev-url>`. `<skill-root>` is the folder that contains this `SKILL.md`. Then check the hero against [references/visual-system.md](references/visual-system.md), [references/views.md](references/views.md), and [references/realism.md](references/realism.md). A box grid, a chrome sphere, or a spinning primitive is a failed run.
12. Tell the user: title, the object you modeled, its layers, **the view**, colors used, config path (`src/config/site.js`), and that copy is edited in `site.js` while the 3D object is edited in `subject.js`.

## What the page is

The template already composes the stage. Your job is to fill the subject and the copy, **pick a named view**, and not restyle overlays by hand. Read [references/visual-system.md](references/visual-system.md), [references/views.md](references/views.md), [references/scene.md](references/scene.md), and [references/realism.md](references/realism.md) before writing files.

- One fixed full-viewport WebGL canvas. Overlay UI in reserved zones that **depend on the view**: chrome, hero, layer rail, chapter panel, projected callouts, hint, colophon. An invisible 620vh `.scroll-track` is the only document flow.
- One named physical object, 4–7 layers, 150–400 meshes, canvas-printed details. No photographs, no GLTFs, no HDRIs.
- One scroll scalar `p` drives camera, explosion, lights, and UI gates. See [references/choreography.md](references/choreography.md).
- Palette is six hexes. View is one of five names. CSS tokens, the light rig, overlay layout, and camera bind to them. You supply the hexes, the view, and the object.

## Hard rules

- Title is required. No title → ask and stop.
- Name a real object before scaffolding. Abstract titles still get an artifact.
- Pick a named view. Do not invent a sixth overlay layout.
- User-facing copy, colors, **view**, chapters, callouts, chrome live in `src/config/site.js` only.
- The 3D object lives in `src/subject.js` + `src/textures.js`. Authored every run.
- The palette must pass `scripts/check-palette.mjs`.
- Import from `three` and `three/addons/...`. Never `three/webgpu`. Never TSL. Never `ShaderMaterial`.
- One `<canvas id="gl">`, one `WebGLRenderer`. Construct it only in `src/main.js`.
- `RoomEnvironment` via `PMREMGenerator` is required. Shadow maps are required.
- No OrbitControls. No `@react-three/drei`. No `@react-three/fiber`. No GLTF/HDRI/Pexels downloads.
- Canvas textures are required for printed surfaces. Downloaded image files are forbidden.
- Single page only. No React Router. No React.
- Keep Lenis and GSAP ScrollTrigger. Do not add Motion, R3F, or another library.
- GSAP never tweens Three objects. The only tween is `state.p`.
- `prefers-reduced-motion`: freeze on the exploded frame (`p = 1`).
- Target 150–400 meshes. Under 40 is a failed run. `window.__audit()` must report `shadowCasters > 0`.

## Common mistakes

- Shipping the keyboard example for a watch / camera / lantern title
- Picking `lattice` or any leftover recipe enum instead of modeling the object
- Hardcoding a headline in `index.html` instead of `site.js`
- Painting overlay backgrounds opaque so the canvas dies
- Putting chapter copy on top of the subject (zones exist so you don't)
- Shipping every title as `dossier` so a series of sites reads as one template
- Restyling `.hero` / `.chapter` by hand instead of picking a named view
- Inventing a complementary accent "for contrast" when the object is one chroma — that is the cyan cube on the orange keyboard
- Reaching for a dark palette when the title cues a light one
- Importing from `three/webgpu` or writing TSL
- Adding OrbitControls so "the user can inspect the model"
- Loading a GLTF or HDRI instead of building the parts table
- Deleting the shadow plane or disabling `shadowMap`
- Replacing the subject with one sphere, one box, or a grid of boxes
- Adding a second canvas
- Leaving lorem ipsum in `site.js`
- Idle-spinning the model (`rotation.y += delta`)

| Excuse | Reality |
|---|---|
| "I'll add copy in the HTML and move it later" | Copy in HTML is a failed run. Put it in `site.js` first. |
| "No title, I'll name it Untitled" | Stop and ask. Title is required. |
| "User skipped colors so I'll use Tailwind defaults" | There is no Tailwind. Pick a mood palette from `color-system.md`. |
| "The palette looks fine to me" | Run the checker. |
| "Accent should be 60° away or it looks cheap" | One chroma against neutrals. A second hue only if the object has one. |
| "Dark always looks more premium" | Five of ten moods are light. Pick by the title's cue. |
| "A lattice is a valid product visualization" | A lattice is how the last run failed. Model the object. |
| "I'll write GLSL / TSL, it's more advanced" | WebGL + PhysicalMaterial. TSL is not in this stack. |
| "OrbitControls is standard in Three.js examples" | It steals the scroll. Forbidden. |
| "A GLTF will look more real" | A GLTF in a void still looks fake. Build the parts table and keep the rig. |
| "I'll add drei Environment for realism" | `RoomEnvironment` is the IBL. Drei is forbidden. |
| "One sphere is enough, it's cleaner" | One primitive is the failure this skill prevents. |
| "I'll delete the floor to see the model better" | No shadow pool means it floats. Failed run. |
| "I'll keep the keyboard and recolor it" | Wrong object. Rewrite `subject.js`. |
| "Under 40 meshes is fine, it's stylized" | Under 40 is a sculpture. Failed run. |
| "I'll leave view off, dossier is fine" | Pick from the object. `dossier` is a machine view, not a default skin. |

**When the canvas is black, double-scrolling, or type sits on the subject:** [references/gotchas.md](references/gotchas.md) first.
