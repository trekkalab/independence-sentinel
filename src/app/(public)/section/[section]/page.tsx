import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { StoryCard } from '@/components/public/StoryCard'
import { getPublishedArticles } from '@/lib/queries'
import { SECTIONS } from '@/lib/utils'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ section: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params
  const sectionInfo = SECTIONS.find((s) => s.value === section)
  const label = sectionInfo?.label || section
  return {
    title: `${label} — The Independence Sentinel`,
    description: `${label} coverage from The Independence Sentinel, Independence, Missouri.`,
  }
}

export default async function SectionPage({ params }: Props) {
  const { section } = await params
  const sectionInfo = SECTIONS.find((s) => s.value === section)

  if (!sectionInfo) notFound()

  const result = await getPublishedArticles(20, section)
  const articles = result.docs as any[]

  return (
    <div className="bg-[#fffdf8] p-6">
      <div className="mb-6 border-b-2 border-[#1c1a17] pb-2">
        <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-stone-500">
          Section
        </div>
        <h1 className="mt-1 font-serif text-4xl font-bold text-[#1f1a14]">
          {sectionInfo.label}
        </h1>
      </div>

      {articles.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((article) => (
            <StoryCard
              key={article.id}
              section={sectionInfo.label}
              title={article.headline}
              summary={article.deck || ''}
              meta={article.author?.name || 'Staff Report'}
              href={`/article/${article.slug}`}
            />
          ))}
        </div>
      ) : (
        <p className="py-12 text-center text-stone-500">
          No published stories in this section yet.
        </p>
      )}
    </div>
  )
}
