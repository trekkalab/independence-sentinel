export function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="border border-stone-300 bg-[#fffdf8] p-4">
      <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500">
        {label}
      </div>
      <div className="mt-2 text-2xl font-bold text-[#1f1a14]">{value}</div>
    </div>
  )
}
