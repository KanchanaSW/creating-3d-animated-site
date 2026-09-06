# Visual system

What a generated page is, in order. The template implements all of it; this file exists so you can tell whether a run came out right, and so you do not undo it by hand-styling a section.

## The page

One WebGPU canvas, `position: fixed; inset: 0; z-index: 0`. HTML bands sit at `z-index: 10` and are mostly translucent so the scene remains the photograph.

| Band | id | Tone | Shape |
|---|---|---|---|
| Hero | `hero` | — | live scene, light scrims, `display` headline masked in by word |
| About | `about` | `base` | text split with a glass window into the canvas, the page's one `statement` heading, stats on hairlines |
| Features | `features` | `surface` | three bordered cards that lift on hover, numbered `01`–`03` |
| Gallery | `gallery` | `base` | four glass caption tiles (wide, narrow / narrow, wide); scroll scrubs a 3D morph |
| Testimonials | `stories` | `inverse` | the light band on a dark page, or the dark band on a light one — more opaque so quotes stay readable |
| CTA | `contact` | `base` | `primary` → `secondary` gradient panel with an `accent` bloom |
| Footer | — | `surface` | brand and links |

## Tone

`tone` is a per-section field in `site.ts`, typed as `'base' | 'surface' | 'inverse'`. `Band.tsx` maps it to classes; no section sets its own background.

- `base` — a light wash of the page background (`bg-background/25`) so the canvas peeks through.
- `surface` — derived step with hairline rules, at ~80% opacity plus a hint of blur.
- `inverse` — swaps `background` and `foreground` outright and re-derives every token beneath it, so `primary` stays legible inside. Keep this band close to opaque.

Rules, in priority order:

1. No two adjacent bands share a tone.
2. Exactly one `inverse` band per page. It is normally `stories`.
3. `surface` appears at most twice.

The defaults in the table already satisfy this. If you change one tone, re-check rule 1.

Do not paint hero, about, or gallery fully opaque. That hides the canvas and the run has failed.

## Type scale

Set in `@theme`, fluid, four steps with real jumps between them. Use the token, never `text-4xl sm:text-5xl`.

| Token | Size | Used by |
|---|---|---|
| `text-display` | `clamp(3rem, 9vw, 8rem)` | hero headline only |
| `text-statement` | `clamp(2.25rem, 5.2vw, 4.5rem)` | exactly one section heading per page — the About heading |
| `text-heading` | `clamp(1.75rem, 3.2vw, 3rem)` | every other section heading |
| `text-sub` | `clamp(1.05rem, 1.5vw, 1.375rem)` | lead paragraphs, card titles, gallery captions |
| `text-micro` | `0.6875rem`, `0.18em` tracking | eyebrows, stat labels, credits, badges — always with `font-mono` |

The hero headline roughly doubles between mobile and desktop. That jump is what makes the page read as designed rather than as a stack of sections.

## Derived surfaces

`src/index.css` mixes these from the two page colors. Use them; do not hand-pick equivalents.

| Token | Mix | Used by |
|---|---|---|
| `surface` | background 91% + foreground | `surface` bands, footer, quote cards |
| `raised` | background 85% + foreground | feature cards |
| `hairline` | background 78% + foreground | every border and rule on the page |

## Depth

Three devices, all already in the template:

- **Canvas** — the 3D scene is the photograph. Hero scrims are lighter than a photo site so it survives under type.
- **Grain** — a fixed SVG noise layer at 4.5% over the whole page.
- **Glow** — `.glow` paints two soft radial fields from `primary` and `accent` on the hero and about band.

## Accent roles

`accent` must appear at least twice in HTML (the second radial in `.glow`, and the bloom on the CTA panel) and once in the scene (a point light or emissive). A palette whose accent renders nowhere is a failed run.

## Checking a run

Open the page and look for these. Any "no" is a failed run, not a taste difference.

- Is the 3D recipe readable in the hero — not a black rectangle?
- Do later bands still show some of the scene, except the inverse quotes?
- Do the feature cards have a visible edge against their section?
- Is the hero headline at least twice the size of the section headings?
- Do two different hues appear on screen at once (HTML and the scene)?
- Does scrolling move the camera rather than spinning the model with the mouse?
