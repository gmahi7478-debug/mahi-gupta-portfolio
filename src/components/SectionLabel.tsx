export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <div className="w-8 h-px bg-accent" />
      <span className="font-mono text-label uppercase tracking-[0.15em] text-accent">
        {children}
      </span>
    </div>
  )
}