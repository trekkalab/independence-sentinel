'use client'

const tones: Record<string, string> = {
  default: 'border-stone-400 text-stone-700 bg-[#f7f1e6]',
  accent: 'border-[#8b6b2e] text-[#5f4718] bg-[#efe2bf]',
  dark: 'border-[#1c1a17] text-[#f7f1e6] bg-[#1c1a17]',
  muted: 'border-stone-300 text-stone-500 bg-[#fbf8f1]',
  warning: 'border-[#d6b463] text-[#4b3710] bg-[#f3e8c9]',
}

export function Tag({
  children,
  tone = 'default',
}: {
  children: React.ReactNode
  tone?: keyof typeof tones
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${tones[tone] || tones.default}`}
    >
      {children}
    </span>
  )
}
