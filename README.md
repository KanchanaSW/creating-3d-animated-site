# creating-3d-animated-site

A [Cursor](https://cursor.com) and [Claude Code](https://claude.com/claude-code) skill that scaffolds a **single-page 3D animated website** from a required title and optional colors. All copy, colors, and the scene recipe live in `src/config/site.ts`. A persistent Three.js WebGPU canvas sits behind six HTML bands.

Not a 2D photo + GSAP marketing page (that is creating-motion-site). Not a horizontal-scroll résumé camera (that is scroll-portfolio).

## Install

Claude Code:

```bash
git clone https://github.com/KanchanaSW/3d-animated-site-skill ~/.claude/skills/creating-3d-animated-site
```

Cursor:

```bash
git clone https://github.com/KanchanaSW/3d-animated-site-skill ~/.cursor/skills/creating-3d-animated-site
```

Or, from a local checkout, symlink into both runtimes:

```bash
chmod +x scripts/install.sh
./scripts/install.sh
```

That links:

- `~/.cursor/skills/creating-3d-animated-site` — Cursor
- `~/.claude/skills/creating-3d-animated-site` — Claude Code

Both runtimes pick up `SKILL.md` on the next session. Then, in any project:

1. Give a **title** (required). Colors are optional — hex, names, or omit them and the skill picks a mood palette.
2. Ask:

> Create a 3D animated site titled Harbor & Pine

> Create a 3D animated site titled Nova Lab, colors #0B0B0F and #7CFF6B

Title is required. The agent must ask and stop if you omit it.

## What's in the box

```
SKILL.md                         inputs, workflow, hard rules
references/content-schema.md     SiteConfig types and field rules
references/color-system.md       hex parsing + nine mood palettes + contrast floors
references/visual-system.md      band tones, type scale, derived surfaces, 3D peeking
references/section-recipes.md    copy lengths, nav, section ids
references/animations.md         Lenis, Motion, GSAP roles (HTML only)
references/webgpu.md             renderer init, import paths, fallback
references/scene.md              five recipes, camera keyframes, one Canvas
references/gotchas.md            black canvas / GLSL / OrbitControls / extra Canvas
templates/3d-site/               Vite + React + Tailwind + WebGPU starter
evals/scenarios.md               happy path / missing title / no colors / composition
scripts/check-palette.mjs        eight-check palette validator
scripts/install.sh               dual-runtime symlink
```

## What the skill builds

A vertical single page with hash links (`#hero`, `#about`, `#gallery`, `#contact`). No React Router.

The agent copies `templates/3d-site/` into the output directory, invents copy from the title, picks a scene recipe, and writes colors into `src/config/site.ts`. After generation, edit that file only.

One WebGPU canvas, full viewport, fixed behind the page. Scroll drives camera keyframes and TSL uniforms. Six HTML bands with deliberate rhythm:

| Band | Tone | Shape |
|---|---|---|
| Hero | — | type over the live scene, light scrims, masked word-by-word `display` headline |
| About | `base` | split layout, the page's one `statement` heading, stats on hairlines, a glass window into the canvas |
| Features | `surface` | numbered cards with real borders that lift on hover |
| Gallery | `base` | four glass caption tiles; scrolling them scrubs a 3D morph |
| Testimonials | `inverse` | the palette flips — a light band on a dark page |
| CTA | `base` | `primary` → `secondary` gradient panel with an `accent` bloom |

You supply six hexes and a recipe (`orb`, `lattice`, `field`, `ribbon`, `terrain`). Palettes are validated before generation:

```bash
node scripts/check-palette.mjs '#0B0A0F' '#F4F1EA' '#E8B96A' '#B4763C' '#9FC3FF' '#191620'
```

Motion stack (do not add another library):

| Library | Role |
|---|---|
| Lenis | page-level smooth scrolling |
| Motion (`motion/react`) | masked hero words, nav pill, button hover |
| GSAP ScrollTrigger | section reveals; writes scroll progress for the camera |
| Three.js WebGPU + TSL | the scene, via React Three Fiber v9 |

No photographs. The scene is procedural. For `prefers-reduced-motion`, Lenis and GSAP never start, Motion components render at their final state, and the canvas freezes after one still frame.

## After install

Restart Cursor / start a new Claude Code session so the skill is in the catalog. Give a title and ask to scaffold a 3D animated site. The agent should read `SKILL.md`, then `references/visual-system.md`, `references/content-schema.md`, `references/scene.md`, and `references/webgpu.md`, before writing config.

## Credits

- Format and skill by [Kanchana Walagambahu](https://github.com/KanchanaSW).

## License

MIT — see [LICENSE](LICENSE).
