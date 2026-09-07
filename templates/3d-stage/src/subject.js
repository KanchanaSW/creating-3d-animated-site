import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { legendTexture, pcbTexture, plateTexture } from './textures.js'
import * as mat from './materials.js'

export const LAYERS = ['keycaps', 'switches', 'plate', 'pcb', 'internals', 'case']

export const LAYER_WINDOWS = {
  keycaps: [0.1, 0.32],
  switches: [0.28, 0.5],
  plate: [0.46, 0.64],
  pcb: [0.58, 0.76],
  internals: [0.7, 0.88],
  case: [0.78, 0.96],
}

const UNIT = 0.192
const GAP = 0.02
const KEY_H = 0.052
const LAYOUT = [
  [
    { l: 'ESC', u: 1, accent: true },
    { l: '1', s: '!', u: 1 },
    { l: '2', s: '@', u: 1 },
    { l: '3', s: '#', u: 1 },
    { l: '4', s: '$', u: 1 },
    { l: '5', s: '%', u: 1 },
    { l: '6', s: '^', u: 1 },
    { l: '7', s: '&', u: 1 },
    { l: '8', s: '*', u: 1 },
    { l: '9', s: '(', u: 1 },
    { l: '0', s: ')', u: 1 },
    { l: '-', s: '_', u: 1 },
    { l: '=', s: '+', u: 1 },
    { l: '⌫', u: 2 },
  ],
  [
    { l: 'TAB', u: 1.5 },
    { l: 'Q', u: 1 },
    { l: 'W', u: 1 },
    { l: 'E', u: 1 },
    { l: 'R', u: 1 },
    { l: 'T', u: 1 },
    { l: 'Y', u: 1 },
    { l: 'U', u: 1 },
    { l: 'I', u: 1 },
    { l: 'O', u: 1 },
    { l: 'P', u: 1 },
    { l: '[', s: '{', u: 1 },
    { l: ']', s: '}', u: 1 },
    { l: '\\', s: '|', u: 1.5 },
  ],
  [
    { l: 'CAPS', u: 1.75 },
    { l: 'A', u: 1 },
    { l: 'S', u: 1 },
    { l: 'D', u: 1 },
    { l: 'F', u: 1 },
    { l: 'G', u: 1 },
    { l: 'H', u: 1 },
    { l: 'J', u: 1 },
    { l: 'K', u: 1 },
    { l: 'L', u: 1 },
    { l: ';', s: ':', u: 1 },
    { l: "'", s: '"', u: 1 },
    { l: 'ENT', u: 2.25, accent: true },
  ],
  [
    { l: 'SHIFT', u: 2.25 },
    { l: 'Z', u: 1 },
    { l: 'X', u: 1 },
    { l: 'C', u: 1 },
    { l: 'V', u: 1 },
    { l: 'B', u: 1 },
    { l: 'N', u: 1 },
    { l: 'M', u: 1 },
    { l: ',', s: '<', u: 1 },
    { l: '.', s: '>', u: 1 },
    { l: '/', s: '?', u: 1 },
    { l: 'SHIFT', u: 2.75 },
  ],
  [
    { l: 'CTRL', u: 1.25 },
    { l: '⌘', u: 1.25 },
    { l: 'ALT', u: 1.25 },
    { l: '', u: 6.25, space: true },
    { l: 'ALT', u: 1.25 },
    { l: 'FN', u: 1.25, accent: true },
    { l: '☰', u: 1.25 },
    { l: 'CTRL', u: 1.25 },
  ],
]

function roundedKeyShape(w, d, r) {
  const s = new THREE.Shape()
  const x = -w / 2
  const y = -d / 2
  s.moveTo(x + r, y)
  s.lineTo(x + w - r, y)
  s.quadraticCurveTo(x + w, y, x + w, y + r)
  s.lineTo(x + w, y + d - r)
  s.quadraticCurveTo(x + w, y + d, x + w - r, y + d)
  s.lineTo(x + r, y + d)
  s.quadraticCurveTo(x, y + d, x, y + d - r)
  s.lineTo(x, y + r)
  s.quadraticCurveTo(x, y, x + r, y)
  return s
}

