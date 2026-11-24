import { personal } from '@/config/personal'
import { ScrollReveal } from './ScrollReveal'
import { SectionLabel } from './SectionLabel'

export function TechnicalArsenal() {
  return (
    <section id="skills" className="py-section px-5 md:px-8">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <SectionLabel>Skills</SectionLabel>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <h2 className="font-display text-heading-1 text-foreground max-w-[20ch] mb-4">
            Technical arsenal<span className="text-accent">.</span>
          </h2>
          <p className="text-body text-muted max-w-prose mb-12 md:mb-16">
            Tools, languages, and frameworks I work with across backend
            development, distributed systems, and infrastructure.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 md:gap-y-12">
          {personal.skills.map((category, i) => (
            <ScrollReveal key={category.name} delay={i * 0.06}>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-5 h-px bg-accent" />
                  <h3 className="font-mono text-label uppercase tracking-[0.1em] text-accent">
                    {category.name}
                  </h3>
                </div>
                <ul className="space-y-1.5 pl-8">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="text-body-sm text-muted"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <p className="mt-12 font-mono text-[0.6875rem] tracking-[0.04em] text-subtle">
            Skills listed are provisional and subject to verification against
            r&eacute;sum&eacute;.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}