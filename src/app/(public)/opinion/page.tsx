import { getPublishedArticles } from '@/lib/queries'
import { StoryCard } from '@/components/public/StoryCard'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Opinion & Letters — The Independence Sentinel',
  description: 'Opinion columns, editorials, and letters to the editor from Independence, Missouri.',
}

export default async function OpinionPage() {
  const result = await getPublishedArticles(20, 'opinion')
  const articles = result.docs as any[]

  return (
    <div className="bg-[#fffdf8] p-6">
      <div className="mb-6 border-b-2 border-[#1c1a17] pb-2">
        <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-stone-500">
          Voices
        </div>
        <h1 className="mt-1 font-serif text-4xl font-bold text-[#1f1a14]">
          Opinion &amp; Letters
        </h1>
      </div>

      {articles.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((article) => (
            <StoryCard
              key={article.id}
              section="Opinion"
              title={article.headline}
              summary={article.deck || ''}
              meta={article.author?.name || 'Contributor'}
              href={`/article/${article.slug}`}
            />
          ))}
        </div>
      ) : (
        <p className="py-12 text-center text-stone-500">
          No opinion pieces published yet. Submit a letter to the editor to get started.
        </p>
      )}
    </div>
  )
}
