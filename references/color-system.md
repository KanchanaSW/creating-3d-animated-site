# Color system

Produce six hexes for `siteConfig.colors`. The template derives everything else — card surfaces, hairlines, hover tints, the inverse band, the CTA gradient — from those six with `color-mix` in `src/index.css`. The WebGPU scene tints lights and materials from the same six.

So the six are not a decoration budget. They are the whole page and the whole scene.

## What each color does

| Token | HTML | 3D |
|---|---|---|
| `background` | the page, plus text on top of `primary` (buttons, CTA panel) | renderer clear color and fog |
| `foreground` | body copy, headings, the inverse band's background | unused in the scene |
| `primary` | CTA buttons, stat values, eyebrow rules, hero glow | main object / key light |
| `secondary` | the far end of the CTA gradient — read as a pair with `primary` | rim light / secondary instances |
| `accent` | the second glow in the hero and about bands, CTA panel highlight | emissive / point light |
| `muted` | reserved tint for chips and inactive states | fill light |

`surface`, `raised`, and `hairline` are **derived in CSS**. Never invent a card color, a border color, or a "slightly lighter background" — you will get it wrong on light palettes and flatten the page.

## Floors

Every palette must pass all eight:

```bash
node scripts/check-palette.mjs <background> <foreground> <primary> <secondary> <accent> <muted>
```

| Check | Floor | Why |
|---|---|---|
| `foreground` on `background` | ≥ 7.0 | body copy is set at 70% opacity |
| `primary` on `background` | ≥ 3.0 | eyebrow rules and stat values |
| `background` on `primary` | ≥ 4.5 | button labels are `background`-colored |
| `accent` on `background` | ≥ 3.0 | accent is a real element, not decoration |
| `accent` hue vs `primary` hue | ≥ 60° | one-hue pages read as unfinished |
| `secondary` hue vs `primary` hue | ≤ 60° | they form the CTA gradient |
| `primary` saturation | ≥ 0.15 | unless it is a near-black editorial primary |
| `muted` vs `background` contrast | 1.05–2.2 | a tint, not a second background |

The 60° accent rule is the one that matters most. A brown page with a beige accent passes every contrast test and still looks dead.

## Workflow

1. **No colors given** — classify the title into one mood below and copy that row exactly. Do not improvise a palette when a mood matches.
2. **One hex** — treat it as `primary`. Take the mood palette closest to that hue, then swap in the user's hex as `primary` and adjust `secondary` to sit within 60° of it. Run the checker.
3. **Two hexes** — `primary` and `secondary`. Derive the rest from the nearest mood, keep the accent 60°+ away.
4. **Three or more** — `primary`, `secondary`, `accent` in order. Derive `background`, `foreground`, `muted`.
5. **Named colors** (`sage`, `gold`, `teal`) — resolve to hex, then follow the step above.

In every branch, run the checker before writing `site.ts`. If a check fails, move the offending color, not the floor.

## Mood palettes

All nine pass the checker.

| Mood | Title cues | background | foreground | primary | secondary | accent | muted |
|---|---|---|---|---|---|---|---|
| nocturnal | night, noir, moon, space, after dark | `#08090D` | `#E9EDF7` | `#6D8BFF` | `#A78BFA` | `#FFB454` | `#141826` |
| studio | lab, digital, product, app, ai, platform | `#0A0A0C` | `#EDEFF5` | `#7C5CFF` | `#3AC8FF` | `#C6F24E` | `#15161C` |
| luxe | gold, atelier, maison, jewelry, interiors | `#0B0A0F` | `#F4F1EA` | `#E8B96A` | `#B4763C` | `#9FC3FF` | `#191620` |
| terrain | travel, journey, trail, expedition, outdoors | `#0A0F10` | `#E9F1EE` | `#F2A93B` | `#E2703A` | `#4FD1C5` | `#121A1B` |
| solar | sun, citrus, energy, sport, market | `#FFF8F0` | `#171310` | `#C2410C` | `#FFB020` | `#0E7C6B` | `#FFE6D0` |
| botanic | garden, green, earth, organic, farm | `#F6F4EE` | `#16211A` | `#2F6B4F` | `#8FB08C` | `#C2703A` | `#E3E1D6` |
| coastal | sea, wave, harbor, ocean, island | `#F2F7F9` | `#0A2028` | `#0C6E86` | `#4CC9E8` | `#D14A22` | `#DCE9EE` |
| bloom | beauty, wellness, floral, care, salon | `#FFF7F5` | `#1B1114` | `#BE2F5B` | `#F2A0B5` | `#2F6B5A` | `#F7E3E4` |
| editorial | magazine, journal, press, type, review | `#FAF8F4` | `#12110F` | `#16150F` | `#C2341F` | `#2F4BFF` | `#E9E4DA` |

Fallback when no cue matches: `studio`.

Five of the nine are light. Dark is not the default — reach for `nocturnal`, `studio`, `luxe`, or `terrain` only when the title actually cues night, software, luxury, or wilderness. A bakery is `solar`, not `luxe`.

Scene recipe is chosen separately from [scene.md](scene.md). A botanic palette can still sit on a `terrain` recipe; do not force every green title onto a dark studio scene.

## Common failures

| Symptom | Cause | Fix |
|---|---|---|
| Page reads as one flat brown or one flat navy | accent sits within 60° of primary | move the accent to the opposite side of the wheel |
| Cards vanish into the section | a hand-picked card color instead of the derived `surface`/`raised` | delete it; use the token |
| Button label unreadable | `background` on `primary` under 4.5 | darken or lighten `primary`, not the label |
| Everything is dark because dark looks premium | mood picked by taste, not by title cue | re-read the cue column |
| Canvas ignores the brand | recipe materials hardcoded to white/orange | bind TSL color nodes to `siteConfig.colors` |
