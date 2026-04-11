import Link from 'next/link'
import { SECTIONS } from '@/lib/utils'

export function Masthead() {
  const today = new Date()
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <header className="border-b-4 border-[#1c1a17] bg-[#f4ecdd]">
      {/* Edition line */}
      <div className="border-b border-stone-400 bg-[#f7f1e6] px-5 py-2">
        <div className="mx-auto grid max-w-7xl items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-stone-600 md:grid-cols-3">
          <div className="text-left">Vol. 1</div>
          <div className="text-center">{dateStr} &bull; Independence, Missouri</div>
          <div className="text-right">Morning Edition</div>
        </div>
      </div>

      {/* Masthead */}
      <div className="px-5 py-6 text-center">
        <div className="text-[11px] font-bold uppercase tracking-[0.35em] text-stone-500">
          In the Spirit of the Historic Independence Sentinel
        </div>
        <Link href="/">
          <h1 className="mt-2 font-serif text-5xl font-black tracking-tight text-[#181512] md:text-7xl">
            The Independence Sentinel
          </h1>
        </Link>
        <div className="mt-2 text-sm font-semibold uppercase tracking-[0.24em] text-stone-600">
          A Town Paper for Independence &bull; Civic Life &bull; Commerce &bull; Community &bull; Record
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t border-stone-400 px-5 py-3">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-4 text-sm font-bold uppercase tracking-[0.16em] text-[#2a241d] md:gap-6">
          {SECTIONS.map((item) => (
            <Link
              key={item.value}
              href={item.href}
              className="transition-colors hover:text-[#8b6b2e]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
