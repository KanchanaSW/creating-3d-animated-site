# Content schema

`src/config/site.js` is the only file a user should edit to change copy or colors. `src/main.js` reads `siteConfig` and hydrates every overlay. Overlays never contain marketing headlines of their own.

The 3D object is **not** in this file. It lives in `src/subject.js`. See [subject.md](subject.md).

## Shape

Export `siteConfig` from `src/config/site.js`.

### Required

| Field | Notes |
|---|---|
| `title` | Site name. Also used for `index.html` and `document.title`. |
| `tagline` | Short supporting line (6–12 words). Goes in the description meta. |
| `mark` | 2–3 letter stamp in the chrome box. |
| `wordmark` | Word next to the mark. Usually the first word of the title. |
| `badge` | Short chrome-right label (form factor, year, a spec — not a scroll %). |
| `hint` | Scroll cue, 2–4 words (`Scroll to disassemble`). |
| `colors` | All six hex keys: `background`, `foreground`, `primary`, `secondary`, `accent`, `muted`. |
| `hero` | `eyebrow`, `headline`, `subtitle`, `lede`. No image. |
| `chapters` | Exactly 6. First is assembled (`at: 0`), last is exploded (`at: 0.94`). The middle four match `LAYERS` in `subject.js`. |
| `callouts` | 4–6 items. `anchor` must exist on `subject.userData.anchors`. |
| `colophon` | `title`, `fine` (layer list), `note`. |

### Chapter

```js
{
  id: 'keycaps',     // matches a LAYERS id, or 'assembled' / 'exploded'
  at: 0.22,          // p where this chapter becomes current
  index: '02',
  title: 'Keycaps',
  kicker: 'The only surface you touch',
  copy: 'One or two sentences.',
  body: 'A short paragraph.',
  facts: ['three', 'short', 'specs'],
}
```

Default `at`: `0, 0.22, 0.4, 0.62, 0.8, 0.94`. Do not bunch them.

### Callout

```js
{
  layer: 'keycaps',
  from: 0.24,
  to: 0.44,
  name: 'Keycap',
  note: 'PBT shell · 1.5 mm · printed legends',
  anchor: 'keycaps',
}
```

`from`/`to` sit inside that layer's explosion window, slightly delayed.

### Colors

See [color-system.md](color-system.md). One dominant chroma against a neutral ground. `accent` may equal `primary`.

### Forbidden fields

Do not add `image`, `src`, `photographer`, GLTF paths, HDRI URLs, `scene.recipe`, `nav`, `tone`, testimonials, or a gallery of tiles. Those belonged to the old band template.

## Generation rules

- Invent all copy from the user's title and the layers you named. No lorem ipsum. No `TODO` copy.
- Do not move copy into `index.html` after generating it. The HTML file is a shell of `data-ui` hooks.
- Do not add fields `main.js` does not read.
- Keep hex colors as `#RRGGBB`, and run `scripts/check-palette.mjs` before writing them.
- Chapter `id`s in the middle of the list must equal `LAYERS` in `subject.js`.
