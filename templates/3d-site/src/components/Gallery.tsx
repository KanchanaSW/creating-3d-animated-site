import { siteConfig } from '../config/site'
import { Band } from './Band'
import { SectionHeading } from './SectionHeading'

const tileClass = [
  'md:col-span-7 h-[280px] sm:h-[340px]',
  'md:col-span-5 h-[280px] sm:h-[340px]',
  'md:col-span-5 h-[240px] sm:h-[300px]',
  'md:col-span-7 h-[240px] sm:h-[300px]',
]

export function Gallery() {
  const { gallery } = siteConfig

  return (
    <Band id={gallery.id} tone={gallery.tone ?? 'base'}>
      <SectionHeading eyebrow={gallery.eyebrow} title={gallery.title} />
      <div className="mt-14 grid gap-4 md:grid-cols-12">
        {gallery.items.map((item, index) => (
          <figure
            key={item.title}
            data-reveal
            className={`group relative overflow-hidden rounded-[1.75rem] border border-hairline bg-background/20 backdrop-blur-[2px] ${
              tileClass[index] ?? 'md:col-span-6 h-[280px]'
            }`}
          >
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/80 via-background/35 to-transparent p-6 pt-16">
              <p className="font-mono text-micro uppercase text-primary">{item.title}</p>
              <p className="mt-2 max-w-md text-sub text-foreground">{item.caption}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Band>
  )
}
