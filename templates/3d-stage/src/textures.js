const legendCache = new Map()

function makeCanvas(w, h) {
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  return { canvas, ctx }
}

export function legendTexture(label, { accent = false, dark = false, shift = '', colors } = {}) {
  const ink = colors.background
  const steel = colors.muted
  const ember = colors.primary
  const paper = colors.foreground
  const key = `${label}|${shift}|${accent}|${dark}|${ember}|${paper}`
  if (legendCache.has(key)) return legendCache.get(key)

  const size = 512
  const { canvas, ctx } = makeCanvas(size, size)
  ctx.fillStyle = dark ? steel : accent ? ember : paper
  ctx.fillRect(0, 0, size, size)

  ctx.fillStyle = dark || accent ? paper : ink
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  if (shift) {
    ctx.font = '600 108px "Outfit", system-ui, sans-serif'
    ctx.fillText(shift, size / 2, 168)
    ctx.font = '600 156px "Outfit", system-ui, sans-serif'
    ctx.fillText(label, size / 2, 338)
  } else {
    const long = label.length > 2
    ctx.font = `600 ${long ? 76 : 176}px "Outfit", system-ui, sans-serif`
    ctx.fillText(label, size / 2, long ? 236 : 268)
  }

  legendCache.set(key, canvas)
  return canvas
}

export function pcbTexture(colors) {
  const ink = colors.background
  const steel = colors.muted
  const ember = colors.primary
  const paper = colors.foreground
  const w = 2048
  const h = 768
  const { canvas, ctx } = makeCanvas(w, h)

  ctx.fillStyle = '#161616'
  ctx.fillRect(0, 0, w, h)

  const grain = ctx.createLinearGradient(0, 0, w, h)
  grain.addColorStop(0, `${ember}0d`)
  grain.addColorStop(1, 'rgba(0,0,0,0.25)')
  ctx.fillStyle = grain
  ctx.fillRect(0, 0, w, h)

  const cols = 15
  const rows = 5
  const padX = 70
  const padY = 70
  const cellW = (w - padX * 2) / cols
  const cellH = (h - padY * 2) / rows

  ctx.strokeStyle = `${ember}8c`
  ctx.lineWidth = 2.2

  for (let r = 0; r < rows; r += 1) {
    ctx.beginPath()
    for (let c = 0; c < cols; c += 1) {
      const x = padX + c * cellW + cellW * 0.5
      const y = padY + r * cellH + cellH * 0.5
      if (c === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()
  }

  ctx.strokeStyle = `${ember}47`
  ctx.lineWidth = 1.4
  for (let c = 0; c < cols; c += 2) {
    ctx.beginPath()
    const x = padX + c * cellW + cellW * 0.5
    ctx.moveTo(x, padY + cellH * 0.5)
    ctx.lineTo(x, h - padY - cellH * 0.5)
    ctx.stroke()
  }

  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const x = padX + c * cellW + cellW * 0.5
      const y = padY + r * cellH + cellH * 0.5
      ctx.fillStyle = ember
      ctx.beginPath()
      ctx.arc(x - 10, y + 14, 4.5, 0, Math.PI * 2)
      ctx.arc(x + 10, y + 14, 4.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = 'rgba(245,245,245,0.22)'
      ctx.lineWidth = 1
      ctx.strokeRect(x - 22, y - 22, 44, 44)
    }
  }

  ctx.fillStyle = steel
  ctx.fillRect(w * 0.42, 28, 180, 88)
  ctx.strokeStyle = ember
  ctx.lineWidth = 2
  ctx.strokeRect(w * 0.42, 28, 180, 88)

  ctx.fillStyle = paper
  ctx.font = '600 22px "IBM Plex Mono", monospace'
  ctx.fillText('RP2040', w * 0.42 + 36, 80)

  ctx.fillStyle = 'rgba(245,245,245,0.16)'
  ctx.font = '16px "IBM Plex Mono", monospace'
  ctx.fillText('MATRIX 15 × 5', 70, h - 28)
  ctx.fillText('USB-C  /  5V', w - 260, h - 28)

  const mounts = [
    [48, 48],
    [w - 48, 48],
    [48, h - 48],
    [w - 48, h - 48],
    [w * 0.5, h - 48],
  ]
  ctx.fillStyle = ink
  for (const [x, y] of mounts) {
    ctx.beginPath()
    ctx.arc(x, y, 14, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = 'rgba(245,245,245,0.25)'
    ctx.lineWidth = 2
    ctx.stroke()
  }

  return canvas
}

export function plateTexture(colors) {
  const ink = colors.background
  const { canvas, ctx } = makeCanvas(1024, 384)
  ctx.fillStyle = '#2a2a2a'
  ctx.fillRect(0, 0, 1024, 384)

  const cols = 15
  const rows = 5
  const padX = 36
  const padY = 28
  const cellW = (1024 - padX * 2) / cols
  const cellH = (384 - padY * 2) / rows

  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const x = padX + c * cellW + cellW * 0.5
      const y = padY + r * cellH + cellH * 0.5
      ctx.fillStyle = ink
      ctx.beginPath()
      ctx.roundRect(x - 16, y - 16, 32, 32, 4)
      ctx.fill()
    }
  }
  return canvas
}

export function shadowTexture() {
  const { canvas, ctx } = makeCanvas(512, 512)
  const g = ctx.createRadialGradient(256, 256, 40, 256, 256, 250)
  g.addColorStop(0, 'rgba(0,0,0,0.7)')
  g.addColorStop(0.45, 'rgba(0,0,0,0.28)')
  g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 512, 512)
  return canvas
}
