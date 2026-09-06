---
name: creating-3d-animated-site
description: Use when the user wants a new single-page 3D animated website, Three.js WebGPU landing page, TSL/WebGPU marketing site, or a generated 3D site that looks fake, flat, or like a spinning primitive in a void. Not for 2D GSAP/photo motion sites or horizontal-scroll portfolios.
---

# Creating a 3D animated site

Scaffold the bundled Vite template, then write all copy, colors, tones, and the scene recipe into `src/config/site.ts`. Components already read that file. A persistent WebGPU canvas sits behind the HTML bands.

## Inputs

- **Required:** `title`
- **Optional:** colors (hex or names), output directory (default: kebab-case title at the workspace root)

If the title is missing, ask once and stop. Do not invent a title. Do not scaffold.

## Workflow

Follow these steps in order. Do not skip.

1. Confirm the title. Parse colors or choose a mood palette from [references/color-system.md](references/color-system.md).
2. Validate the palette with the checker in this skill folder: `node scripts/check-palette.mjs <background> <foreground> <primary> <secondary> <accent> <muted>`. All eight checks must pass before you write any config.
3. Copy `templates/3d-site/` to the output directory. Do not scaffold inside this skill folder.
4. Generate all copy from the title using [references/section-recipes.md](references/section-recipes.md).
5. Pick a scene recipe from the title using [references/scene.md](references/scene.md). Do not invent a new scene graph. Keep the studio set — read [references/realism.md](references/realism.md) before touching any scene file.
6. Write `src/config/site.ts` so it satisfies `SiteConfig` in [references/content-schema.md](references/content-schema.md), including the `tone` on each section and `scene.recipe`.
7. Set `index.html` `<title>` to the site title.
8. Keep the template stacks. See [references/animations.md](references/animations.md) and [references/webgpu.md](references/webgpu.md). Do not add another library. Do not delete `StudioSet` or `StudioEnvironment`.
9. Run `npm install && npm run dev` in the output directory.
10. Check the result against the lists at the end of [references/visual-system.md](references/visual-system.md) and [references/realism.md](references/realism.md). A chrome sphere in a black void is a failed run.
11. Tell the user: title, colors used, scene recipe, config path (`src/config/site.ts`), and that copy, colors, and the recipe are edited there.

## What the page is

The template already composes the page. Your job is to fill it, not to restyle it or rebuild the renderer. Read [references/visual-system.md](references/visual-system.md), [references/scene.md](references/scene.md), and [references/realism.md](references/realism.md) before writing config.

- One fixed full-viewport WebGPU canvas. Six HTML bands over it: hero, about, features, gallery, testimonials, CTA.
- Each band carries a `tone` — `base`, `surface`, or `inverse`. No two adjacent bands share one, and exactly one band is `inverse`.
- One `display` headline (hero), one `statement` heading (about), everything else at `heading`.
- Card surfaces, borders, and hover tints derive from the palette in CSS. You supply six hexes and a recipe, nothing else.
- The 3D scene is a procedural **studio still life** tinted from those hexes: ground, cyclorama, TSL IBL, physical materials. No photographs, no GLTFs, no HDRIs. A single primitive in a void is a failed run.

## Hard rules

- Title is required. No title → ask and stop.
- All user-facing copy, colors, nav, CTAs, and `scene.recipe` live in `src/config/site.ts` only.
- The palette must pass `scripts/check-palette.mjs`.
- Import from `three/webgpu` and `three/tsl` only. Never the default `three` entry. Never GLSL. Never `ShaderMaterial`.
- One `<Canvas>`, one `WebGPURenderer`. Construct it only in `src/scene/createWebGpuRenderer.ts`.
- No OrbitControls. No `@react-three/drei`. No GLTF/HDRI/Pexels downloads.
- Single page only. Hash links, no React Router.
- Keep Lenis, Motion (`motion/react`), and GSAP ScrollTrigger for HTML. Keep Three/TSL for 3D. Do not add another library.
- GSAP never tweens Three objects. R3F `useFrame` never owns Lenis.
- `prefers-reduced-motion`: freeze the canvas after one still frame.
- Keep `src/scene/studio/` mounted. Recipes are still lifes (see [references/realism.md](references/realism.md)). Do not reduce a recipe to one sphere, box, or plane.

## Common mistakes

- Hardcoding a headline in `Hero.tsx`
- Adding `bg-[#1c1714]` or any hand-picked surface color to a section instead of using `surface` / `raised` / `hairline`
- Giving every band the same tone, so six identical blocks stack up
- Picking an accent one hue-step from primary, so the page reads as a single color
- Reaching for a dark palette when the title cues a light one
- Importing from `three` instead of `three/webgpu`
- Writing a GLSL `ShaderMaterial` "because TSL looked harder"
- Adding OrbitControls so "the user can inspect the model"
- Loading a GLTF or HDRI instead of using the recipe table
- Deleting `StudioSet` / `StudioEnvironment` or swapping physical materials for a flat color
- Replacing a recipe with one sphere, one box, or one plane
- Adding a second Canvas as a WebGL fallback
- Leaving lorem ipsum in `site.ts`

| Excuse | Reality |
|---|---|
| "I'll add copy in the component and move it later" | Copy in JSX is a failed run. Put it in `site.ts` first. |
| "No title, I'll name it Untitled" | Stop and ask. Title is required. |
| "User skipped colors so I'll use Tailwind defaults" | Pick a mood palette from `color-system.md`. |
| "The palette looks fine to me" | Run the checker. |
| "This section needs a slightly different background" | That is what `tone` is for. |
| "Dark always looks more premium" | Five of nine moods are light. Pick by the title's cue. |
| "Router will make it more complete" | Single page only. Anchor links. |
| "I'll write GLSL, TSL is new" | TSL only. GLSL will not run on WebGPU. |
| "OrbitControls is standard in Three.js examples" | It steals the scroll. Forbidden. |
| "A GLTF will look more real" | A GLTF in a void still looks fake. Keep the studio set and the recipe still life. |
| "I'll add drei Environment for realism" | `StudioEnvironment` is the IBL. Drei is forbidden. |
| "One sphere is enough, it's cleaner" | One primitive in a void is the failure this skill prevents. Restore the still life. |
| "I'll delete the floor to see the model better" | No floor means it floats. That is a failed run. |
| "I'll add a WebGL Canvas just in case" | One Canvas. `WebGPURenderer` already falls back. |

**When the canvas is black, double-scrolling, or the scene ignores the palette:** [references/gotchas.md](references/gotchas.md) first.
