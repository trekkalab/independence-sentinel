import Link from 'next/link'
import { Panel } from '@/components/ui/Panel'
import { Metric } from '@/components/ui/Metric'
import { Tag } from '@/components/ui/Tag'
import { getEditorialQueue, getAdRevenueSummary } from '@/lib/queries'
import { STATUS_LABELS, timeAgo } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Editorial Queue — The Independence Sentinel',
}

export default async function EditorialQueuePage() {
  const [queueResult, adSummary] = await Promise.all([
    getEditorialQueue(),
    getAdRevenueSummary(),
  ])

  const articles = queueResult.docs as any[]

  const filters = [
    'all', 'teacher_approved', 'submitted', 'ai_reviewed',
    'needs_edit', 'ready', 'scheduled',
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-8 space-y-6">
        <Panel title="Editorial Queue" subtitle="Review, schedule, and publish content">
          <div className="mb-4 flex flex-wrap gap-2">
            {filters.map((f, i) => (
              <Tag key={f} tone={i === 0 ? 'dark' : 'muted'}>
                {STATUS_LABELS[f] || f.replace('_', ' ')}
              </Tag>
            ))}
          </div>

          {articles.length > 0 ? (
            <div className="space-y-4">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/editorial/review/${article.id}`}
                  className="flex flex-col gap-3 border border-stone-300 bg-[#faf6ee] p-4 transition-colors hover:bg-[#f3eadb] md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <div className="font-serif text-xl font-bold text-[#1f1a14]">
                      {article.headline}
                    </div>
                    <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500">
                      {article.author?.name || 'Reporter'} &bull;{' '}
                      {article.section} &bull;{' '}
                      {article.createdAt && timeAgo(article.createdAt)}
                    </div>
                  </div>
                  <Tag
                    tone={
                      article.status === 'ready' || article.status === 'teacher_approved'
                        ? 'accent'
                        : article.status === 'needs_edit'
                          ? 'warning'
                          : 'muted'
                    }
                  >
                    {STATUS_LABELS[article.status] || article.status}
                  </Tag>
                </Link>
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-stone-500">
              No articles in the editorial queue right now.
            </p>
          )}
        </Panel>

        <Panel title="Ad Revenue Snapshot" subtitle="Simple direct-sales model">
          <div className="grid gap-4 md:grid-cols-4">
            <Metric label="Active Campaigns" value={adSummary.activeCampaigns} />
            <Metric label="Unsold Slots" value={adSummary.unsoldSlots} />
            <Metric
              label="This Month"
              value={`$${adSummary.monthlyRevenue.toLocaleString()}`}
            />
            <Metric label="Advertisers" value={adSummary.totalAdvertisers} />
          </div>
        </Panel>
      </div>

      <div className="lg:col-span-4 space-y-6">
        <Panel title="Editor Review" subtitle="Select a story to review">
          <p className="text-sm text-stone-600">
            Click on a story in the queue to open the review pane with AI flags, teacher approval status, and publishing controls.
          </p>
        </Panel>

        <Panel title="Student Journalism Safeguard">
          <div className="border border-stone-300 bg-[#f3e8c9] p-4 text-sm leading-6 text-stone-700">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">
              Approval Chain
            </div>
            <div className="mt-2">
              Student submissions must show teacher approval before editorial can schedule or publish.
            </div>
          </div>
        </Panel>
      </div>
    </div>
  )
}
