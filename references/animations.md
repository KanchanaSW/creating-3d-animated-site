# Animation patterns

Do not invent a second motion stack. Keep Lenis and GSAP ScrollTrigger. Keep Three.js WebGL for the canvas. There is no Motion (`motion/react`), no R3F `useFrame`, no CSS scroll-driven animation on the subject.

| Library | Use for | Do not use for |
|---|---|---|
| Lenis | page-level smooth scrolling | element tweens, Three camera |
| GSAP ScrollTrigger | the one tween of `state.p` from 0 → 1 | `mesh.position`, `camera.position`, button hover |
| `gsap.ticker` | the unified RAF: `lenis.raf` + `frameFromProgress` + `render` | a second loop |
| Three, in `frameFromProgress(p)` | camera, explosion, lights, UI gates | anything time-based that ignores `p` |

## The RAF split

```
wheel / trackpad / touch → Lenis (on the GSAP ticker, autoRaf: false)
  → ScrollTrigger.update
  → state.p   (scrub: 0.35)
gsap.ticker → lenis.raf(t) → frameFromProgress(p) → renderer.render()
```

GSAP never tweens Three objects. If you wrap Lenis in its own `requestAnimationFrame`, you have two HTML frame loops — stop and restore `autoRaf: false` plus the ticker.

Full numbers, camera waypoints, layer windows, and UI gates: [choreography.md](choreography.md).

## What the template already runs

- **Scroll track** — 620vh invisible driver.
- **Camera** — three-waypoint arc + pointer parallax, all inside `frameFromProgress`.
- **Explosion** — `applyExplosion(subject, p)` with overlapping `LAYER_WINDOWS`.
- **Underglow / shadow pool** — intensity and opacity follow `p`.
- **Subject yaw** — `-8° + p * 0.35`. Not an idle spin.
- **Hero / hint / chapter / colophon / callouts** — class toggles from `p` thresholds. CSS opacity transitions (0.25–0.4s).
- **Hint drip** — CSS keyframe on `.hint-line`. Off under reduced motion.
- **Rail jumps** — `lenis.scrollTo(chapter.at * maxScroll, { duration: 0.9 })`.

Do not add a masked word-by-word hero reveal, card lift hovers, or section `data-reveal` batches. There are no bands to reveal.

## Reduced motion

If `window.matchMedia('(prefers-reduced-motion: reduce)')` matches:

- Lenis `lerp: 1`, `smoothWheel: false`.
- Do not create the scrub tween. `state.p` starts at `1`.
- CSS transitions and the hint drip are off.
- Canvas still renders. The frame is the exploded state, every layer named.

The template implements this in `src/main.js` and `src/style.css`. Do not remove those guards.
