# creating-3d-animated-site

A [Cursor](https://cursor.com) and [Claude Code](https://claude.com/claude-code) skill that scaffolds a **single-page 3D product teardown** from a required title and optional colors. The agent models the named object into `src/subject.js`. Copy, colors, and **view** live in `src/config/site.js`. A persistent Three.js WebGL canvas fills the viewport; overlay chapters ride a 620vh scroll track.

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

1. Give a **title** (required). Colors and view are optional — hex, names, or omit them and the skill picks a mood palette and a named view from the object.
2. Ask with one of the commands below. Title is required. The agent must ask and stop if you omit it.

**Let the skill pick the view** (from the object):

> Create a 3D animated site titled Harbor & Pine

> Create a 3D animated site titled Nova Lab, colors #0B0B0F and #7CFF6B

**Name the view** — one command per layout:

> Create a 3D animated site titled Mechanical, view dossier

> Create a 3D animated site titled Eclipse, view plinth

> Create a 3D animated site titled Cabinet of Hours, view vitrine

> Create a 3D animated site titled Northbench Atelier, view atelier

> Create a 3D animated site titled Press Marks, view folio

Colors still combine with a named view:

> Create a 3D animated site titled Eclipse, view plinth, colors #0B0A0F and #E8B96A

## What's in the box

```
SKILL.md                         inputs, workflow, hard rules
references/content-schema.md     SiteConfig shape (chapters, callouts, view)
references/color-system.md       hex parsing + ten mood palettes + contrast floors
references/views.md              five named layouts (camera + zones + type)
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
templates/3d-stage/src/views.js  five camera / type / yaw tables
evals/scenarios.md               happy path / missing title / subject naming
scripts/check-palette.mjs        eight-check palette validator
scripts/shoot.mjs                screenshot audit + mesh/shadow floors
scripts/install.sh               dual-runtime symlink
```

## What the skill builds

A vertical single page with a fixed 3D stage. No React. No React Router. Scroll peels the object apart.

The agent copies `templates/3d-stage/` into the output directory, names a real object from the title, models it in `src/subject.js`, and writes colors, view, and chapter copy into `src/config/site.js`. After generation, edit `site.js` for copy and view, `subject.js` for the object.

One WebGL canvas, full viewport, fixed. Scroll drives a single scalar `p` that moves the camera and explodes 4–7 physical layers. Overlay UI sits in reserved zones that depend on the **view**.

## Views

Five named layouts. Same teardown, different poster: camera, overlay zones, and display/body type. Meta (chrome, rail, facts) stays IBM Plex Mono. Full spec: [references/views.md](references/views.md).

If you omit `view`, the agent picks from the object (a watch is `plinth`, a keyboard is `dossier`). Do not default every run to `dossier`.

| View | Description | When to use |
|---|---|---|
| `dossier` | Centered product shot. Large hero poster bottom-left, chapter panel on the right, layer rail on the left. Bold condensed display (Bebas Neue / Outfit). Reads as a hardware teardown sheet. | Machines, keyboards, tools, engines, devices, electronics. Fallback when no other view fits. |
| `plinth` | Object sits in the lower third, camera looking down as if the piece is on a stand. Type is a wide top mast; chapter is a bottom-left caption; rail on the right. Geometric display (Syne / Manrope). | A single artifact: watches, jewelry, bottles, ceramics, lamps, vessels, perfume, a compass or lantern. |
| `vitrine` | Museum-case framing. Object parked on the left; hero and chapter stack in the same right-hand column; rail stays left. Condensed wall-label type (Barlow Condensed / Karla). | Museum, archive, collection, specimen, cabinet, exhibit, natural history — anything shown in a case rather than used as a tool. |
| `atelier` | High three-quarter workshop camera. Hero top-left, chapter bottom-right, layer rail as a bottom film strip. Industrial display (Big Shoulders Display / Work Sans). | Workshop, craft, maker, manufacture, leather, wood, a thing being built rather than displayed. |
| `folio` | Editorial page. Object sits right of center; hero is a left-middle column; chapter is a full-width bottom caption bar; rail on the right. Serif display (Fraunces / Source Serif 4). | Magazine, journal, editorial, review, press, book, type, paper — when the page should feel typeset, not like a product UI. |

Pick from the **object**, then the title’s setting words. A travel brand whose object is a sextant is `plinth`, not `dossier`. A watch manufacture is `plinth` (the watch), not `atelier` (the word manufacture). User `view` always wins.

Layout (zones and type):

| View | Object zone | Hero | Chapter | Rail | Type |
|---|---|---|---|---|---|
| `dossier` | center | bottom-left poster | right-center | left-center | Bebas Neue / Outfit |
| `plinth` | lower third | top mast | bottom-left | right | Syne / Manrope |
| `vitrine` | left | right column | right column | left | Barlow Condensed / Karla |
| `atelier` | three-quarter | top-left | bottom-right | bottom film strip | Big Shoulders Display / Work Sans |
| `folio` | right of center | left-middle | bottom caption | right | Fraunces / Source Serif 4 |

### Ask commands

**`dossier`**

> Create a 3D animated site titled Mechanical, view dossier

> Create a 3D animated site titled Meridian Circuit, view dossier, colors #0A0F10 and #F2A93B

**`plinth`**

> Create a 3D animated site titled Eclipse, view plinth

> Create a 3D animated site titled Harbor & Pine, view plinth

**`vitrine`**

> Create a 3D animated site titled Cabinet of Hours, view vitrine

> Create a 3D animated site titled Night Market Ramen, view vitrine

**`atelier`**

> Create a 3D animated site titled Northbench Atelier, view atelier

> Create a 3D animated site titled Eclipse, a watch manufacture, view atelier

**`folio`**

> Create a 3D animated site titled Press Marks, view folio

> Create a 3D animated site titled Field Notes, view folio, colors #FAF8F4 and #C2341F

You supply six hexes (or a mood is picked). You can also name a view; otherwise the agent picks from the object. The canvas is a photographed object (beveled extrudes, canvas prints, real shadows, RoomEnvironment IBL) — not a primitive in a void. Palettes are validated before generation:

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

Restart Cursor / start a new Claude Code session so the skill is in the catalog. Give a title and ask to scaffold a 3D animated site. The agent should read `SKILL.md`, then `references/subject.md`, `references/visual-system.md`, `references/views.md`, `references/content-schema.md`, `references/renderer.md`, and `references/realism.md`, before writing files.

## Credits

- Format and skill by [Kanchana Walagambahu](https://github.com/KanchanaSW).

## License

MIT — see [LICENSE](LICENSE).
