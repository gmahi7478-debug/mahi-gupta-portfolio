'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { personal, type PersonalProject } from '@/config/personal'
import { ScrollReveal } from './ScrollReveal'
import { SectionLabel } from './SectionLabel'

const ease = [0.16, 1, 0.3, 1] as const

function MLPlatformVisualization() {
  const models = [
    { label: 'Audio CNN', x: 60, y: 28 },
    { label: 'Traffic CNN', x: 200, y: 28 },
    { label: 'Shoplifting', x: 340, y: 28 },
    { label: 'Loan LGB', x: 110, y: 160 },
    { label: 'Sentiment', x: 290, y: 160 },
  ]
  const api = { x: 200, y: 94, w: 150, h: 30 }

  return (
    <svg
      viewBox="0 0 400 196"
      className="w-full h-auto"
      role="img"
      aria-label="Conceptual ML platform architecture: five models connected through a REST API layer"
    >
      {models.map((m, i) => {
        const topModel = i < 3
        const my = topModel ? m.y + 24 : m.y
        const ay = topModel ? api.y - api.h / 2 : api.y + api.h / 2
        return (
          <line
            key={`c${i}`}
            x1={m.x}
            y1={my}
            x2={api.x}
            y2={ay}
            stroke="var(--accent)"
            strokeWidth="1"
            opacity="0.25"
            strokeDasharray="4 3"
          />
        )
      })}

      <rect
        x={api.x - api.w / 2}
        y={api.y - api.h / 2}
        width={api.w}
        height={api.h}
        rx={4}
        fill="var(--accent)"
        opacity="0.12"
        stroke="var(--accent)"
        strokeWidth="1"
        strokeOpacity="0.35"
      />
      <text
        x={api.x}
        y={api.y + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--accent)"
        fontSize="9.5"
        fontFamily="var(--font-mono)"
        letterSpacing="0.08em"
      >
        REST API LAYER
      </text>

      {models.map((m, i) => (
        <g key={`m${i}`}>
          <rect
            x={m.x - 48}
            y={m.y}
            width={96}
            height={24}
            rx={3}
            fill="var(--surface)"
            stroke="var(--border-subtle)"
            strokeWidth="1"
          />
          <text
            x={m.x}
            y={m.y + 13}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--muted)"
            fontSize="9"
            fontFamily="var(--font-mono)"
          >
            {m.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

function YogaPoseVisualization() {
  const joints = [
    { x: 100, y: 15 },
    { x: 100, y: 38 },
    { x: 72, y: 50 },
    { x: 128, y: 50 },
    { x: 48, y: 72 },
    { x: 155, y: 68 },
    { x: 30, y: 95 },
    { x: 175, y: 88 },
    { x: 100, y: 98 },
    { x: 84, y: 106 },
    { x: 116, y: 106 },
    { x: 74, y: 142 },
    { x: 135, y: 138 },
    { x: 70, y: 178 },
    { x: 148, y: 172 },
  ]

  const bones: [number, number][] = [
    [0, 1],
    [1, 2],
    [1, 3],
    [2, 4],
    [3, 5],
    [4, 6],
    [5, 7],
    [1, 8],
    [8, 9],
    [8, 10],
    [9, 11],
    [10, 12],
    [11, 13],
    [12, 14],
  ]

  return (
    <svg
      viewBox="0 0 200 196"
      className="w-full h-auto max-w-[200px] mx-auto"
      role="img"
      aria-label="Conceptual pose estimation visualization: human figure with joint landmarks and connecting lines"
    >
      {bones.map(([a, b], i) => (
        <line
          key={i}
          x1={joints[a].x}
          y1={joints[a].y}
          x2={joints[b].x}
          y2={joints[b].y}
          stroke="var(--accent)"
          strokeWidth="2"
          opacity="0.25"
          strokeLinecap="round"
        />
      ))}

      <circle
        cx={joints[0].x}
        cy={joints[0].y}
        r={10}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.5"
        opacity="0.35"
      />

      {joints.map((j, i) => (
        <circle
          key={i}
          cx={j.x}
          cy={j.y}
          r={i === 0 ? 3.5 : 4}
          fill="var(--accent)"
          opacity={i === 0 ? 0.8 : 0.55}
        />
      ))}
    </svg>
  )
}

function AwardBadge({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[var(--accent-muted)] border border-[var(--accent)] border-opacity-20">
      <svg
        className="w-3.5 h-3.5 text-accent shrink-0"
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        <path d="M8 0l2.5 5.3L16 6.2l-4 3.8 1 5.5L8 12.8l-5 2.7 1-5.5L0 6.2l5.5-.9z" />
      </svg>
      <span className="font-mono text-[0.6875rem] tracking-[0.04em] text-accent">
        {text}
      </span>
    </div>
  )
}

function MetricsGrid({
  metrics,
}: {
  metrics: NonNullable<PersonalProject['metrics']>
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {metrics.map((m) => (
        <div
          key={m.label}
          className="text-center p-3 rounded-lg bg-[var(--background)] border border-[var(--border-subtle)]"
        >
          <span className="block font-display text-[1.5rem] md:text-[1.75rem] italic text-accent leading-none">
            {m.value}
          </span>
          <span className="block mt-1.5 font-mono text-[0.6rem] tracking-[0.08em] text-subtle uppercase leading-tight">
            {m.label}
          </span>
          {m.detail && (
            <span className="block mt-0.5 text-[0.65rem] text-subtle">
              {m.detail}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

function FeaturedProject({
  project,
  visualization,
  index,
}: {
  project: PersonalProject
  visualization: React.ReactNode
  index: number
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <ScrollReveal delay={index * 0.1}>
      <article className="border border-subtle rounded-lg overflow-hidden bg-surface">
        <div className="p-6 md:p-10">
          {project.award && (
            <div className="mb-5">
              <AwardBadge text={project.award} />
            </div>
          )}

          <h3 className="font-display text-heading-2 text-foreground">
            {project.title}
          </h3>

          <p className="mt-3 text-body text-muted max-w-prose">
            {project.description}
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {visualization && (
              <div className="p-4 md:p-6 rounded-lg border border-subtle bg-[var(--background)]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-4 h-px bg-accent" />
                  <span className="font-mono text-[0.625rem] tracking-[0.1em] text-subtle uppercase">
                    Conceptual Illustration
                  </span>
                </div>
                {visualization}
              </div>
            )}

            {project.metrics && project.metrics.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-4 h-px bg-accent" />
                  <span className="font-mono text-[0.625rem] tracking-[0.1em] text-subtle uppercase">
                    Reported Evaluation Metrics
                  </span>
                </div>
                <MetricsGrid metrics={project.metrics} />
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[0.6875rem] tracking-[0.04em] text-subtle px-2.5 py-1 rounded border border-subtle"
              >
                {tech}
              </span>
            ))}
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-6 group inline-flex items-center gap-3 text-body-sm text-muted hover:text-accent transition-colors duration-200 cursor-pointer"
            aria-expanded={expanded}
          >
            <span className="w-4 h-px bg-accent group-hover:w-6 transition-all duration-300" />
            {expanded ? 'Hide details' : 'Technical details'}
            <svg
              className={`w-3 h-3 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M2 4l4 4 4-4" />
            </svg>
          </button>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease }}
                className="overflow-hidden"
              >
                <div className="pt-6 space-y-6">
                  {project.features.length > 0 && (
                    <div>
                      <h4 className="font-mono text-label uppercase tracking-[0.1em] text-accent mb-3">
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {project.features.map((f, i) => (
                          <li
                            key={i}
                            className="flex gap-3 text-body-sm text-muted leading-relaxed"
                          >
                            <span className="mt-2 w-1 h-1 rounded-full bg-accent shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h4 className="font-mono text-label uppercase tracking-[0.1em] text-accent mb-3">
                      Technical Approach
                    </h4>
                    <p className="text-body-sm text-muted leading-relaxed max-w-prose">
                      {project.approach}
                    </p>
                  </div>

                  {(project.github || project.demo) && (
                    <div className="flex flex-wrap gap-4 pt-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 text-body-sm text-muted hover:text-accent transition-colors duration-200"
                        >
                          <span className="w-4 h-px bg-accent group-hover:w-6 transition-all duration-300" />
                          GitHub
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
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 text-body-sm text-muted hover:text-accent transition-colors duration-200"
                        >
                          <span className="w-4 h-px bg-accent group-hover:w-6 transition-all duration-300" />
                          Live Demo
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
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </article>
    </ScrollReveal>
  )
}

const VISUALIZATIONS: Record<string, React.ReactNode> = {
  'Multi-Domain ML Platform': <MLPlatformVisualization />,
  'AI-Based Yoga Pose Detection': <YogaPoseVisualization />,
}

export function PersonalProjects() {
  if (personal.projects.length === 0) return null

  return (
    <section id="projects" className="py-section px-5 md:px-8">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <SectionLabel>Projects</SectionLabel>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <h2 className="font-display text-heading-1 text-foreground max-w-[20ch] mb-4">
            Personal projects<span className="text-accent">.</span>
          </h2>
          <p className="text-body text-muted max-w-prose mb-12 md:mb-16">
            Independent work exploring ideas and technologies beyond
            professional engagements.
          </p>
        </ScrollReveal>

        <div className="space-y-8">
          {personal.projects.map((project, i) => (
            <FeaturedProject
              key={project.title}
              project={project}
              visualization={VISUALIZATIONS[project.title] ?? null}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}