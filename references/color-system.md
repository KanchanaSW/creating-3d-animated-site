# Color system

Produce six hexes for `siteConfig.colors`. The template binds CSS tokens, fog, lights, and materials to those six. They are the whole page and the whole scene.

## What each color does

| Token | HTML | 3D |
|---|---|---|
| `background` | page, vignette, `--ink` | renderer clear, fog, chassis |
| `foreground` | body copy, headlines, `--paper` | key / fill light, light plastics |
| `primary` | mark, eyebrows, current rail, fact dashes, `--ember` | rim light, underglow, accent parts |
| `secondary` | a darker/lighter sibling of `primary` (trim, hover) | optional darker metal / secondary trim |
| `accent` | may equal `primary` | emissive stems, glow ring. A **second hue only if the real object has one** |
| `muted` | quiet fills, `--steel` | spacebar, housings, dark caps |

One dominant chroma against a neutral ground. That is the Mechanical recipe (ink, paper, steel, ember) and it is the look this skill is aiming at.

`accent` **may be the same hex as `primary`**. Forcing a complementary accent "for contrast" is how a keyboard site grew a lone cyan cube. If the object itself has a second chroma (a blue steel back on a gold watch), put it on `accent` and use it on that part — not as a stray mesh.

## Floors

Every palette must pass:

```bash
node scripts/check-palette.mjs <background> <foreground> <primary> <secondary> <accent> <muted>
```

| Check | Floor | Why |
|---|---|---|
| `foreground` on `background` | ≥ 7.0 | lede and body sit at ~55% opacity |
| `primary` on `background` | ≥ 3.0 | eyebrows, rail, dashes |
| `background` on `primary` | ≥ 4.5 | mark box is `primary` on `background`; keep the reverse readable too |
| `accent` on `background` | ≥ 3.0 | if accent equals primary this is the same check |
| `secondary` hue vs `primary` hue | ≤ 30° | they are a family, not a pair of brand colors |
| `accent` hue vs `primary` hue | ≤ 30° | no invented complements. A second object chroma is hardcoded on that part in `subject.js`, not forced into the six hexes |
| `primary` saturation | ≥ 0.15 | unless it is a near-black editorial primary |
| `muted` vs `background` contrast | 1.05–2.2 | a tint, not a second background |

The 30° family rule is the one that matters most. A brown page with a cyan accent passes every contrast test and still looks like a template.

## Workflow

1. **No colors given** — classify the title into one mood below and copy that row exactly. Do not improvise a palette when a mood matches.
2. **One hex** — treat it as `primary`. Take the mood palette closest to that hue, then swap in the user's hex as `primary`, set `accent` to the same hex, and keep `secondary` within 30°. Run the checker.
3. **Two hexes** — `primary` and `secondary` if they are a family. If the second hex is a different object chroma (blue steel on a gold watch), keep `accent = primary`, keep `secondary` within 30°, and put the second chroma on that one part in `subject.js`.
4. **Three or more** — `primary`, `secondary`, `accent` in order. Derive `background`, `foreground`, `muted`. If `accent` is more than 30° from `primary`, snap `accent` to `primary` and use the far hex only on the mesh that actually has that color.
5. **Named colors** (`sage`, `gold`, `teal`) — resolve to hex, then follow the step above.

In every branch, run the checker before writing `site.js`. If a check fails, move the offending color, not the floor.

## Mood palettes

All ten pass the checker. Each is **one chroma** plus neutrals. `accent` equals `primary`.

| Mood | Title cues | background | foreground | primary | secondary | accent | muted |
|---|---|---|---|---|---|---|---|
| nocturnal | night, noir, moon, space, after dark | `#08090D` | `#E9EDF7` | `#6D8BFF` | `#8BA4FF` | `#6D8BFF` | `#141826` |
| studio | lab, digital, product, app, ai, platform | `#0A0A0C` | `#EDEFF5` | `#7C5CFF` | `#9B84FF` | `#7C5CFF` | `#15161C` |
| luxe | gold, atelier, maison, jewelry, interiors, watch | `#0B0A0F` | `#F4F1EA` | `#E8B96A` | `#B4763C` | `#E8B96A` | `#191620` |
| terrain | travel, journey, trail, expedition, outdoors | `#0A0F10` | `#E9F1EE` | `#F2A93B` | `#E2703A` | `#F2A93B` | `#121A1B` |
| ember | mechanical, machine, tool, keyboard, hardware | `#0D0D0D` | `#F5F5F5` | `#FF6B35` | `#E2703A` | `#FF6B35` | `#1F1F1F` |
| solar | sun, citrus, energy, sport, market | `#FFF8F0` | `#171310` | `#C2410C` | `#E07020` | `#C2410C` | `#FFE6D0` |
| botanic | garden, green, earth, organic, farm | `#F6F4EE` | `#16211A` | `#2F6B4F` | `#4E8A6A` | `#2F6B4F` | `#E3E1D6` |
| coastal | sea, wave, harbor, ocean, island | `#F2F7F9` | `#0A2028` | `#0C6E86` | `#1590A8` | `#0C6E86` | `#DCE9EE` |
| bloom | beauty, wellness, floral, care, salon | `#FFF7F5` | `#1B1114` | `#BE2F5B` | `#D45C7A` | `#BE2F5B` | `#F7E3E4` |
| editorial | magazine, journal, press, type, review | `#FAF8F4` | `#12110F` | `#C2341F` | `#A32818` | `#C2341F` | `#E9E4DA` |

Fallback when no cue matches: `ember` if the object is hardware, else `studio`.

Five of the ten are light. Dark is not the default — reach for `nocturnal`, `studio`, `luxe`, `terrain`, or `ember` only when the title actually cues night, software, luxury, wilderness, or machines. A bakery is `solar`, not `luxe`.

The subject is chosen separately from [subject.md](subject.md). A botanic palette still models a real object (a seed drill, a watering can), not a terrain recipe.

## Common failures

| Symptom | Cause | Fix |
|---|---|---|
| Page reads as a template with a random second color | accent sits far from primary without an object reason | set `accent` to `primary` |
| Cyan cube on an orange machine | old 60° accent rule | delete the second hue |
| Button / mark unreadable | `primary` on `background` under 3 | darken or lighten `primary` |
| Everything is dark because dark looks premium | mood picked by taste, not by title cue | re-read the cue column |
| Canvas ignores the brand | materials hardcoded to white/orange | bind factories to `siteConfig.colors` |
