# Animation patterns

Do not invent a second motion stack. Keep Lenis, Motion (`motion/react`), and GSAP ScrollTrigger for HTML. Keep Three.js WebGPU + TSL for the canvas.

| Library | Use for | Do not use for |
|---|---|---|
| Lenis | page-level smooth scrolling | element tweens, Three camera |
| Motion (`motion/react`) | hero headline, nav, buttons, hover, page load | long scroll timelines, Three objects |
| GSAP ScrollTrigger | section reveals; writing scroll progress into `scrollSnapshot` | button hover, `mesh.rotation` |
| R3F `useFrame` | idle rotation, applying camera/uniforms from `scrollSnapshot` | Lenis, DOM |

## The RAF split

```
wheel / trackpad / touch → Lenis (on the GSAP ticker, autoRaf never)
  → ScrollTrigger.update → HTML reveals
  → scrollSnapshot.progress / galleryBeat
R3F useFrame → read snapshot → camera + TSL uniforms + idle spin
```

GSAP never tweens Three objects. R3F never calls `lenis.raf`. If you wrap Lenis in its own `requestAnimationFrame`, you have two HTML frame loops — stop and restore `initSmoothScroll`.

## What the template already runs

- **Hero headline** — each word sits in an `overflow-hidden` span and slides up from `y: 108%`, staggered.
- **Nav** — Motion slide-in on load; the pill gains its border, blur, and shadow past 40px of scroll.
- **Sections** — `useGsapReveal` on the `Band` root. Mark heading and children with `data-reveal`.
- **Buttons and cards** — Motion `whileHover={{ scale: 1.03 }}` / `whileTap={{ scale: 0.98 }}`; cards lift on CSS transition.
- **Camera** — `useScrollCamera` lerps six poses from `scrollSnapshot.progress`. Gallery beat morphs the recipe while `#gallery` is in view.

## Reveals are batched `to` tweens, not `from`

`useGsapReveal` sets the hidden state with `gsap.set`, then plays a `gsap.to` per batch with `once: true`.

This matters. A `gsap.from` tween is reverted to its start values on every `ScrollTrigger.refresh()` — which fires when fonts settle — and elements that were mid-reveal get stranded at `opacity: 0`. If you rewrite this hook as a single `from` tween, sections will intermittently render empty.

`initSmoothScroll` also calls `ScrollTrigger.refresh()` once `document.fonts.ready` resolves, because web fonts change text metrics and move every trigger.

## Reduced motion

If `window.matchMedia('(prefers-reduced-motion: reduce)')` matches:

- Do not start Lenis.
- Do not run GSAP tweens or ScrollTrigger.
- Motion components read `useReducedMotion()` and pass `initial={false}`, so nothing animates in.
- Canvas `frameloop="never"` after one still frame. No idle rotation. No camera travel.
- Keep the static layout, config-driven content, and one frozen view of the recipe.

The template implements all of this in `SmoothScroll`, `useGsapReveal`, `Hero`, `Nav`, and `WebGPUCanvas`. Do not remove those guards.
