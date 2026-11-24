import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { Introduction } from '@/components/Introduction'
import { ExperienceTimeline } from '@/components/ExperienceTimeline'
import { EngineeringCaseStudies } from '@/components/EngineeringCaseStudies'
import { ArchitecturePlayground } from '@/components/ArchitecturePlayground'
import { PersonalProjects } from '@/components/PersonalProjects'
import { TechnicalArsenal } from '@/components/TechnicalArsenal'
import { SectionLabel } from '@/components/SectionLabel'
import { ScrollReveal } from '@/components/ScrollReveal'
import { personal } from '@/config/personal'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />

        <div className="max-w-content mx-auto px-5 md:px-8">
          <div className="section-divider" />
        </div>

        <Introduction />
        <ExperienceTimeline />
        <EngineeringCaseStudies />
        <PersonalProjects />
        <ArchitecturePlayground />
        <TechnicalArsenal />

        {/* Education & Certifications */}
        <section id="education" className="py-20 px-5 md:px-8">
          <div className="max-w-content mx-auto">
            <ScrollReveal>
              <SectionLabel>Education</SectionLabel>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <h2 className="font-display text-heading-1 text-foreground mb-10 md:mb-14">
                Academic background<span className="text-accent">.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-16 items-start">
                <div>
                  <h3 className="font-display text-heading-2 text-foreground">
                    {personal.institutionFull}
                  </h3>
                  <p className="mt-2 text-body text-muted">
                    {personal.degree}
                  </p>
                  <span className="mt-1 block font-mono text-label uppercase tracking-[0.1em] text-subtle">
                    {personal.year}
                  </span>
                </div>

                {personal.academics.length > 0 && (
                  <div className="flex gap-6 md:gap-8">
                    {personal.academics.map((record) => (
                      <div key={record.label} className="text-center">
                        <span className="block font-display text-[2rem] md:text-[2.5rem] italic text-accent leading-none">
                          {record.value}
                        </span>
                        <span className="block mt-2 font-mono text-[0.625rem] tracking-[0.12em] text-subtle uppercase">
                          {record.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>

            {/* Certifications */}
            {personal.certifications.length > 0 && (
              <ScrollReveal delay={0.2}>
                <div className="mt-14 md:mt-16 pt-10 border-t border-subtle">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-5 h-px bg-accent" />
                    <h3 className="font-mono text-label uppercase tracking-[0.1em] text-accent">
                      Certifications
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {personal.certifications.map((cert) => (
                      <div
                        key={cert.title}
                        className="flex items-start gap-3 py-3"
                      >
                        <span className="mt-2 w-1 h-1 rounded-full bg-accent shrink-0" />
                        <div className="min-w-0">
                          <span className="text-body-sm text-foreground">
                            {cert.title}
                          </span>
                          <span className="block text-[0.75rem] text-subtle mt-0.5">
                            {cert.issuer}
                            {cert.date && ` · ${cert.date}`}
                          </span>
                          {cert.url && (
                            <a
                              href={cert.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[0.75rem] text-accent hover:text-accent-hover transition-colors"
                            >
                              Verify
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>
        </section>

        {/* Achievements */}
        {personal.achievements.length > 0 && (
          <section className="py-12 px-5 md:px-8">
            <div className="max-w-content mx-auto">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-5 h-px bg-accent" />
                  <h3 className="font-mono text-label uppercase tracking-[0.1em] text-accent">
                    Achievements
                  </h3>
                </div>
                <div className="flex flex-wrap gap-8 md:gap-12">
                  {personal.achievements.map((a) => (
                    <div key={a.highlight}>
                      <span className="font-display text-heading-3 italic text-accent">
                        {a.highlight}
                      </span>
                      <span className="block mt-1 text-body-sm text-muted">
                        {a.description}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>
        )}

        {/* Beyond Engineering */}
        {personal.leadership.length > 0 && (
          <section className="py-12 px-5 md:px-8">
            <div className="max-w-content mx-auto">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-5 h-px bg-accent" />
                  <h3 className="font-mono text-label uppercase tracking-[0.1em] text-accent">
                    Beyond Engineering
                  </h3>
                </div>
                <div className="space-y-4">
                  {personal.leadership.map((l) => (
                    <div
                      key={l.role + l.organization}
                      className="flex gap-3"
                    >
                      <span className="mt-2 w-1 h-1 rounded-full bg-accent shrink-0" />
                      <div>
                        <span className="text-body-sm text-foreground">
                          {l.role}
                        </span>
                        {l.organization && (
                          <span className="text-body-sm text-muted">
                            {' '}&mdash; {l.organization}
                          </span>
                        )}
                        <p className="text-body-sm text-muted mt-0.5">
                          {l.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>
        )}

        {/* Contact */}
        <section id="contact" className="py-20 px-5 md:px-8">
          <div className="max-w-content mx-auto">
            <ScrollReveal>
              <SectionLabel>Contact</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-display text-heading-1 text-foreground max-w-[20ch] mb-6">
                Let&apos;s build something
                <span className="text-accent">.</span>
              </h2>
              <p className="text-muted text-body-lg max-w-prose mb-8">
                Open to software engineering opportunities. Reach out to discuss
                how I can contribute to your team.
              </p>
              <div className="flex flex-wrap gap-6">
                {personal.contact.email && (
                  <a
                    href={`mailto:${personal.contact.email}`}
                    className="group inline-flex items-center gap-3 text-[0.9375rem] text-muted hover:text-accent transition-colors duration-200"
                  >
                    <span className="w-6 h-px bg-accent group-hover:w-10 transition-all duration-300" />
                    Email
                  </a>
                )}
                {personal.contact.linkedin && (
                  <a
                    href={personal.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 text-[0.9375rem] text-muted hover:text-accent transition-colors duration-200"
                  >
                    <span className="w-6 h-px bg-accent group-hover:w-10 transition-all duration-300" />
                    LinkedIn
                  </a>
                )}
                {personal.contact.github && (
                  <a
                    href={personal.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 text-[0.9375rem] text-muted hover:text-accent transition-colors duration-200"
                  >
                    <span className="w-6 h-px bg-accent group-hover:w-10 transition-all duration-300" />
                    GitHub
                  </a>
                )}
                {personal.contact.resume && (
                  <a
                    href={personal.contact.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 text-[0.9375rem] text-muted hover:text-accent transition-colors duration-200"
                  >
                    <span className="w-6 h-px bg-accent group-hover:w-10 transition-all duration-300" />
                    R&eacute;sum&eacute;
                    <svg
                      className="w-3 h-3 opacity-50"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M3 1h8v8M11 1L1 11" />
                    </svg>
                  </a>
                )}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-5 md:px-8 border-t border-subtle">
          <div className="max-w-content mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-mono text-[0.6875rem] tracking-[0.08em] text-subtle uppercase">
              {personal.name.full} &middot; 2026
            </span>
            <span className="font-mono text-[0.6875rem] tracking-[0.08em] text-subtle">
              Designed &amp; built with intention.
            </span>
          </div>
        </footer>
      </main>
    </>
  )
}