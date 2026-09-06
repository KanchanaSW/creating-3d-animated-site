# Content schema

`src/config/site.ts` is the only file a user should edit to change copy, colors, or the 3D recipe. Components read `siteConfig`. They never contain marketing headlines, body copy, button labels, or a hardcoded recipe.

## Types

Import `SiteConfig` from `src/types/site.ts`. The generated `siteConfig` object must satisfy that type.

### Required

| Field | Notes |
|---|---|
| `title` | Site name. Also used for `index.html` and `document.title`. |
| `tagline` | Short supporting line (6–12 words). |
| `colors` | All six hex keys: `background`, `foreground`, `primary`, `secondary`, `accent`, `muted`. |
| `scene.recipe` | One of `orb`, `lattice`, `field`, `ribbon`, `terrain`. See [scene.md](scene.md). |
| `nav` | Hash links only. Hrefs must match section ids. |
| `hero` | Eyebrow, headline, subheadline, primary CTA. `secondaryCta` is optional. No image. |
| `about` | `id` must be `about`. Include body and stats. `tone: 'base'`. No image. |
| `features` | `id` must be `features`. Exactly 3 items. `tone: 'surface'`. |
| `gallery` | `id` must be `gallery`. Exactly 4 items (`title` + `caption`). `tone: 'base'`. |
| `testimonials` | `id` must be `stories`. Exactly 3 items. `tone: 'inverse'`. |
| `cta` | `id` must be `contact`. `tone: 'base'`. |
| `footer` | Blurb plus links. |

### Section tone

Every section except the hero and footer takes `tone: 'base' | 'surface' | 'inverse'`. Write it explicitly even when it matches the default — the sequence is the page's rhythm, and it should be visible in the config.

The default sequence above satisfies the contract in [visual-system.md](visual-system.md): no two adjacent bands share a tone, and exactly one is `inverse`. If you change one, re-check both rules.

### Optional

- `hero.secondaryCta`
- `testimonials.eyebrow`

### Forbidden fields

Do not add `image`, `src`, `photographer`, GLTF paths, HDRI URLs, or extra recipe parameters the template does not read.

## Nav hashes

Use these ids and matching `href` values:

| Section | `id` | `href` |
|---|---|---|
| Hero | `hero` | `#hero` |
| About | `about` | `#about` |
| Features | `features` | `#features` |
| Gallery | `gallery` | `#gallery` |
| Testimonials | `stories` | `#stories` |
| CTA | `contact` | `#contact` |

## Generation rules

- Invent all copy from the user's title. No lorem ipsum. No `TODO` copy.
- Do not move copy into JSX after generating it.
- Do not add fields the components do not read.
- Keep hex colors as `#RRGGBB`, and run `scripts/check-palette.mjs` before writing them.
- Pick `scene.recipe` from the cue table in [scene.md](scene.md). Do not invent a sixth recipe.
