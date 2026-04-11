export function SectionHeader({
  title,
  kicker,
}: {
  title: string
  kicker: string
}) {
  return (
    <div className="mb-4 border-b-2 border-[#1c1a17] pb-2">
      <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-stone-500">
        {kicker}
      </div>
      <h2 className="mt-1 font-serif text-3xl font-bold text-[#1f1a14]">
        {title}
      </h2>
    </div>
  )
}
