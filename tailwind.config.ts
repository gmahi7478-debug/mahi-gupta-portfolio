import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        surface: 'var(--surface)',
        elevated: 'var(--elevated)',
        muted: 'var(--muted)',
        subtle: 'var(--subtle)',
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          muted: 'var(--accent-muted)',
        },
      },
      borderColor: {
        DEFAULT: 'var(--border)',
        subtle: 'var(--border-subtle)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'Times New Roman', 'serif'],
        body: ['var(--font-body)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-mono)', 'Consolas', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '300' }],
        'heading-1': ['clamp(2.25rem, 5vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '400' }],
        'heading-2': ['clamp(1.75rem, 3.5vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '400' }],
        'heading-3': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.65' }],
        'body': ['1.0625rem', { lineHeight: '1.6' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.55' }],
        'label': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.1em', fontWeight: '500' }],
      },
      spacing: {
        'section': '8rem',
        'section-lg': '10rem',
      },
      maxWidth: {
        'content': '1200px',
        'prose': '720px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-left': {
          '0%': { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'pulse-line': {
          '0%, 100%': { transform: 'scaleY(1)', opacity: '0.4' },
          '50%': { transform: 'scaleY(0.5)', opacity: '0.8' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-left': 'slide-left 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-line': 'pulse-line 2s ease-in-out infinite',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

export default config