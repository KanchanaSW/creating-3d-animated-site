# Visual system

What a generated page is, in order. The template implements all of it; this file exists so you can tell whether a run came out right, and so you do not undo it by stacking HTML bands over the subject.

## The page

One WebGL canvas, `position: fixed; inset: 0; z-index: 0`. Overlay UI is `position: fixed` in reserved **zones**. An invisible `.scroll-track` at 620vh is the only document flow. Copy never scrolls as a column of bands. Overlay **zones move with the view** — read [views.md](views.md) before assuming the dossier corners.

## Default zones (`dossier`)

| Zone | Where | Role |
|---|---|---|
| `#stage` | full viewport | canvas + vignette + grain |
| `.chrome` | top edge | mark, wordmark, badge |
| `.hero` | bottom-left | eyebrow, display headline, subtitle, lede. Off after `p > 0.08` |
| `.rail` | left-center | layer index. Hidden under 860px |
| `.chapter` | right-center | index, title, kicker, copy, body, three facts. On for `0.1 < p < 0.97` |
| `.callouts` | over the subject | projected labels, one at a time |
| `.hint` | bottom-center | scroll cue. Off after `p > 0.1` |
| `.colophon` | bottom-right | credits. On after `p > 0.88` |

The other four views keep the same elements and the same gates. They change *where* those elements sit and where the camera parks the object:

| View | Object | Hero | Chapter | Rail |
|---|---|---|---|---|
| `dossier` | center | bottom-left poster | right-center | left-center |
| `plinth` | lower third | top mast | bottom-left | right-center |
| `vitrine` | left | right column | right column | left-center |
| `atelier` | three-quarter center | top-left | bottom-right | bottom film strip |
| `folio` | right of center | left-middle | bottom caption bar | right-center |

The subject keeps the view’s **object zone**. If a headline sits on the object, the camera start is wrong for that view or the hero is too wide — fix the camera, do not add a scrim.

Hero and chapter never share the screen. That is the collision rule.

## Type scale

Three families, loaded per view (see [views.md](views.md)). Use the class, never a one-off `font-size`. CSS variables `--font-display`, `--font-body`, `--font-meta` are set from `views.js`.

| Role | Default (`dossier`) | Size | Tracking | Case |
|---|---|---|---|---|
| Display (hero h1, chapter h2) | Bebas Neue | clamp 72–148px / 40–58px | 0.02–0.04em | default |
| Body (lede, copy, body, callout note) | Outfit 300–400 | 13–15px | normal | sentence |
| Meta (chrome, eyebrow, kicker, facts, rail, hint, colophon) | IBM Plex Mono | 10–11px | 0.12–0.28em | **uppercase** |

Meta stays IBM Plex Mono in every view. Display and body follow the view table. Folio and plinth run a smaller display size so the mast/caption does not eat the object.

The hero headline is at least twice the chapter title in `dossier` and `atelier`. In `folio` the chapter is a caption bar — the jump is smaller on purpose.

## Color tokens

Set as CSS variables from `siteConfig.colors` at boot (`--ink`, `--steel`, `--ember`, `--paper`, plus dim/faint mixes). Use them. Do not hand-pick a card color.

| Token | Source | Use |
|---|---|---|
| `--ink` | `background` | page, fog, canvas clear |
| `--paper` | `foreground` | type, key light |
| `--ember` | `primary` | mark, eyebrows, rail current, facts dashes, rim light |
| `--steel` | `muted` | quiet fills |
| `--paper-dim` | foreground 55% | lede, body, chrome |
| `--paper-faint` | foreground 18% | rules, inactive rail |

One dominant chroma (`primary` / `--ember`) against a neutral ground. `accent` may equal `primary`. A second hue appears only if the real object has one (a blue steel on an otherwise ember board). Inventing a complementary accent "for contrast" is how the last run grew a cyan cube.

## Depth

Three devices, all already in the template:

- **Canvas** — the object is the photograph. No hero scrim, no band wash. Vignette only, at the edges where type lives.
- **Grain** — SVG fractal noise at 7% overlay on `#stage`.
- **Shadow pool** — canvas radial under the object, opacity falling with `p`. Plus a real shadow map.

Do not add `backdrop-blur` panels, glass cards, or a numbered feature grid. Those belong to the old band template and they sit on the subject.

## Checking a run

Open the page and look for these. Any "no" is a failed run, not a taste difference.

- Can you name the 3D object in one word without reading the headline?
- Does the subject sit in that view’s object zone with type in the reserved corners, not over it?
- Does the hero headline read (no wash, no overlap with the object)?
- Can you tell `dossier` from `plinth` from `folio` without opening `site.js`?
- Do metal / coated surfaces show a studio reflection?
- Is there a real shadow under the object?
- Does scrolling peel layers rather than spin the model?
- Does the chapter panel appear only after the hero leaves?
- Are facts set in mono with an ember dash, not as SaaS stat counters?
- Is there exactly one chroma on screen besides ink and paper, unless the object itself has two?
- `window.__audit().meshes >= 40` and `shadowCasters > 0`?
