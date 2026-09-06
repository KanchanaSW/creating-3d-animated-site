import type { SiteConfig } from '../types/site'

export const siteConfig: SiteConfig = {
  title: 'Lumen Atelier',
  tagline: 'Quiet luxury interiors shaped by light',
  colors: {
    background: '#0B0A0F',
    foreground: '#F4F1EA',
    primary: '#E8B96A',
    secondary: '#B4763C',
    accent: '#9FC3FF',
    muted: '#191620',
  },
  scene: { recipe: 'orb' },
  nav: [
    { label: 'Home', href: '#hero' },
    { label: 'Story', href: '#about' },
    { label: 'Craft', href: '#features' },
    { label: 'Work', href: '#gallery' },
    { label: 'Stories', href: '#stories' },
    { label: 'Contact', href: '#contact' },
  ],
  hero: {
    eyebrow: 'Interior atelier',
    headline: 'Rooms that hold the evening light',
    subheadline:
      'We compose residences and hospitality spaces where material, shadow, and proportion feel inevitable.',
    primaryCta: { label: 'View the work', href: '#gallery' },
    secondaryCta: { label: 'Begin a project', href: '#contact' },
  },
  about: {
    id: 'about',
    tone: 'base',
    eyebrow: 'The studio',
    title: 'An atelier for rooms with memory',
    body: 'Lumen Atelier began as a small practice obsessed with how late light moves across stone and linen. We still design that way: slowly, on site, with a short list of materials that age well.\n\nEvery commission is a conversation about ritual — morning coffee, a long table, the first lamp switched on at dusk.',
    stats: [
      { value: '12', label: 'Years of practice' },
      { value: '40', label: 'Residences completed' },
      { value: '8', label: 'Cities' },
    ],
  },
  features: {
    id: 'features',
    tone: 'surface',
    eyebrow: 'The craft',
    title: 'How a room comes together',
    items: [
      {
        title: 'Light first',
        description:
          'We start with openings, lamps, and the path of the sun before we choose a single chair.',
      },
      {
        title: 'Honest materials',
        description:
          'Oak, plaster, linen, and bronze — finishes that take a patina instead of a refresh cycle.',
      },
      {
        title: 'Quiet luxury',
        description:
          'Restraint over display. The room should feel complete when empty and generous when full.',
      },
    ],
  },
  gallery: {
    id: 'gallery',
    tone: 'base',
    eyebrow: 'Selected work',
    title: 'Spaces we have shaped',
    items: [
      { title: 'Coastal dining', caption: 'A coastal dining room held in warm plaster' },
      { title: 'Private gallery', caption: 'Gallery lighting for a private collection' },
      { title: 'Mountain house', caption: 'A mountain house that opens to the weather' },
      { title: 'Townhouse stair', caption: 'Textile studies for a townhouse stair' },
    ],
  },
  testimonials: {
    id: 'stories',
    tone: 'inverse',
    eyebrow: 'In their words',
    title: 'From the people who live in them',
    items: [
      {
        quote:
          'They treated the house like a score — every doorway a measure, every lamp a note. We still notice new details at dusk.',
        name: 'Amelia Hart',
        role: 'Collector, Lisbon',
      },
      {
        quote:
          'The restaurant feels older than it is. Guests ask who restored it. Nobody built it that way until Lumen did.',
        name: 'Kenji Mori',
        role: 'Host, Kyoto',
      },
      {
        quote:
          'I asked for less, and they delivered more silence. The rooms hold a whole afternoon without asking anything of you.',
        name: 'Nadia Voss',
        role: 'Publisher, Antwerp',
      },
    ],
  },
  cta: {
    id: 'contact',
    tone: 'base',
    title: 'Tell us about the room you cannot stop thinking about',
    body: 'Share a site, a ritual, or a photograph. We take a small number of commissions each year.',
    button: { label: 'Start a project', href: 'mailto:hello@lumenatelier.example' },
  },
  footer: {
    blurb:
      'Lumen Atelier designs interiors for people who notice how a room changes at four in the afternoon.',
    links: [
      { label: 'Work', href: '#gallery' },
      { label: 'Story', href: '#about' },
      { label: 'Contact', href: '#contact' },
    ],
  },
}
