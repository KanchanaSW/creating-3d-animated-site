# creating-3d-animated-site

A [Cursor](https://cursor.com) and [Claude Code](https://claude.com/claude-code) skill that scaffolds a **single-page 3D product teardown** from a required title and optional colors. The agent models the named object into `src/subject.js`. Copy and colors live in `src/config/site.js`. A persistent Three.js WebGL canvas fills the viewport; overlay chapters ride a 620vh scroll track.

Not a 2D photo + GSAP marketing page (that is creating-motion-site). Not a horizontal-scroll résumé camera (that is scroll-portfolio). Not a spinning primitive in a void.

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
references/content-schema.md     SiteConfig shape (chapters, callouts)
references/color-system.md       hex parsing + ten mood palettes + contrast floors
references/visual-system.md      overlay zones, type scale, one-chroma rule
references/realism.md            photographed-object contract
references/section-recipes.md    copy lengths for hero / chapters / callouts
references/animations.md         Lenis + GSAP ticker roles
references/renderer.md           WebGL, ACES, PMREM RoomEnvironment, shadows
references/scene.md              one subject, no recipe enum
references/subject.md            parts-table modeling method
references/choreography.md       one scalar p, explosion windows, UI gates
references/gotchas.md            black canvas / OrbitControls / box-grid
templates/3d-stage/              Vite + vanilla Three.js + GSAP + Lenis starter
evals/scenarios.md               happy path / missing title / subject naming
scripts/check-palette.mjs        eight-check palette validator
scripts/shoot.mjs                screenshot audit + mesh/shadow floors
scripts/install.sh               dual-runtime symlink
```

## What the skill builds

A vertical single page with a fixed 3D stage. No React. No React Router. Scroll peels the object apart.

The agent copies `templates/3d-stage/` into the output directory, names a real object from the title, models it in `src/subject.js`, and writes colors plus chapter copy into `src/config/site.js`. After generation, edit `site.js` for copy and `subject.js` for the object.

One WebGL canvas, full viewport, fixed. Scroll drives a single scalar `p` that moves the camera and explodes 4–7 physical layers. Overlay UI sits in reserved corners:

| Zone | Where |
|---|---|
| Hero | bottom-left, off after the first beat |
| Layer rail | left-center |
| Chapter panel | right-center, one layer at a time |
| Callouts | projected onto the object |
| Hint / colophon | bottom-center / bottom-right |

You supply six hexes. The canvas is a photographed object (beveled extrudes, canvas prints, real shadows, RoomEnvironment IBL) — not a primitive in a void. Palettes are validated before generation:

```bash
node scripts/check-palette.mjs '#0D0D0D' '#F5F5F5' '#FF6B35' '#E2703A' '#FF6B35' '#1F1F1F'
```

Motion stack (do not add another library):

| Library | Role |
|---|---|
| Lenis | page-level smooth scrolling |
| GSAP ScrollTrigger | the one tween of `p` from 0 → 1 |
| Three.js WebGL | the subject, via `frameFromProgress(p)` |

No photographs. The subject is procedural. For `prefers-reduced-motion`, the scrub never starts and the canvas freezes on the exploded frame.

## After install

Restart Cursor / start a new Claude Code session so the skill is in the catalog. Give a title and ask to scaffold a 3D animated site. The agent should read `SKILL.md`, then `references/subject.md`, `references/visual-system.md`, `references/content-schema.md`, `references/renderer.md`, and `references/realism.md`, before writing files.

## Credits

- Format and skill by [Kanchana Walagambahu](https://github.com/KanchanaSW).

## License

MIT — see [LICENSE](LICENSE).
