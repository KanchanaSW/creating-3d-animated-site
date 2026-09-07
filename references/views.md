# Views

The teardown is the format. The **view** is how that teardown is framed: overlay zones, camera rig, and type pairing. Five named views. Pick one per build. Do not invent a sixth overlay layout.

`siteConfig.view` is required. `main.js` reads it, sets `body.view--<id>`, loads that view’s fonts, and copies that view’s camera table. CSS does the rest. Copy and the 3D object stay in `site.js` / `subject.js`.

## The five

| View | Object zone | Hero | Chapter | Rail | Type |
|---|---|---|---|---|---|
| `dossier` | center | bottom-left poster | right-center | left-center | Bebas Neue / Outfit / IBM Plex Mono |
| `plinth` | lower third | top mast | bottom-left caption | right-center | Syne / Manrope / IBM Plex Mono |
| `vitrine` | left | right column | same right column | left-center | Barlow Condensed / Karla / IBM Plex Mono |
| `atelier` | center, three-quarter | top-left | bottom-right | bottom film strip | Big Shoulders Display / Work Sans / IBM Plex Mono |
| `folio` | right of center | left-middle | bottom caption bar | right-center | Fraunces / Source Serif 4 / IBM Plex Mono |

Meta (chrome, rail, facts, hint, colophon) stays IBM Plex Mono in every view. Display and body change.

Hero and chapter still never share the screen. That collision rule does not move.

## When to pick which

Pick from the **object**, then the title’s setting words. User `view` always wins.

| View | Object / title cues |
|---|---|
| `dossier` | machines, keyboards, tools, engines, devices, electronics. Fallback when nothing else fits. |
| `plinth` | watches, jewelry, bottles, ceramics, lamps, vessels, a single artifact on a stand |
| `vitrine` | museum, archive, collection, specimen, cabinet, exhibit, natural history |
| `atelier` | workshop, craft, maker, manufacture, leather, wood, a thing being built |
| `folio` | magazine, journal, editorial, review, press, book, type, paper |

A travel brand whose object is a sextant is `plinth`, not `dossier`. A watch manufacture is `plinth` (the watch), not `atelier` (the word manufacture). A ramen bowl is `plinth`. Night + machine is still `dossier`.

Do not default every run to `dossier`. That is how a series of sites reads as one template.

## What you write

In `src/config/site.js`:

```js
view: 'plinth',
```

One of the five strings. Invalid values fall back to `dossier` at runtime — treat that as a failed pick, not a feature.

Do not rewrite overlay HTML. Do not add a sixth zone. Do not hand-tune `.hero { left }` in `style.css` to fake a new view.

## What `views.js` owns

`templates/3d-stage/src/views.js` is the table: fonts (Google Fonts href + CSS families), camera waypoints (desktop + mobile), look-at, yaw. `setCameraRigs()` copies the active row. Do not paste a new camera table into `main.js`.

Tune start/mid/end **only** if the object’s bounds demand it, the same as before — offset the chosen view’s numbers, do not replace the view.

Last pose `z` stays under ~3.5 on desktop except `plinth`, which is allowed ~4.0 because the camera is high and the object sits in the lower third.

## Mobile (`<860px`)

All five collapse to a stacked document: hero and chapter take the left/bottom corners, rail and colophon hide. Cameras use each view’s `mobile` row (pulled back, less lateral offset). Do not fork a second app.

## Checking a run

- Can you name the view without reading `site.js`? (poster vs mast vs right-column vs film strip vs caption bar)
- Is type still off the object, just in that view’s reserved zone?
- Did fonts match the table (serif folio, condensed vitrine, geometric plinth)?
- `window.__audit().view` equals `siteConfig.view`?
- Below 860px, is the chapter still readable and the rail gone?
