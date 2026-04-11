import Link from 'next/link'

const adminNav = [
  { label: 'Reporter Portal', href: '/portal' },
  { label: 'Editorial Queue', href: '/editorial/queue' },
  { label: 'Teacher Review', href: '/teacher' },
  { label: 'Ad Management', href: '/ads' },
  { label: 'CMS Admin', href: '/admin' },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#e9dfcd] text-stone-900">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        {/* Admin header */}
        <div className="mb-4 border border-stone-400 bg-[#f4ecdd]">
          <div className="border-b border-stone-400 px-5 py-3">
            <div className="flex items-center justify-between">
              <Link href="/" className="font-serif text-xl font-black text-[#181512]">
                The Independence Sentinel
              </Link>
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">
                Newsroom Portal
              </div>
            </div>
          </div>
          <nav className="flex flex-wrap gap-1 px-5 py-3">
            {adminNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border border-stone-300 bg-[#faf6ee] px-4 py-2 text-sm font-bold uppercase tracking-[0.12em] text-stone-700 transition-colors hover:bg-[#1c1a17] hover:text-[#f7f1e6]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {children}
      </div>
    </div>
  )
}
