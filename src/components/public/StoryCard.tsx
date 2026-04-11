import Link from 'next/link'

export function StoryCard({
  section,
  title,
  summary,
  meta = 'Staff Report',
  href,
}: {
  section: string
  title: string
  summary: string
  meta?: string
  href?: string
}) {
  const content = (
    <article className="border-b border-stone-300 pb-4 last:border-b-0 last:pb-0">
      <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7a5a1f]">
        {section}
      </div>
      <h3 className="font-serif text-xl font-bold leading-tight text-[#1f1a14]">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-stone-700">{summary}</p>
      <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500">
        {meta}
      </div>
    </article>
  )

  if (href) {
    return (
      <Link href={href} className="block transition-opacity hover:opacity-80">
        {content}
      </Link>
    )
  }

  return content
}
