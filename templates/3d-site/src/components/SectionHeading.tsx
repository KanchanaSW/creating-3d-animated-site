export function SectionHeading({
  eyebrow,
  title,
  size = 'heading',
  className = '',
}: {
  eyebrow?: string
  title: string
  size?: 'heading' | 'statement'
  className?: string
}) {
  return (
    <div className={className}>
      {eyebrow ? (
        <p data-reveal className="flex items-center gap-3 font-mono text-micro uppercase text-foreground/60">
          <span aria-hidden className="h-px w-8 bg-primary" />
          {eyebrow}
        </p>
      ) : null}
      <h2
        data-reveal
        className={`font-display mt-5 max-w-3xl font-medium ${
          size === 'statement' ? 'text-statement' : 'text-heading'
        }`}
      >
        {title}
      </h2>
    </div>
  )
}
