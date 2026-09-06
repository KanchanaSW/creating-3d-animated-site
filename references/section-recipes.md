# Section recipes

Invent all copy from the site title. Tone follows the title (restaurant ≠ fintech ≠ studio). No lorem ipsum.

## Lengths

| Field | Target |
|---|---|
| `tagline` | 6–12 words — it also prints under the hero, so make it read as a line, not a slogan |
| `hero.headline` | 4–8 words, no trailing period. It renders at `display` size, so long words will dominate the screen |
| `hero.subheadline` | 18–30 words |
| `hero.eyebrow` | 1–3 words. Sits in a pill chip |
| CTA button labels | 2–4 words. `cta.button.label` is also the nav button, which is a pill — five words will break it |
| `about.body` | 2 short paragraphs, joined with `\n\n` |
| `about.title` | 4–9 words. This is the page's one `statement` heading |
| `about.stats` | exactly 3, values short enough to read at 3rem (`12`, `40`, `8`, `2014`) |
| `features.items` | exactly 3 |
| `gallery.items` | exactly 4, each with a short `title` (2–5 words) and `caption` (6–12 words) |
| `testimonials.items` | exactly 3 fictional but plausible people |

## Nav

Always include:

- Home → `#hero`
- Story → `#about`
- Work → `#gallery`
- Contact → `#contact`

Add Craft → `#features` and Stories → `#stories` when they fit the brand.

The nav also renders `cta.button` as a pill on the right, at every screen size. On mobile the links collapse and that button is the only nav action, so its label has to stand alone.

## Section ids

Match [content-schema.md](content-schema.md): `about`, `features`, `gallery`, `stories`, `contact`. Hero wrapper id is `hero`.

## Imagery

There is none. Do not search Pexels. Do not download files. The live WebGPU scene is the imagery; gallery tiles are glass captions over it. Pick the recipe in [scene.md](scene.md) so the object on screen matches the invented world (a jewelry title should not get `terrain`).
