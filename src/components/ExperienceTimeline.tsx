'use client'

import { motion } from 'framer-motion'
import { personal } from '@/config/personal'
import { ScrollReveal } from './ScrollReveal'
import { SectionLabel } from './SectionLabel'

function ExperienceEntry({
  experience,
  index,
}: {
  experience: (typeof personal.experience)[number]
  index: number
}) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <article className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-4 md:gap-12">
        {/* Left column — company + role */}
        <div className="md:sticky md:top-24 md:self-start">
          <h3 className="font-display text-heading-3 text-foreground">
            {experience.company}
          </h3>
          <span className="mt-1 block font-mono text-label uppercase tracking-[0.1em] text-accent">
            {experience.role}
          </span>
          {experience.period && (
            <span className="mt-1 block font-mono text-[0.6875rem] tracking-[0.08em] text-subtle">
              {experience.period}
            </span>
          )}
        </div>

        {/* Right column — responsibilities + tech */}
        <div>
          <ul className="space-y-2.5">
            {experience.responsibilities.map((item, i) => (
              <li key={i} className="flex gap-3 text-body-sm text-muted leading-relaxed">
                <span className="mt-2 w-1 h-1 rounded-full bg-accent shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[0.6875rem] tracking-[0.04em] text-subtle px-2.5 py-1 rounded border border-subtle"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </article>
    </ScrollReveal>
  )
}

export function ExperienceTimeline() {
  return (
    <section id="experience" className="py-section px-5 md:px-8">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <SectionLabel>Experience</SectionLabel>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <h2 className="font-display text-heading-1 text-foreground max-w-[20ch] mb-12 md:mb-16">
            Professional experience
            <span className="text-accent">.</span>
          </h2>
        </ScrollReveal>

        <div className="space-y-12 md:space-y-16">
          {personal.experience.map((exp, i) => (
            <ExperienceEntry key={exp.company} experience={exp} index={i} />
          ))}
        </div>

        {/* Divider between entries has the editorial accent line */}
        <motion.div
          className="mt-12 md:mt-16 section-divider"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left' }}
        />
      </div>
    </section>
  )
}