# Choreography

One scrubbed scalar `p ∈ [0, 1]` drives the camera, the explosion, the lights, and the overlay UI. GSAP never tweens a Three object. There is no second timeline.

## Loop

```
wheel / trackpad / touch
  → Lenis (autoRaf: false, lerp 0.12)
  → ScrollTrigger.update
  → gsap.to(state, { p: 1, scrub: 0.35 })   // the only tween
  → gsap.ticker
       lenis.raf(t)
       frameFromProgress(state.p)
       renderer.render(scene, camera)
```

`gsap.ticker.lagSmoothing(0)` so frames are not skipped. Do not wrap Lenis in its own `requestAnimationFrame`.

The scroll distance is the invisible `.scroll-track` at **620vh**. That is the only document flow. Every piece of copy is `position: fixed`.

## `frameFromProgress(p)`

Implemented in `src/main.js`. Keep this shape:

```js
function frameFromProgress(p) {
  camera.position.lerpVectors(camStart, camMid, smooth(p * 1.15))
  camera.position.lerp(camEnd, smooth(Math.max(0, p - 0.45) / 0.55))
  camera.position.x += pointer.x * 0.16
  camera.position.y += pointer.y * 0.08
  look.copy(lookStart).lerp(lookEnd, p)
  camera.lookAt(look)
  underglow.intensity = 1.6 + p * 2.2
  shadow.material.opacity = 0.55 - p * 0.22
  applyExplosion(subject, p)
  subject.rotation.y = degToRad(view.yawStart + p * view.yawTravel)
  updateUI(p)
}

function smooth(t) {
  const x = clamp(t, 0, 1)
  return x * x * (3 - 2 * x)   // smoothstep everywhere
}
```

No elastic. No bounce. No idle spin.

## Camera

FOV **32°**, near 0.1, far 40. Product-shot lens, not a demo wide-angle.

Three waypoints live in [views.md](views.md) / `src/views.js`, different on mobile (`<860px`). `setCameraRigs()` copies the active view’s row. Do not paste a new table into `main.js`.

`dossier` (the original rig) for reference:

| | Desktop | Mobile |
|---|---|---|
| start | `2.05, 1.85, 3.25` | `1.35, 2.35, 3.55` |
| mid | `0.35, 2.55, 3.45` | `0.2, 2.9, 3.7` |
| end | `-2.15, 2.95, 2.55` | `-1.55, 3.2, 3.05` |

Look-at, yaw, and the other four views are in `views.js`. The subject sits in that view’s object zone; copy lives in that view’s reserved corners. If type lands on the object, the camera is too centered for the view — offset that view’s start/end, do not invent a sixth layout.

Pointer parallax is a nudge, not orbit. No `OrbitControls`.

## Layer windows

Each part in `subject.js` stores `{ layer, home, explode }`. `applyExplosion` smoothsteps `p` through that layer's `[start, end]`:

```
keycaps    0.10 – 0.32
switches   0.28 – 0.50
plate      0.46 – 0.64
pcb        0.58 – 0.76
internals  0.70 – 0.88
case       0.78 – 0.96
```

Windows overlap on purpose. The next layer starts moving before the current one finishes, which is what reads as a peel instead of a pop. Keep ~0.06–0.08 of overlap. Do not start every layer at 0.

Explode vectors are authored per part (radial outward for a grid, +Y for the top, −Y for the case). Do not use one vector for the whole object.

## Chapters

Six stops in `siteConfig.chapters`. `at` is the `p` where that chapter becomes current (highest chapter with `p >= at - 0.02`).

Default `at` values: `0, 0.22, 0.4, 0.62, 0.8, 0.94`.

| Chapter | Role |
|---|---|
| 01 assembled | Hero still holds. Object closed. |
| 02–05 | One layer per stop, matching `LAYERS`. |
| 06 exploded | Everything hanging. Colophon on. |

The left rail is built from `chapters`. Clicking a button `lenis.scrollTo(chapter.at * maxScroll)`. The current button gets `.is-current`.

## Callouts

`siteConfig.callouts` — five or so `{ from, to, name, note, anchor }`. While `p` is inside the window, project `subject.userData.anchors[anchor]` with `Vector3.project(camera)` and write `left`/`top` in CSS pixels. Hide when `ndc.z >= 1`.

Windows sit inside the matching layer window, slightly delayed so the part has already lifted before the label appears.

## UI gates

| Element | On when |
|---|---|
| Hero | `p ≤ 0.08` |
| Hint | `p ≤ 0.1` |
| Chapter panel | `0.1 < p < 0.97` |
| Colophon | `p > 0.88` |
| Callouts | each `from`–`to` |

Hero and chapter never share the screen. That is the collision rule. Do not add a sixth overlay that sits on the subject.

## Reduced motion

If `prefers-reduced-motion: reduce`:

- Lenis `lerp: 1`, `smoothWheel: false`
- Do not create the scrub tween
- Start at `p = 1` (exploded, every layer named)
- CSS transitions off, hint drip off

Keep the layout and the frozen exploded frame. Do not hide the canvas.

## Debug

The template exposes:

- `window.__goto(p)` — jump to a normalized scroll position
- `window.__audit()` — mesh count, shadow casters, materials, per-layer Y bounds, chapter list

`scripts/shoot.mjs` uses both. Do not remove them.
