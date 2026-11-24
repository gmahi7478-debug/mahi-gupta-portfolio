import { ScrollReveal } from './ScrollReveal'
import { SectionLabel } from './SectionLabel'
import { personal } from '@/config/personal'

export function Introduction() {
  const hasPortrait = !!personal.portrait

  return (
    <section id="about" className="py-section px-5 md:px-8">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <SectionLabel>About</SectionLabel>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div
            className={
              hasPortrait
                ? 'grid grid-cols-1 md:grid-cols-[1fr_280px] gap-10 md:gap-14 items-start'
                : 'max-w-prose mx-auto'
            }
          >
            <div className={hasPortrait ? '' : ''}>
              <p className="text-body-lg leading-[1.7] text-foreground intro-drop-cap">
                {personal.introduction}
              </p>

              <div className="mt-10 flex flex-wrap gap-2">
                {personal.domains.map((domain) => (
                  <span
                    key={domain}
                    className="font-mono text-[0.6875rem] tracking-[0.04em] text-muted px-3 py-1.5 rounded border border-subtle bg-surface"
                  >
                    {domain}
                  </span>
                ))}
              </div>
            </div>

            {hasPortrait && (
              <div className="relative order-first md:order-last">
                <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-accent" />
                <img
                  src={personal.portrait}
                  alt={personal.name.full}
                  className="w-full rounded-lg pl-4 grayscale-[20%]"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}