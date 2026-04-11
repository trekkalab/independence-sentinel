import Link from 'next/link'
import { Tag } from '@/components/ui/Tag'
import { StoryCard } from '@/components/public/StoryCard'
import { NewsletterBlock } from '@/components/public/NewsletterBlock'
import { AdSlot } from '@/components/public/AdSlot'
import {
  getFeaturedArticles,
  getPublishedArticles,
  getUpcomingEvents,
  getActiveAdPlacements,
} from '@/lib/queries'
import { formatDate } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'The Independence Sentinel — A Town Paper for Independence, Missouri',
  description:
    'Local news, events, business, government, schools, and community coverage for Independence, Missouri.',
}

export default async function HomePage() {
  const [featuredResult, articlesResult, eventsResult, adsResult] =
    await Promise.all([
      getFeaturedArticles(1),
      getPublishedArticles(8),
      getUpcomingEvents(4),
      getActiveAdPlacements(),
    ])

  const leadStory = featuredResult.docs[0] as any
  const articles = articlesResult.docs as any[]
  const events = eventsResult.docs as any[]

  // Split articles for different homepage zones
  const briefArticles = articles.filter((a) => a.id !== leadStory?.id).slice(0, 4)
  const aroundTown = articles.filter((a) => a.id !== leadStory?.id).slice(0, 4)

  const sidebarAd = (adsResult.docs as any[]).find(
    (a) => a.placementType === 'sidebar'
  )

  return (
    <>
      {/* Banner Lead Story */}
      <div className="grid gap-0 lg:grid-cols-12 border-b border-stone-300">
        <article className="lg:col-span-9 border-r border-stone-300 bg-[#fffdf8] p-6">
          {leadStory ? (
            <>
              <div className="mb-4 flex flex-wrap justify-center gap-2">
                <Tag tone="dark">Lead Story</Tag>
                {leadStory.section && <Tag>{leadStory.section}</Tag>}
              </div>
              <Link href={`/article/${leadStory.slug}`}>
                <h2 className="text-center font-serif text-5xl font-black leading-[0.96] text-[#181512] md:text-7xl">
                  {leadStory.headline}
                </h2>
              </Link>
              <div className="mt-4 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">
                By {leadStory.author?.name || 'Staff Reporter'}
                {leadStory.publishDate &&
                  ` \u2022 ${formatDate(leadStory.publishDate)}`}
              </div>
              {leadStory.heroImage?.url ? (
                <div className="my-5 overflow-hidden border-y-2 border-stone-300">
                  <img
                    src={leadStory.heroImage.url}
                    alt={leadStory.heroImage.alt || leadStory.headline}
                    className="h-80 w-full object-cover"
                  />
                </div>
              ) : (
                <div className="my-5 h-80 border-y-2 border-stone-300 bg-[linear-gradient(135deg,#cfc6b6,#ebe4d6)]" />
              )}
              {leadStory.deck && (
                <p className="mx-auto max-w-4xl text-center text-[17px] leading-8 text-stone-700">
                  {leadStory.deck}
                </p>
              )}
            </>
          ) : (
            <div className="py-16 text-center">
              <h2 className="font-serif text-5xl font-black text-[#181512]">
                The Independence Sentinel
              </h2>
              <p className="mt-4 text-lg text-stone-600">
                Local reporting for Independence, Missouri.
              </p>
            </div>
          )}
        </article>

        {/* Front Page Briefs */}
        <aside className="lg:col-span-3 bg-[#fffaf2] p-5">
          <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.24em] text-stone-500">
            Front Page Briefs
          </div>
          <div className="space-y-4">
            {briefArticles.length > 0 ? (
              briefArticles.map((article) => (
                <div
                  key={article.id}
                  className="border-b border-stone-300 pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">
                    {article.section}
                  </div>
                  <Link href={`/article/${article.slug}`}>
                    <div className="mt-1 font-serif text-xl font-bold leading-7 text-[#1f1a14] transition-colors hover:text-[#8b6b2e]">
                      {article.headline}
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-sm text-stone-500">
                No briefs available yet.
              </p>
            )}
          </div>
        </aside>
      </div>

      {/* Around Independence + Calendar */}
      <div className="grid gap-0 lg:grid-cols-12 border-b border-stone-300">
        <div className="lg:col-span-9 border-r border-stone-300 bg-[#fffdf8] p-5">
          <div className="mb-4 border-b border-stone-300 pb-2 text-[11px] font-bold uppercase tracking-[0.24em] text-stone-500">
            Around Independence
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {aroundTown.length > 0 ? (
              aroundTown.map((article) => (
                <StoryCard
                  key={article.id}
                  section={article.section}
                  title={article.headline}
                  summary={article.deck || ''}
                  meta={article.author?.name || 'Staff Report'}
                  href={`/article/${article.slug}`}
                />
              ))
            ) : (
              <p className="text-sm text-stone-500">
                More stories coming soon.
              </p>
            )}
          </div>
        </div>

        <div className="lg:col-span-3 bg-[#fffaf2] p-5">
          <div className="mb-4 border-b border-stone-300 pb-2 text-[11px] font-bold uppercase tracking-[0.24em] text-stone-500">
            Community Calendar
          </div>
          <div className="space-y-3 text-sm leading-6 text-stone-700">
            {events.length > 0 ? (
              events.map((event) => (
                <div
                  key={event.id}
                  className="border-b border-stone-300 pb-3 last:border-b-0 last:pb-0"
                >
                  <span className="font-bold text-[#1f1a14]">
                    {formatDate(event.startDate, 'EEE')}:
                  </span>{' '}
                  {event.title}
                </div>
              ))
            ) : (
              <>
                <div className="border-b border-stone-300 pb-3">
                  <span className="font-bold text-[#1f1a14]">Coming Soon:</span>{' '}
                  Community events will appear here
                </div>
              </>
            )}
            <Link
              href="/events"
              className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#8b6b2e] hover:underline"
            >
              View Full Calendar &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Town Utilities + Newsletter + Sponsor */}
      <div className="grid gap-0 lg:grid-cols-12 border-b border-stone-300">
        <div className="lg:col-span-3 border-r border-stone-300 bg-[#f7f1e6] p-5">
          <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-stone-500">
            Town Utilities
          </div>
          <div className="mt-4 space-y-3 text-sm font-semibold text-stone-700">
            <Link href="/submit-tip" className="block hover:text-[#8b6b2e]">Submit a News Tip</Link>
            <Link href="/events" className="block hover:text-[#8b6b2e]">Submit an Event</Link>
            <Link href="/opinion" className="block hover:text-[#8b6b2e]">Submit a Letter to the Editor</Link>
            <Link href="/notices" className="block hover:text-[#8b6b2e]">View Public Notices</Link>
            <Link href="/directory" className="block hover:text-[#8b6b2e]">Browse Local Directory</Link>
          </div>
        </div>

        <div className="lg:col-span-6 border-r border-stone-300 bg-[#fffdf8] p-5">
          <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-stone-500">
            Sentinel Record of Independence
          </div>
          <p className="mt-3 text-sm leading-7 text-stone-700">
            The Independence Sentinel serves as your daily civic resource &mdash; covering local
            government, schools, business, events, and the people and places that define our
            community. Browse local businesses, find community events, read public notices,
            and stay connected to the town you call home.
          </p>
        </div>

        <div className="lg:col-span-3 bg-[#fffaf2] p-5">
          <NewsletterBlock />
        </div>
      </div>

      {/* Editorial note + Sponsor */}
      <div className="grid gap-0 lg:grid-cols-12">
        <div className="lg:col-span-9 border-r border-stone-300 bg-[#fffdf8] p-5">
          <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-stone-500">
            About The Sentinel
          </div>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-stone-700">
            The Independence Sentinel is a modern civic newspaper built in the spirit of the
            historic Independence Sentinel that helped inspire The Sentinel Room. Our mission
            is to serve Independence with honest, local reporting that treats this community
            with the seriousness it deserves.
          </p>
        </div>

        <div className="lg:col-span-3 bg-[#fffaf2] p-5">
          <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-stone-500">
            Sponsor
          </div>
          <AdSlot placement={sidebarAd} className="mt-4 h-44" />
        </div>
      </div>
    </>
  )
}
