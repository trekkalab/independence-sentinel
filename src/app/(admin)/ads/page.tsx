import { Panel } from '@/components/ui/Panel'
import { Metric } from '@/components/ui/Metric'
import { getAdRevenueSummary, getActiveAdPlacements } from '@/lib/queries'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Ad Management — The Independence Sentinel',
}

const inventorySlots = [
  'Homepage Hero Sponsor',
  'Sidebar Display',
  'Section Sponsor',
  'Newsletter Sponsor',
  'Sponsored Story',
  'In-Article Ad',
]

export default async function AdsPage() {
  const [adSummary, placementsResult] = await Promise.all([
    getAdRevenueSummary(),
    getActiveAdPlacements(),
  ])

  const placements = placementsResult.docs as any[]

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-8 space-y-6">
        <Panel title="Ad Revenue Snapshot" subtitle="Current month overview">
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

        <Panel title="Active Placements" subtitle="Currently running ad campaigns">
          {placements.length > 0 ? (
            <div className="space-y-4">
              {placements.map((p) => (
                <div
                  key={p.id}
                  className="flex flex-col gap-3 border border-stone-300 bg-[#faf6ee] p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <div className="font-serif text-lg font-bold text-[#1f1a14]">
                      {p.name}
                    </div>
                    <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500">
                      {p.placementType?.replace('_', ' ')} &bull;{' '}
                      {p.advertiser?.name || 'Unassigned'} &bull;{' '}
                      {p.monthlyRate ? `$${p.monthlyRate}/mo` : 'No rate set'}
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-stone-600">
                    {p.active ? 'Active' : 'Inactive'}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-stone-500">
              No active ad placements. Create placements via the CMS Admin.
            </p>
          )}
        </Panel>
      </div>

      <div className="lg:col-span-4 space-y-6">
        <Panel title="Ad Inventory" subtitle="Available placement types">
          <div className="space-y-3">
            {inventorySlots.map((slot) => (
              <div
                key={slot}
                className="border border-stone-300 bg-[#faf6ee] px-4 py-3 text-sm font-semibold text-stone-700"
              >
                {slot}
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Manage" subtitle="Ad administration">
          <div className="space-y-3 text-sm text-stone-600">
            <p>
              Create and manage advertisers, placements, and creative assets through the CMS Admin panel.
            </p>
            <a
              href="/admin/collections/advertisers"
              className="block border border-stone-300 bg-white px-4 py-3 text-center text-sm font-bold uppercase tracking-[0.12em] text-stone-700 hover:bg-stone-100"
            >
              Manage Advertisers
            </a>
            <a
              href="/admin/collections/ad-placements"
              className="block border border-stone-300 bg-white px-4 py-3 text-center text-sm font-bold uppercase tracking-[0.12em] text-stone-700 hover:bg-stone-100"
            >
              Manage Placements
            </a>
          </div>
        </Panel>
      </div>
    </div>
  )
}
