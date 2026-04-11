import { Panel } from '@/components/ui/Panel'
import Link from 'next/link'

export const metadata = {
  title: 'My Drafts — The Independence Sentinel',
}

export default function DraftsPage() {
  return (
    <Panel title="My Drafts" subtitle="Stories you are working on">
      <p className="text-sm text-stone-600">
        Sign in via the CMS Admin to view your drafts. Once authenticated, your drafts, submitted stories, and revision requests will appear here.
      </p>
      <div className="mt-4">
        <Link
          href="/portal/submit"
          className="inline-block bg-[#1c1a17] px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[#f7f1e6] hover:opacity-90"
        >
          Start a New Draft
        </Link>
      </div>
    </Panel>
  )
}
