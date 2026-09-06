import { siteConfig } from '../config/site'
import { Band } from './Band'
import { SectionHeading } from './SectionHeading'

export function Features() {
  const { features } = siteConfig

  return (
    <Band id={features.id} tone={features.tone ?? 'surface'}>
      <SectionHeading eyebrow={features.eyebrow} title={features.title} />
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {features.items.map((item, index) => (
          <article
            key={item.title}
            data-reveal
            className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-hairline bg-raised/60 p-6 transition duration-500 hover:-translate-y-1.5 hover:border-primary/40"
          >
            <span className="font-mono text-micro text-foreground/55">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="font-display mt-5 text-sub font-medium">{item.title}</h3>
            <p className="mt-3 flex-1 text-foreground/70">{item.description}</p>
          </article>
        ))}
      </div>
    </Band>
  )
}
