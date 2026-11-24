'use client'

import { motion } from 'framer-motion'
import { personal } from '@/config/personal'

const ease = [0.16, 1, 0.3, 1] as const

function ArchitectureConstellation() {
  const nodes = [
    { x: 40, y: 60, r: 4 },
    { x: 110, y: 30, r: 3 },
    { x: 180, y: 70, r: 5 },
    { x: 260, y: 25, r: 3.5 },
    { x: 70, y: 140, r: 3 },
    { x: 150, y: 120, r: 4.5 },
    { x: 240, y: 110, r: 3 },
    { x: 100, y: 210, r: 4 },
    { x: 200, y: 190, r: 5 },
    { x: 280, y: 170, r: 3.5 },
    { x: 55, y: 280, r: 3 },
    { x: 160, y: 260, r: 4 },
    { x: 250, y: 250, r: 3 },
    { x: 120, y: 330, r: 4.5 },
    { x: 220, y: 310, r: 3 },
  ]

  const connections = [
    [0, 1], [1, 2], [1, 5], [2, 3], [2, 6],
    [0, 4], [4, 5], [5, 8], [6, 9],
    [5, 7], [7, 8], [8, 9],
    [7, 11], [10, 11], [11, 12],
    [11, 13], [13, 14], [12, 14],
  ]

  const flowPaths = [
    { from: 1, to: 5, delay: 0 },
    { from: 5, to: 8, delay: 2.5 },
    { from: 8, to: 11, delay: 5 },
    { from: 11, to: 13, delay: 7.5 },
  ]

  return (
    <svg
      viewBox="0 0 320 380"
      className="w-full h-full"
      aria-hidden
    >
      {connections.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="var(--accent)"
          strokeWidth={0.8}
          opacity={0.1 + (i % 3) * 0.04}
        />
      ))}

      {flowPaths.map((fp, i) => {
        const a = nodes[fp.from]
        const b = nodes[fp.to]
        return (
          <circle key={`flow-${i}`} r={2} fill="var(--accent)" opacity={0.5}>
            <animateMotion
              dur="10s"
              repeatCount="indefinite"
              begin={`${fp.delay}s`}
              path={`M${a.x},${a.y} L${b.x},${b.y}`}
            />
          </circle>
        )
      })}

      {nodes.map((n, i) => (
        <g key={i}>
          <rect
            x={n.x - n.r}
            y={n.y - n.r}
            width={n.r * 2}
            height={n.r * 2}
            rx={1.5}
            fill="var(--accent)"
            opacity={i % 4 === 0 ? 0.3 : 0.15}
          />
        </g>
      ))}
    </svg>
  )
}

export function Hero() {
  return (
    <section className="min-h-[100dvh] flex flex-col justify-center relative px-5 md:px-8 overflow-hidden">
      <div className="max-w-content mx-auto w-full relative z-10">
        <motion.div
          className="flex items-center gap-4 mb-6 md:mb-8"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease }}
        >
          <div className="w-8 h-px bg-accent" />
          <span className="font-mono text-label uppercase tracking-[0.15em] text-accent">
            {personal.title}
          </span>
        </motion.div>

        <h1 className="font-display text-display italic leading-none tracking-tight">
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease }}
          >
            {personal.name.first}
          </motion.span>
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7, ease }}
          >
            {personal.name.last}
            <span className="text-accent">.</span>
          </motion.span>
        </h1>

        {personal.heroHeadline && (
          <motion.p
            className="mt-5 md:mt-6 font-display text-heading-2 text-foreground"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6, ease }}
          >
            {personal.heroHeadline}
          </motion.p>
        )}

        <motion.p
          className="mt-3 md:mt-4 text-body-lg text-muted max-w-[48ch]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.6, ease }}
        >
          {personal.heroDescriptor}
        </motion.p>

        <motion.div
          className="mt-5 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <span className="font-mono text-[0.6875rem] tracking-[0.1em] text-subtle uppercase">
            {personal.institution}
          </span>
          <span className="text-subtle">&middot;</span>
          <span className="font-mono text-[0.6875rem] tracking-[0.1em] text-subtle uppercase">
            {personal.year}
          </span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-wrap items-center gap-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.6, ease }}
        >
          <a
            href="#experience"
            className="group inline-flex items-center gap-3 text-[0.9375rem] text-foreground hover:text-accent transition-colors duration-200"
          >
            <span className="w-6 h-px bg-accent group-hover:w-10 transition-all duration-300" />
            View my work
          </a>
          {personal.contact.resume && (
            <a
              href={personal.contact.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-[0.9375rem] text-muted hover:text-accent transition-colors duration-200"
            >
              <span className="w-6 h-px bg-subtle group-hover:bg-accent group-hover:w-10 transition-all duration-300" />
              View r&eacute;sum&eacute;
              <svg className="w-3.5 h-3.5 opacity-50" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 1h8v8M11 1L1 11" />
              </svg>
            </a>
          )}
        </motion.div>

        {/* Social links */}
        <motion.div
          className="mt-6 flex items-center gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          {personal.contact.github && (
            <a
              href={personal.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-subtle hover:text-accent transition-colors duration-200"
            >
              <svg className="w-[18px] h-[18px]" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </a>
          )}
          {personal.contact.linkedin && (
            <a
              href={personal.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-subtle hover:text-accent transition-colors duration-200"
            >
              <svg className="w-[18px] h-[18px]" viewBox="0 0 16 16" fill="currentColor">
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 01.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
              </svg>
            </a>
          )}
          {personal.contact.email && (
            <a
              href={`mailto:${personal.contact.email}`}
              aria-label="Email"
              className="text-subtle hover:text-accent transition-colors duration-200"
            >
              <svg className="w-[18px] h-[18px]" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
                <rect x="1" y="3" width="14" height="10" rx="2" />
                <path d="M1 3l7 5 7-5" />
              </svg>
            </a>
          )}
        </motion.div>
      </div>

      {/* Engineering constellation — right side */}
      <motion.div
        className="absolute right-0 md:right-8 top-1/2 -translate-y-1/2 w-[280px] lg:w-[340px] h-[380px] hidden lg:block pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1.2 }}
        aria-hidden
      >
        <ArchitectureConstellation />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <span className="font-mono text-[0.625rem] tracking-[0.2em] text-subtle uppercase">
          Scroll
        </span>
        <div className="w-px h-8 origin-top animate-pulse-line bg-accent" style={{ opacity: 0.35 }} />
      </motion.div>
    </section>
  )
}