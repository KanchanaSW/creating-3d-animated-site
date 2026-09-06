import { siteConfig } from '../config/site'

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-hairline bg-surface/90 px-6 py-16">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_1fr]">
        <div className="max-w-md">
          <p className="font-display text-2xl font-medium">{siteConfig.title}</p>
          <p className="mt-4 text-foreground/65">{siteConfig.footer.blurb}</p>
        </div>
        <nav className="flex flex-col gap-3 md:items-end">
          {siteConfig.footer.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-foreground/70 transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="mx-auto mt-14 flex max-w-6xl flex-col gap-4 border-t border-hairline pt-6 font-mono text-micro uppercase text-foreground/45 md:flex-row md:items-start md:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.title}
        </p>
        <p>Rendered with Three.js WebGPU</p>
      </div>
    </footer>
  )
}
