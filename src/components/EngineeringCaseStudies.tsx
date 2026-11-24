'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { personal, type CaseStudy } from '@/config/personal'
import { ScrollReveal } from './ScrollReveal'
import { SectionLabel } from './SectionLabel'

const ease = [0.16, 1, 0.3, 1] as const

function CaseStudyCard({
  study,
  isExpanded,
  onToggle,
}: {
  study: CaseStudy
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <article className="border border-subtle rounded-lg overflow-hidden bg-surface">
      {/* Collapsed header — always visible */}
      <button
        onClick={onToggle}
        className="w-full text-left p-6 md:p-8 flex flex-col md:flex-row md:items-start gap-4 md:gap-8 group cursor-pointer"
        aria-expanded={isExpanded}
      >
        <span className="font-mono text-label text-accent tracking-[0.1em] shrink-0">
          {study.number}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-heading-3 text-foreground group-hover:text-accent transition-colors duration-200">
            {study.title}
          </h3>
          <p className="mt-1 text-body-sm text-muted">
            {study.subtitle}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {study.technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[0.6875rem] tracking-[0.04em] text-subtle px-2 py-0.5 rounded border border-subtle"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-muted shrink-0 mt-1 transition-transform duration-300 ${isExpanded ? 'rotate-45' : ''}`}
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M10 4v12M4 10h12" />
        </svg>
      </button>

      {/* Expanded detail */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-8 pb-8 pt-0 md:pl-[calc(theme(spacing.8)+3.5rem)]">
              <div className="border-t border-subtle pt-8 space-y-8">
                {/* Problem */}
                <div>
                  <h4 className="font-mono text-label uppercase tracking-[0.1em] text-accent mb-3">
                    Problem
                  </h4>
                  <p className="text-body-sm text-muted leading-relaxed max-w-prose">
                    {study.problem}
                  </p>
                </div>

                {/* Contribution */}
                <div>
                  <h4 className="font-mono text-label uppercase tracking-[0.1em] text-accent mb-3">
                    My Contribution
                  </h4>
                  <p className="text-body-sm text-muted leading-relaxed max-w-prose">
                    {study.contribution}
                  </p>
                </div>

                {/* Approach */}
                <div>
                  <h4 className="font-mono text-label uppercase tracking-[0.1em] text-accent mb-3">
                    Technical Approach
                  </h4>
                  <p className="text-body-sm text-muted leading-relaxed max-w-prose">
                    {study.approach}
                  </p>
                </div>

                {/* Challenges + Decisions side by side on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-mono text-label uppercase tracking-[0.1em] text-accent mb-3">
                      Engineering Challenges
                    </h4>
                    <ul className="space-y-2.5">
                      {study.challenges.map((c, i) => (
                        <li key={i} className="flex gap-3 text-body-sm text-muted leading-relaxed">
                          <span className="mt-2 w-1 h-1 rounded-full bg-accent shrink-0" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-mono text-label uppercase tracking-[0.1em] text-accent mb-3">
                      Technical Decisions
                    </h4>
                    <ul className="space-y-2.5">
                      {study.decisions.map((d, i) => (
                        <li key={i} className="flex gap-3 text-body-sm text-muted leading-relaxed">
                          <span className="mt-2 w-1 h-1 rounded-full bg-accent shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}

export function EngineeringCaseStudies() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section id="engineering-work" className="py-section px-5 md:px-8">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <SectionLabel>Engineering</SectionLabel>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <h2 className="font-display text-heading-1 text-foreground max-w-[24ch] mb-4">
            Selected engineering work
            <span className="text-accent">.</span>
          </h2>
          <p className="text-body text-muted max-w-prose mb-12 md:mb-16">
            Technical work across backend systems, real-time communication,
            workflow automation, and software testing.
          </p>
        </ScrollReveal>

        <div className="space-y-4">
          {personal.caseStudies.map((study, i) => (
            <ScrollReveal key={study.number} delay={i * 0.08}>
              <CaseStudyCard
                study={study}
                isExpanded={expandedIndex === i}
                onToggle={() =>
                  setExpandedIndex(expandedIndex === i ? null : i)
                }
              />
            </ScrollReveal>
          ))}
        </div>

        <motion.div
          className="mt-12 md:mt-16 section-divider"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          style={{ transformOrigin: 'left' }}
        />
      </div>
    </section>
  )
}