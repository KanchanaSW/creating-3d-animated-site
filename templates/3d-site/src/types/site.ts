export type HexColor = `#${string}`

/** Background treatment for a section band. See references/visual-system.md. */
export type SectionTone = 'base' | 'surface' | 'inverse'

export type SceneRecipe = 'orb' | 'lattice' | 'field' | 'ribbon' | 'terrain'

export interface SiteColors {
  background: HexColor
  foreground: HexColor
  primary: HexColor
  secondary: HexColor
  accent: HexColor
  muted: HexColor
}

export interface NavItem {
  label: string
  href: string
}

export interface HeroContent {
  eyebrow: string
  headline: string
  subheadline: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

export interface AboutContent {
  id: string
  tone?: SectionTone
  eyebrow: string
  title: string
  body: string
  stats: Array<{ value: string; label: string }>
}

export interface FeatureItem {
  title: string
  description: string
}

export interface GalleryItem {
  title: string
  caption: string
}

export interface Testimonial {
  quote: string
  name: string
  role: string
}

export interface CtaContent {
  id: string
  tone?: SectionTone
  title: string
  body: string
  button: { label: string; href: string }
}

export interface FooterContent {
  blurb: string
  links: NavItem[]
}

export interface SiteConfig {
  title: string
  tagline: string
  colors: SiteColors
  scene: { recipe: SceneRecipe }
  nav: NavItem[]
  hero: HeroContent
  about: AboutContent
  features: {
    id: string
    tone?: SectionTone
    eyebrow: string
    title: string
    items: FeatureItem[]
  }
  gallery: {
    id: string
    tone?: SectionTone
    eyebrow: string
    title: string
    items: GalleryItem[]
  }
  testimonials: {
    id: string
    tone?: SectionTone
    eyebrow?: string
    title: string
    items: Testimonial[]
  }
  cta: CtaContent
  footer: FooterContent
}