function keyGeometry(u) {
  const w = u * UNIT - GAP
  const d = UNIT - GAP
  const geo = new THREE.ExtrudeGeometry(roundedKeyShape(w, d, 0.016), {
    depth: KEY_H,
    bevelEnabled: true,
    bevelThickness: 0.007,
    bevelSize: 0.008,
    bevelSegments: 2,
    curveSegments: 6,
  })
  geo.rotateX(-Math.PI / 2)
  geo.translate(0, KEY_H / 2, 0)
  geo.computeVertexNormals()
  return geo
}

function bindPart(mesh, layer, explode) {
  mesh.userData.layer = layer
  mesh.userData.home = mesh.position.clone()
  mesh.userData.explode = explode.clone()
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

function makeLegend(label, u, accent, dark, shift, topY, colors) {
  if (!label) return null
  const map = new THREE.CanvasTexture(legendTexture(label, { accent, dark, shift, colors }))
  map.colorSpace = THREE.SRGBColorSpace
  map.anisotropy = 8
  const w = Math.min(u * UNIT - GAP, UNIT * 1.15) * 0.72
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(w, (UNIT - GAP) * 0.68),
    mat.print(map),
  )
  plane.rotation.x = -Math.PI / 2
  plane.position.y = topY
  plane.renderOrder = 2
  plane.castShadow = false
  plane.receiveShadow = false
  return plane
}

