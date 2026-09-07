#!/usr/bin/env node
/**
 * Screenshot audit for a generated 3D stage.
 *
 * Walks every chapter `at` via window.__goto, grabs window.__audit(),
 * and fails if the subject is a sculpture (too few meshes) or has no shadows.
 *
 *   node scripts/shoot.mjs --url http://127.0.0.1:5173
 *   node scripts/shoot.mjs --url http://127.0.0.1:5173 --out /tmp/3d-shots
 *
 * Run from the generated project after `npm i playwright-core`.
 * Uses the installed Chrome, not bundled Chromium.
 */
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

let chromium
try {
  ;({ chromium } = createRequire(path.join(process.cwd(), 'package.json'))('playwright-core'))
} catch {
  console.error('playwright-core not found. In the generated project run:\n  npm i -D playwright-core')
  process.exit(1)
}

const argv = process.argv.slice(2)
const arg = (n, d) => {
  const i = argv.indexOf(n)
  return i > -1 && argv[i + 1] ? argv[i + 1] : d
}

const URL = arg('--url', 'http://127.0.0.1:5173')
const OUT = path.resolve(arg('--out', path.join(process.cwd(), 'shots')))
const W = parseInt(arg('--width', '1440'), 10)
const H = parseInt(arg('--height', '900'), 10)

const CHROME = [
  process.env.SHOOT_CHROME,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].find((p) => p && fs.existsSync(p))

if (!CHROME) {
  console.error('No installed Chrome found. Set SHOOT_CHROME to its path.')
  process.exit(1)
}

fs.mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({ executablePath: CHROME, headless: true })
const page = await browser.newPage({
  viewport: { width: W, height: H },
  deviceScaleFactor: 1,
})

const errors = []
page.on('pageerror', (e) => errors.push(String(e)))

const fail = (msg) => {
  console.error(`FAIL  ${msg}`)
}

try {
  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 30000 })
  await page.waitForFunction(() => typeof window.__audit === 'function' && window.__audit().meshes > 0, {
    timeout: 20000,
  })
} catch (err) {
  fail(`page did not boot: ${err.message}`)
  if (errors.length) console.error(errors.join('\n'))
  await browser.close()
  process.exit(1)
}

const first = await page.evaluate(() => window.__audit())
console.log('audit', JSON.stringify(first, null, 2))

let failed = 0
if (first.meshes < 40) {
  fail(`meshes ${first.meshes} < 40 — this is a sculpture, not a product. Rewrite subject.js.`)
  failed += 1
}
if (!first.shadowCasters) {
  fail('shadowCasters is 0 — enable castShadow on parts and keep the key light shadow map.')
  failed += 1
}
if (!first.shadowMaps) {
  fail('renderer.shadowMap.enabled is false')
  failed += 1
}
if (!first.chapters?.length) {
  fail('no chapters on window.__audit()')
  failed += 1
}
const VIEWS = ['dossier', 'plinth', 'vitrine', 'atelier', 'folio']
if (first.view && !VIEWS.includes(first.view)) {
  fail(`unknown view ${first.view}`)
  failed += 1
}

const chapters = first.chapters?.length ? first.chapters : [{ id: 'hero', at: 0 }]
for (const chapter of chapters) {
  await page.evaluate((at) => window.__goto(at), chapter.at)
  await page.evaluate(() => new Promise((r) => setTimeout(r, 450)))
  const shot = path.join(OUT, `${String(chapter.at).replace('.', 'p')}-${chapter.id}.png`)
  await page.screenshot({ path: shot, type: 'png' })
  console.log(`shot   ${shot}`)
}

await browser.close()

if (errors.length) {
  console.error('\npage errors:')
  console.error(errors.join('\n'))
  failed += 1
}

if (failed) {
  console.error(`\n${failed} check(s) failed`)
  process.exit(1)
}

console.log(`\npass  meshes=${first.meshes} shadowCasters=${first.shadowCasters} materials=${first.materials} view=${first.view ?? 'unset'}`)
console.log(`frames written to ${OUT}`)
