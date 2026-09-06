import { siteConfig } from '../config/site'
import { Band } from './Band'
import { SectionHeading } from './SectionHeading'

export function About() {
  const { about } = siteConfig

  return (
    <Band id={about.id} tone={about.tone ?? 'base'} glow>
      <div className="grid items-start gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <SectionHeading eyebrow={about.eyebrow} title={about.title} size="statement" />
          {about.body.split('\n\n').map((paragraph) => (
            <p key={paragraph} data-reveal className="mt-6 max-w-xl text-sub text-foreground/70">
              {paragraph}
            </p>
          ))}
          <dl className="mt-12 grid grid-cols-3 gap-6">
            {about.stats.map((stat) => (
              <div key={stat.label} data-reveal className="border-t border-hairline pt-4">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-4xl font-medium text-primary sm:text-5xl">
                  {stat.value}
                </dd>
                <p className="mt-2 font-mono text-micro uppercase text-foreground/55">{stat.label}</p>
              </div>
            ))}
          </dl>
        </div>

        <div
          data-reveal
          className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-hairline bg-transparent sm:min-h-[560px]"
        >
          <div
            aria-hidden
            className="absolute -inset-x-4 -bottom-5 top-10 rounded-[2rem] bg-primary/10"
          />
          <p className="absolute bottom-6 left-6 font-mono text-micro uppercase text-foreground/50">
            Live scene
          </p>
        </div>
      </div>
    </Band>
  )
}
