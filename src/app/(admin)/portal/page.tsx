import Link from 'next/link'
import { Panel } from '@/components/ui/Panel'
import { Tag } from '@/components/ui/Tag'
import { STATUS_LABELS, STATUS_TONES } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Reporter Portal — The Independence Sentinel',
}

const portalNav = [
  { label: 'Dashboard', href: '/portal', active: true },
  { label: 'New Draft', href: '/portal/submit', active: false },
  { label: 'My Drafts', href: '/portal/drafts', active: false },
  { label: 'Submitted', href: '/portal/submissions', active: false },
]

export default function PortalPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* Sidebar navigation */}
      <div className="lg:col-span-3">
        <Panel title="Reporter Navigation" subtitle="Your workspace">
          <div className="space-y-3">
            {portalNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block border px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] ${
                  item.active
                    ? 'border-[#1c1a17] bg-[#1c1a17] text-[#f7f1e6]'
                    : 'border-stone-300 bg-[#faf6ee] text-stone-700 hover:bg-stone-200'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </Panel>
      </div>

      {/* Main content */}
      <div className="lg:col-span-9 space-y-6">
        <Panel title="Reporter Dashboard" subtitle="Your story overview">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="border border-stone-300 bg-[#fffdf8] p-4">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500">
                Drafts
              </div>
              <div className="mt-2 text-2xl font-bold text-[#1f1a14]">—</div>
            </div>
            <div className="border border-stone-300 bg-[#fffdf8] p-4">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500">
                Submitted
              </div>
              <div className="mt-2 text-2xl font-bold text-[#1f1a14]">—</div>
            </div>
            <div className="border border-stone-300 bg-[#fffdf8] p-4">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500">
                Published
              </div>
              <div className="mt-2 text-2xl font-bold text-[#1f1a14]">—</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-stone-600">
            Sign in via the CMS Admin to view your personalized dashboard with story counts and submission statuses.
          </p>
        </Panel>

        <Panel title="Quick Actions" subtitle="Start writing">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/portal/submit"
              className="bg-[#1c1a17] px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[#f7f1e6] hover:opacity-90"
            >
              New Draft
            </Link>
            <Link
              href="/portal/drafts"
              className="border border-stone-300 bg-white px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] text-stone-700 hover:bg-stone-100"
            >
              View My Drafts
            </Link>
          </div>
        </Panel>
      </div>
    </div>
  )
}
