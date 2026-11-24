'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { personal } from '@/config/personal'
import { cn } from '@/lib/utils'

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = useMemo(() => {
    const base: { label: string; href: string }[] = [...personal.navLinks]
    if (personal.projects.length > 0) {
      const engineeringIdx = base.findIndex(
        (l) => l.href === '#engineering-work'
      )
      base.splice(engineeringIdx + 1, 0, {
        label: 'Projects',
        href: '#projects',
      })
    }
    return base
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled && 'nav-scrolled'
        )}
      >
        <div className="max-w-content mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <a
            href="#"
            className="font-mono text-label uppercase tracking-[0.15em] text-muted hover:text-foreground transition-colors duration-200"
          >
            {personal.initials}
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[0.9375rem] text-muted hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            {personal.contact.resume && (
              <a
                href={personal.contact.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-label uppercase tracking-[0.1em] text-accent hover:text-accent-hover transition-colors duration-200"
              >
                R&eacute;sum&eacute;
                <svg
                  className="w-3 h-3"
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

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-6 h-3 flex flex-col justify-between z-50"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              className={cn(
                'absolute left-0 w-full h-px bg-foreground transition-all duration-300 origin-center',
                mobileOpen ? 'top-1/2 -translate-y-px rotate-45' : 'top-0'
              )}
            />
            <span
              className={cn(
                'absolute left-0 w-full h-px bg-foreground transition-all duration-300 origin-center',
                mobileOpen
                  ? 'bottom-1/2 translate-y-px -rotate-45'
                  : 'bottom-0'
              )}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-background flex flex-col justify-center px-8"
          >
            <nav className="flex flex-col gap-6">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.05 + i * 0.06,
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-display text-[2rem] text-foreground hover:text-accent transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              {personal.contact.resume && (
                <motion.a
                  href={personal.contact.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.05 + links.length * 0.06,
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-display text-[2rem] text-accent hover:text-accent-hover transition-colors"
                >
                  R&eacute;sum&eacute;
                </motion.a>
              )}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="absolute bottom-10 left-8 font-mono text-label text-subtle uppercase tracking-[0.15em]"
            >
              {personal.name.full}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}