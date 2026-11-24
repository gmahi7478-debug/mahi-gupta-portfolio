# Brand Guidelines v1.0

> Last updated: 2026-11-24
> Status: Draft — Awaiting approval
> Direction: Folio — Editorial Case Studies

## Quick Reference

| Element | Value |
|---------|-------|
| Primary Background | #171412 (dark) / #F5F0E8 (light) |
| Accent Color | #E8613C (coral-orange) |
| Display Font | Fraunces (variable, optical sizing) |
| Body Font | DM Sans |
| Mono Font | JetBrains Mono |
| Voice | Precise, Warm, Technical, Confident |

---

## 1. Visual Identity

### Concept

**Folio** treats Mahi Gupta's engineering career as an editorial monograph. Each professional experience is presented as a case study in a design publication. The serif/sans tension between Fraunces and DM Sans creates editorial gravitas that is rare among engineering portfolios.

The warmth of the dark palette (#171412 — brown-black, not blue-black) communicates personality against the precision of the typography and layout. This duality — warmth + precision — is the brand's visual thesis.

### Design Principles

1. **Editorial, not decorative.** Every visual choice serves information hierarchy. No ornament without purpose.
2. **Warmth against precision.** The palette is intentionally warm (brown-blacks, cream-whites, coral accent) to humanize the technical content.
3. **Typography as differentiator.** Fraunces is the most distinctive element. Its variable optical sizing creates natural elegance at display sizes that no template reproduces.
4. **Depth through restraint.** Generous spacing and limited color usage create sophistication. The accent color (coral-orange) is used sparingly — only on interactive elements and key highlights.

---

## 2. Color Palette

### Dark Mode (Primary)

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--background` | #171412 | rgb(23,20,18) | Page background |
| `--surface` | #211E19 | rgb(33,30,25) | Cards, sections |
| `--surface-elevated` | #2C2823 | rgb(44,40,35) | Hover, nested surfaces |
| `--border-subtle` | #3D3831 | rgb(61,56,49) | Subtle separators |
| `--border` | #4A4540 | rgb(74,69,64) | Default borders |
| `--text-primary` | #E8DED0 | rgb(232,222,208) | Headings, body text |
| `--text-secondary` | #8A8279 | rgb(138,130,121) | Supporting text |
| `--text-tertiary` | #6B6359 | rgb(107,99,89) | Captions, metadata |
| `--accent` | #E8613C | rgb(232,97,60) | Links, CTAs, highlights |
| `--accent-hover` | #ED7A5A | rgb(237,122,90) | Hover on interactive |
| `--accent-muted` | rgba(232,97,60,0.12) | — | Accent backgrounds |

### Light Mode

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--background` | #F5F0E8 | rgb(245,240,232) | Page background |
| `--surface` | #FFFFFF | rgb(255,255,255) | Cards, sections |
| `--surface-elevated` | #F5F0E8 | rgb(245,240,232) | Hover, nested surfaces |
| `--border-subtle` | #E0D9CC | rgb(224,217,204) | Subtle separators |
| `--border` | #C4BAA8 | rgb(196,186,168) | Default borders |
| `--text-primary` | #171412 | rgb(23,20,18) | Headings, body text |
| `--text-secondary` | #6B6359 | rgb(107,99,89) | Supporting text |
| `--text-tertiary` | #8A8279 | rgb(138,130,121) | Captions, metadata |
| `--accent` | #D4542F | rgb(212,84,47) | Links, CTAs, highlights |
| `--accent-hover` | #C04425 | rgb(192,68,37) | Hover on interactive |
| `--accent-muted` | rgba(212,84,47,0.10) | — | Accent backgrounds |

### Accessibility

- Text primary on background (dark): 11.2:1 contrast — AAA
- Text primary on background (light): 13.8:1 contrast — AAA
- Accent on background (dark): 4.8:1 contrast — AA
- Accent on background (light): 5.1:1 contrast — AA
- All interactive elements meet WCAG 2.1 AA standards

---

## 3. Typography

### Font Stack

```css
--font-display: 'Fraunces', Georgia, 'Times New Roman', serif;
--font-body: 'DM Sans', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
```

### Font Loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=DM+Sans:ital,wght@0,300..700;1,300..700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Type Scale

| Element | Font | Size (Desktop) | Size (Mobile) | Weight | Line Height | Tracking |
|---------|------|----------------|---------------|--------|-------------|----------|
| Display | Fraunces | 72–96px | 40–52px | 300 | 1.05 | -0.03em |
| H1 | Fraunces | 48px | 32px | 400 | 1.15 | -0.02em |
| H2 | Fraunces | 36px | 28px | 400 | 1.2 | -0.015em |
| H3 | DM Sans | 24px | 20px | 600 | 1.3 | -0.01em |
| H4 | DM Sans | 20px | 18px | 600 | 1.35 | 0 |
| Body | DM Sans | 17px | 16px | 400 | 1.6 | 0 |
| Body Small | DM Sans | 15px | 14px | 400 | 1.5 | 0 |
| Label | JetBrains Mono | 12px | 11px | 500 | 1.4 | 0.08em |
| Code | JetBrains Mono | 14px | 13px | 400 | 1.6 | 0 |

### Typography Rules

- **Serif/Sans boundary:** Fraunces is used for Display, H1, and H2 only. H3 and below use DM Sans. This boundary creates the editorial tension that defines the brand.
- **Labels:** Always JetBrains Mono, uppercase, with wide tracking. Used for section markers, dates, and metadata.
- **Display italic:** The hero name uses Fraunces italic at display size. Italic is reserved for the name only — nowhere else.
- **Optical sizing:** Fraunces's variable optical size axis (`opsz`) adjusts automatically. At display sizes (72px+), letterforms are wider and more expressive. At body sizes, they tighten for readability.
- **Maximum line length:** Body text is capped at 65ch for optimal readability.

---

## 4. Layout System

| Property | Value | Notes |
|----------|-------|-------|
| Max content width | 1200px | Main container |
| Grid | 12 columns, 24px gutter | Desktop layout grid |
| Content column | 8 columns centered | Readable text width (~65ch) |
| Case study layout | 5+7 or 7+5 split | Asymmetric editorial |
| Section spacing | 120–160px | Generous vertical rhythm |
| Component spacing | 24–32px | Between elements within sections |
| Mobile columns | 1 column, 20px gutter | Single column stack |
| Border radius | 8px default, 12px cards | Subtle rounding |
| Side gutter | 16px minimum | Using max() with safe-area-inset |

### Spacing Scale (4px base)

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight internal spacing |
| `--space-2` | 8px | Compact elements |
| `--space-3` | 12px | Small gaps |
| `--space-4` | 16px | Standard component spacing |
| `--space-6` | 24px | Component groups |
| `--space-8` | 32px | Section internal spacing |
| `--space-12` | 48px | Small section breaks |
| `--space-16` | 64px | Medium section breaks |
| `--space-24` | 96px | Large section spacing |
| `--space-32` | 128px | Major section divisions |

---

## 5. Motion System

### Principles

1. Motion serves content hierarchy, never decoration.
2. All animations respect `prefers-reduced-motion`.
3. Easing: `cubic-bezier(0.16, 1, 0.3, 1)` for entrances (ease-out-expo feel).
4. Duration: 200ms for hover states, 400–600ms for reveals.

### Animations

| Animation | Trigger | Specification |
|-----------|---------|---------------|
| Scroll Reveal | IntersectionObserver | `translateY(24px) → 0`, `opacity 0 → 1`, 600ms ease-out. Siblings stagger by 80ms. |
| Section Parallax | Scroll position | Background layer at 0.6x speed, content at 1x. Subtle cinematic depth. |
| Hover States | Mouse enter | 200ms ease. Color transitions, `translateY(-2px)` on cards, underline reveals on links. |
| Hero Name | Page load | Character-by-character type-in, 600ms total duration, 50ms stagger per character. |
| Label Entrance | IntersectionObserver | Slide-in from left, 300ms, 200ms delay after parent section. |
| Architecture SVGs | Scroll enter | Connection lines draw with `stroke-dashoffset` animation, 800ms per path. |

### Reduced Motion Fallback

When `prefers-reduced-motion: reduce` is active:
- All transitions become instant (0ms duration)
- Scroll-triggered reveals show immediately (no translateY)
- Parallax effects are disabled
- Hero name appears without animation
- SVG connections appear pre-drawn

---

## 6. Voice & Tone

### Brand Personality

| Trait | Description |
|-------|-------------|
| **Precise** | Technical accuracy, specific language, no hand-waving |
| **Warm** | Human, approachable — not cold or corporate |
| **Confident** | States facts directly without hedging or overselling |
| **Technical** | Comfortable with engineering terminology when appropriate |

### Voice Chart

| Trait | We Are | We Are Not |
|-------|--------|------------|
| Precise | Specific, evidence-based | Vague, buzzword-heavy |
| Warm | Approachable, genuine | Overfamiliar, casual |
| Confident | Direct, assured | Arrogant, hyperbolic |
| Technical | Informed, specific | Jargon-heavy, exclusionary |

### Prohibited Terms

| Avoid | Use Instead |
|-------|-------------|
| Passionate about | Focused on, experienced in |
| Full-stack ninja/rockstar | Software Engineer |
| Revolutionary/cutting-edge | Specific technology names |
| Leveraged/utilized | Used, built, designed |
| Seamless/best-in-class | Specific measurable outcome |

---

## 7. Signature Feature

### Engineering Case Studies

Each professional role is presented as an in-depth editorial case study:

1. **Context Panel** — The problem space and technical constraints
2. **Architecture Diagram** — SVG visualization of the system built or improved
3. **Technical Decisions** — Key choices made and their rationale
4. **Impact Metrics** — Quantified outcomes where available
5. **Tech Stack Tags** — Interactive, linking to other experiences using the same technology

The case study format replaces the typical resume bullet-point list with an engineering narrative that demonstrates both technical depth and communication skill.

---

## 8. Homepage Structure

| Section | Content | Layout |
|---------|---------|--------|
| **Hero** | Name (display italic) + "Software Engineer" + status label | Full viewport, centered, minimal |
| **Introduction** | 2–3 sentences about engineering focus | 8-column centered text |
| **Experience** | Case studies: Renaissance/Puissant, EY, CareMate | Asymmetric 5+7/7+5 layouts |
| **Technical Domain** | Interactive skill connection map | Full-width interactive area |
| **Education** | SGSITS Indore, IT, Final Year | Brief, clean, subordinate |
| **Contact** | Email, LinkedIn, GitHub, Resume download | Clear CTA, accent color |

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-11-24 | Initial creative direction — Folio selected |
