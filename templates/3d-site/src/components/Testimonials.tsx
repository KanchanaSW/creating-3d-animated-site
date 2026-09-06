import { siteConfig } from '../config/site'
import { Band } from './Band'
import { SectionHeading } from './SectionHeading'

function initials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
}

export function Testimonials() {
  const { testimonials } = siteConfig

  return (
    <Band id={testimonials.id} tone={testimonials.tone ?? 'inverse'}>
      <SectionHeading eyebrow={testimonials.eyebrow} title={testimonials.title} />
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {testimonials.items.map((item) => (
          <blockquote
            key={item.name}
            data-reveal
            className="flex flex-col rounded-[1.5rem] border border-hairline bg-surface p-7"
          >
            <span aria-hidden className="font-display text-5xl leading-none text-primary">
              &ldquo;
            </span>
            <p className="mt-3 flex-1 leading-relaxed text-foreground/80">{item.quote}</p>
            <footer className="mt-7 flex items-center gap-3 border-t border-hairline pt-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-mono text-xs text-background">
                {initials(item.name)}
              </span>
              <span>
                <span className="block font-medium">{item.name}</span>
                <span className="block font-mono text-micro uppercase text-foreground/55">
                  {item.role}
                </span>
              </span>
            </footer>
          </blockquote>
        ))}
      </div>
    </Band>
  )
}
