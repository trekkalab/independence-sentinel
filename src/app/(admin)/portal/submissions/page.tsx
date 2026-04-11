import { Panel } from '@/components/ui/Panel'

export const metadata = {
  title: 'Submitted Stories — The Independence Sentinel',
}

export default function SubmissionsPage() {
  return (
    <Panel title="Submitted Stories" subtitle="Stories awaiting review">
      <p className="text-sm text-stone-600">
        Sign in via the CMS Admin to view your submitted stories and their current status in the editorial pipeline.
      </p>
    </Panel>
  )
}
