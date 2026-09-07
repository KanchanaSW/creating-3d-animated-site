#!/usr/bin/env node
/**
 * Checks a palette against the floors in references/color-system.md.
 *
 *   node scripts/check-palette.mjs <background> <foreground> <primary> <secondary> <accent> <muted>
 *
 * Reads the same six hexes that go into siteConfig.colors, in that order.
 */

const [background, foreground, primary, secondary, accent, muted] = process.argv.slice(2)

if (!muted) {
  console.error(
    'usage: node scripts/check-palette.mjs <background> <foreground> <primary> <secondary> <accent> <muted>',
  )
  process.exit(2)
}

const hex = (value, name) => {
  if (!/^#[0-9a-fA-F]{6}$/.test(value)) {
    console.error(`${name} must be #RRGGBB, got ${value}`)
    process.exit(2)
  }
  return value
}

const colors = {
  background: hex(background, 'background'),
  foreground: hex(foreground, 'foreground'),
  primary: hex(primary, 'primary'),
  secondary: hex(secondary, 'secondary'),
  accent: hex(accent, 'accent'),
  muted: hex(muted, 'muted'),
}

const channels = (value) =>
  [1, 3, 5].map((i) => parseInt(value.slice(i, i + 2), 16) / 255)

const luminance = (value) => {
  const [r, g, b] = channels(value).map((c) =>
    c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4,
  )
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

const contrast = (a, b) => {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (light + 0.05) / (dark + 0.05)
}

const hue = (value) => {
  const [r, g, b] = channels(value)
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  if (max === min) return 0
  const d = max - min
  const h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4
  return (h * 60 + 360) % 360
}

const saturation = (value) => {
  const [r, g, b] = channels(value)
  return Math.max(r, g, b) - Math.min(r, g, b)
}

const hueGap = (a, b) => {
  const d = Math.abs(hue(a) - hue(b))
  return Math.round(Math.min(d, 360 - d))
}

const checks = [
  {
    label: 'body text: foreground on background >= 7.0',
    value: contrast(colors.foreground, colors.background).toFixed(2),
    pass: contrast(colors.foreground, colors.background) >= 7,
  },
  {
    label: 'primary label on background >= 3.0',
    value: contrast(colors.primary, colors.background).toFixed(2),
    pass: contrast(colors.primary, colors.background) >= 3,
  },
  {
    label: 'ink on primary >= 4.5',
    value: contrast(colors.background, colors.primary).toFixed(2),
    pass: contrast(colors.background, colors.primary) >= 4.5,
  },
  {
    label: 'accent on background >= 3.0',
    value: contrast(colors.accent, colors.background).toFixed(2),
    pass: contrast(colors.accent, colors.background) >= 3,
  },
  {
    label: 'accent is in the primary family (<= 30 deg)',
    value: `${hueGap(colors.accent, colors.primary)} deg`,
    pass: hueGap(colors.accent, colors.primary) <= 30,
  },
  {
    label: 'secondary is within 30 deg of primary',
    value: `${hueGap(colors.secondary, colors.primary)} deg`,
    pass: hueGap(colors.secondary, colors.primary) <= 30,
  },
  {
    label: 'primary is not a grey (saturation >= 0.15)',
    value: saturation(colors.primary).toFixed(2),
    pass: saturation(colors.primary) >= 0.15 || contrast(colors.primary, colors.background) >= 12,
  },
  {
    label: 'muted is a tint of background, not a twin (1.05 - 2.2)',
    value: contrast(colors.muted, colors.background).toFixed(2),
    pass:
      contrast(colors.muted, colors.background) >= 1.05 &&
      contrast(colors.muted, colors.background) <= 2.2,
  },
]

let failed = 0
for (const check of checks) {
  if (!check.pass) failed++
  console.log(`${check.pass ? 'pass' : 'FAIL'}  ${check.label.padEnd(52)} ${check.value}`)
}

console.log(failed === 0 ? '\npalette passes' : `\n${failed} check(s) failed — adjust before writing site.js`)
process.exit(failed === 0 ? 0 : 1)