export function buildSubject({ colors }) {
  const root = new THREE.Group()
  const parts = []
  const anchors = {}

  const boardW = 15 * UNIT
  const boardD = 5 * UNIT
  const originX = -boardW / 2
  const originZ = -boardD / 2

  const paper = colors.foreground
  const steel = colors.muted
  const ember = colors.primary
  const ink = colors.background

  const housingMat = mat.housing(steel)
  const stemMat = mat.emissivePlastic(ember)
  const pinMat = mat.hardware(ember)

  const housingGeo = new RoundedBoxGeometry(0.13, 0.074, 0.13, 1, 0.01)
  const stemV = new THREE.BoxGeometry(0.016, 0.046, 0.036)
  const stemH = new THREE.BoxGeometry(0.036, 0.046, 0.016)
  const pinGeo = new THREE.CylinderGeometry(0.006, 0.006, 0.028, 8)

  const keys = []

  LAYOUT.forEach((row, ri) => {
    let x = 0
    row.forEach((key) => {
      const cx = originX + x + (key.u * UNIT) / 2
      const cz = originZ + (ri + 0.5) * UNIT
      const radial = new THREE.Vector3(cx, 0, cz)
      const outward = radial.clone().normalize().multiplyScalar(0.22 + key.u * 0.04)

      const yKey = 0.112
      const geo = keyGeometry(key.u)
      geo.computeBoundingBox()
      const cap = new THREE.Mesh(
        geo,
        mat.plastic(key.accent ? ember : key.space ? steel : paper, { sheenColor: paper }),
      )
      cap.position.set(cx, yKey, cz)
      const legend = makeLegend(
        key.l,
        key.u,
        Boolean(key.accent),
        Boolean(key.space),
        key.s,
        geo.boundingBox.max.y + 0.002,
        colors,
      )
      if (legend) cap.add(legend)
      bindPart(cap, 'keycaps', new THREE.Vector3(outward.x * 1.15, 1.18, outward.z * 1.15))
      root.add(cap)
      parts.push(cap)
      keys.push({ mesh: cap, key, cx, cz })

      const housing = new THREE.Mesh(housingGeo, housingMat)
      housing.position.set(cx, 0.058, cz)
      bindPart(housing, 'switches', new THREE.Vector3(outward.x * 0.45, 0.68, outward.z * 0.45))
      root.add(housing)
      parts.push(housing)

      const stem = new THREE.Group()
      const a = new THREE.Mesh(stemV, stemMat)
      const b = new THREE.Mesh(stemH, stemMat)
      a.position.y = 0.018
      b.position.y = 0.018
      stem.add(a, b)
      stem.position.set(cx, 0.09, cz)
      bindPart(stem, 'switches', new THREE.Vector3(outward.x * 0.45, 0.76, outward.z * 0.45))
      root.add(stem)
      parts.push(stem)

      const pinL = new THREE.Mesh(pinGeo, pinMat)
      const pinR = new THREE.Mesh(pinGeo, pinMat)
      pinL.position.set(cx - 0.02, 0.018, cz + 0.018)
      pinR.position.set(cx + 0.02, 0.018, cz + 0.018)
      bindPart(pinL, 'switches', new THREE.Vector3(outward.x * 0.25, 0.5, outward.z * 0.25))
      bindPart(pinR, 'switches', new THREE.Vector3(outward.x * 0.25, 0.5, outward.z * 0.25))
      root.add(pinL, pinR)
      parts.push(pinL, pinR)

      x += key.u * UNIT
    })
  })

  const plateMap = new THREE.CanvasTexture(plateTexture(colors))
  plateMap.colorSpace = THREE.SRGBColorSpace
  const plate = new THREE.Mesh(
    new RoundedBoxGeometry(boardW + 0.08, 0.018, boardD + 0.06, 1, 0.012),
    mat.metal('#2a2a2a', { map: plateMap }),
  )
  plate.position.set(0, 0.028, 0)
  bindPart(plate, 'plate', new THREE.Vector3(0, 0.28, 0.1))
  root.add(plate)
  parts.push(plate)

  const pcbMap = new THREE.CanvasTexture(pcbTexture(colors))
  pcbMap.colorSpace = THREE.SRGBColorSpace
  const pcb = new THREE.Mesh(
    new RoundedBoxGeometry(boardW + 0.04, 0.016, boardD + 0.03, 1, 0.008),
    mat.board('#1a1a1a', pcbMap),
  )
  pcb.position.set(0, 0.006, 0)
  bindPart(pcb, 'pcb', new THREE.Vector3(0, -0.16, -0.06))
  root.add(pcb)
  parts.push(pcb)

  const mcu = new THREE.Mesh(
    new RoundedBoxGeometry(0.28, 0.03, 0.18, 1, 0.006),
    new THREE.MeshStandardMaterial({ color: steel, metalness: 0.4, roughness: 0.4 }),
  )
  mcu.position.set(0, 0.026, -boardD / 2 + 0.16)
  bindPart(mcu, 'pcb', new THREE.Vector3(0, -0.1, -0.16))
  root.add(mcu)
  parts.push(mcu)

  const usb = new THREE.Mesh(
    new RoundedBoxGeometry(0.14, 0.04, 0.08, 1, 0.008),
    mat.hardware(ember),
  )
  usb.position.set(0, 0.008, -boardD / 2 - 0.03)
  bindPart(usb, 'pcb', new THREE.Vector3(0, -0.14, -0.22))
  root.add(usb)
  parts.push(usb)

  const foamMesh = new THREE.Mesh(
    new RoundedBoxGeometry(boardW - 0.08, 0.02, boardD - 0.08, 1, 0.01),
    mat.foam('#3a2218'),
  )
  foamMesh.position.set(0, -0.016, 0)
  bindPart(foamMesh, 'internals', new THREE.Vector3(0, -0.48, 0.06))
  root.add(foamMesh)
  parts.push(foamMesh)

  const standoffGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.06, 10)
  const standoffMat = mat.hardware(ember)
  const standoffXY = [
    [-boardW / 2 + 0.16, -boardD / 2 + 0.14],
    [boardW / 2 - 0.16, -boardD / 2 + 0.14],
    [-boardW / 2 + 0.16, boardD / 2 - 0.14],
    [boardW / 2 - 0.16, boardD / 2 - 0.14],
    [0, boardD / 2 - 0.14],
    [0, -boardD / 2 + 0.14],
  ]
  standoffXY.forEach(([sx, sz], i) => {
    const post = new THREE.Mesh(standoffGeo, standoffMat)
    post.position.set(sx, -0.028, sz)
    const side = i % 2 === 0 ? -0.22 : 0.22
    bindPart(post, 'internals', new THREE.Vector3(side, -0.52, 0))
    root.add(post)
    parts.push(post)
  })

  const caseMat = mat.coat(ink)
  const caseOuter = new THREE.Mesh(
    new RoundedBoxGeometry(boardW + 0.3, 0.086, boardD + 0.26, 3, 0.045),
    caseMat,
  )
  caseOuter.position.set(0, -0.058, 0.01)
  bindPart(caseOuter, 'case', new THREE.Vector3(0, -0.92, 0.14))
  root.add(caseOuter)
  parts.push(caseOuter)

  const lipH = 0.11
  const lipY = 0.018
  const lips = [
    { w: boardW + 0.3, h: lipH, d: 0.04, x: 0, y: lipY, z: boardD / 2 + 0.112 },
    { w: boardW + 0.3, h: lipH, d: 0.04, x: 0, y: lipY, z: -(boardD / 2 + 0.092) },
    { w: 0.04, h: lipH, d: boardD + 0.184, x: boardW / 2 + 0.13, y: lipY, z: 0.01 },
    { w: 0.04, h: lipH, d: boardD + 0.184, x: -(boardW / 2 + 0.13), y: lipY, z: 0.01 },
  ]
  lips.forEach((lip) => {
    const mesh = new THREE.Mesh(new RoundedBoxGeometry(lip.w, lip.h, lip.d, 1, 0.01), caseMat)
    mesh.position.set(lip.x, lip.y, lip.z)
    bindPart(mesh, 'case', new THREE.Vector3(0, -0.86, 0.12))
    root.add(mesh)
    parts.push(mesh)
  })

  const footGeo = new THREE.CylinderGeometry(0.04, 0.05, 0.018, 12)
  const footMat = mat.rubber(steel)
  ;[
    [-1.15, 0.38],
    [1.15, 0.38],
    [-1.15, -0.32],
    [1.15, -0.32],
  ].forEach(([fx, fz]) => {
    const foot = new THREE.Mesh(footGeo, footMat)
    foot.position.set(fx, -0.108, fz)
    bindPart(foot, 'case', new THREE.Vector3(0, -0.98, 0.18))
    root.add(foot)
    parts.push(foot)
  })

  const glowRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.28, 0.012, 10, 64),
    mat.glow(ember),
  )
  glowRing.rotation.x = Math.PI / 2
  glowRing.position.y = -0.038
  glowRing.scale.set(1.2, 0.44, 1)
  bindPart(glowRing, 'case', new THREE.Vector3(0, -0.72, 0))
  root.add(glowRing)
  parts.push(glowRing)

  const esc = keys.find((k) => k.key.l === 'ESC')
  anchors.keycaps = esc ? esc.mesh : keys[0].mesh
  anchors.switches = keys[16]?.mesh ?? keys[0].mesh
  anchors.pcb = pcb
  anchors.plate = plate
  anchors.internals = foamMesh

  root.userData.parts = parts
  root.userData.anchors = anchors
  root.userData.bounds = { w: boardW, d: boardD }
  return root
}

function smoothstep(edge0, edge1, x) {
  const t = THREE.MathUtils.clamp((x - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

export function applyExplosion(root, progress) {
  const parts = root.userData.parts
  for (const mesh of parts) {
    const [a, b] = LAYER_WINDOWS[mesh.userData.layer] ?? [0, 1]
    const t = smoothstep(a, b, progress)
    const home = mesh.userData.home
    const explode = mesh.userData.explode
    mesh.position.set(
      home.x + explode.x * t,
      home.y + explode.y * t,
      home.z + explode.z * t,
    )
  }
}
