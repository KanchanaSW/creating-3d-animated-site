# Gotchas

When the canvas is black, the scroll fights the mouse, or type sits on the subject, read this before patching around it.

| Symptom | Cause | Fix |
|---|---|---|
| Black canvas | Renderer constructed without a canvas, or canvas not `#gl` | Keep `document.querySelector('#gl')` as the renderer canvas. |
| Black canvas | `import` from `'three/webgpu'` mixed into a WebGL scene | Delete the webgpu import. This stack is `'three'` + `'three/addons/...'`. |
| Black canvas | `outputColorSpace` / tone mapping stripped | Restore ACES + sRGB from [renderer.md](renderer.md). |
| Metals look like flat plastic | `scene.environment` missing | Restore `PMREMGenerator` + `RoomEnvironment` at 0.55. |
| Subject floats | Shadow map off, or the radial shadow plane deleted | `shadowMap.enabled = true` and put the plane back at `y = -0.13`. |
| Shadow acne / peter-panning | Bias wrong, or map too small | Keep bias `-0.00025`, map 2048², ortho frustum ±4. |
| Page will not scroll; model spins on drag | `OrbitControls` | Remove it. Camera is scroll-driven. |
| Two scenes, or a flash of a second renderer | A second canvas "for fallback" | One canvas. One `WebGLRenderer`. |
| Double-smoothing on the page | Lenis `autoRaf: true` plus the GSAP ticker | `autoRaf` stays off. Only the ticker calls `lenis.raf`. |
| Camera ignores scroll | GSAP tweening `camera.position` | Write `p` into `state`; `frameFromProgress` reads it. |
| Explosion pops all at once | Every layer window is `[0, 1]` | Restore overlapping windows from [subject.md](subject.md). |
| Type sits on the keyboard / watch | Hero too wide, or camera start too centered | Keep hero bottom-left; push `camStart.x` positive so the object sits right of the headline. |
| Chapter panel covers the subject | Camera end too far right, or chapter not `.is-on` gated | Chapter is right-center; `camEnd.x` is negative. Gates in [choreography.md](choreography.md). |
| Overlay clicks never reach the rail | Missing `pointer-events: none` on hero/chapter | Restore it. Rail buttons must keep pointer events. |
| Scene is white/orange regardless of title | Hardcoded material colors in `subject.js` | Bind factories to `colors` from `buildSubject({ colors })`. |
| Cyan cube in an orange scene | Accent forced 60° from primary | One chroma. `accent` may equal `primary`. |
| A box grid / sphere / torus | Recipe enum leftover, or `subject.js` not rewritten | Model the named object. Under 40 meshes is a failed run. |
| Keyboard ships for a watch title | Example `subject.js` left in place | Rewrite it. Recolor is not a new object. |
| Jank on phone | DPR uncapped, or 61 unique extrudes without sharing geos | Clamp pixel ratio to 2. Share housing/pin geos. |
| Reduced-motion users get a spinning object | Idle `rotation.y += delta` | There is no idle spin. Reduced motion freezes at `p = 1`. |
| Z-fighting on legends | Print plane inside the cap | Offset `+0.002` on Y, `renderOrder = 2`, `depthWrite: false`. |
| Fog halo around the subject | Fog color ≠ background | `scene.fog = new THREE.Fog(colors.background, 7.5, 16)`. |
| Copied a Three.js WebGPU example | Wrong renderer family | Stay on `WebGLRenderer` in `main.js`. |

**All of these mean: the canvas or the overlay is wrong. Re-read [renderer.md](renderer.md), [subject.md](subject.md), and [choreography.md](choreography.md); do not patch around them.**
