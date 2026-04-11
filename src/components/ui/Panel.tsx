export function Panel({
  title,
  subtitle,
  children,
  className = '',
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      className={`border border-stone-300 bg-[#fffdf8] shadow-[0_1px_0_rgba(0,0,0,0.03)] ${className}`}
    >
      <div className="border-b border-stone-300 bg-[#f7f1e6] px-5 py-4">
        <div className="text-sm font-bold uppercase tracking-[0.18em] text-[#1f1a14]">
          {title}
        </div>
        {subtitle ? (
          <div className="mt-1 text-sm text-stone-600">{subtitle}</div>
        ) : null}
      </div>
      <div className="p-5">{children}</div>
    </section>
  )
}
