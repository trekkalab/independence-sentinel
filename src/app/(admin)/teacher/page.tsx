import { Panel } from '@/components/ui/Panel'
import { Tag } from '@/components/ui/Tag'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Teacher Approval — The Independence Sentinel',
}

export default function TeacherPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <Panel
          title="Teacher Approval Box"
          subtitle="Review student submissions before editorial review"
        >
          <p className="mb-4 text-sm text-stone-600">
            Sign in via the CMS Admin to view student drafts assigned to you.
            Student content must be approved by you before it can enter Sentinel editorial review.
          </p>

          <div className="border border-stone-300 bg-[#f3e8c9] p-4 text-sm leading-6 text-stone-700">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">
              How It Works
            </div>
            <div className="mt-2 space-y-2">
              <div className="border-b border-stone-300 pb-2">
                1. Student writes and submits article draft.
              </div>
              <div className="border-b border-stone-300 pb-2">
                2. Draft appears here for your review.
              </div>
              <div className="border-b border-stone-300 pb-2">
                3. You approve, reject, or return it for revision.
              </div>
              <div>
                4. Only teacher-approved work enters Sentinel editorial review.
              </div>
            </div>
          </div>

          <div className="mt-6 border border-[#8b6b2e] bg-[#efe2bf] px-4 py-3 text-center text-sm font-bold uppercase tracking-[0.12em] text-[#5f4718]">
            Teacher Approval Required Before Publication
          </div>
        </Panel>
      </div>

      <div className="lg:col-span-4 space-y-6">
        <Panel title="Teacher Actions" subtitle="For each student submission">
          <div className="space-y-3">
            {[
              'Review student drafts',
              'Approve for editorial review',
              'Return draft for revision',
              'View school-specific contributors',
            ].map((item) => (
              <div
                key={item}
                className="border border-stone-300 bg-[#faf6ee] px-4 py-3 text-sm font-semibold text-stone-700"
              >
                {item}
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Invite Student" subtitle="Add a student journalist">
          <div className="space-y-3">
            <p className="text-sm text-stone-600">
              Submit a student email to create a journalist account tied to your school.
            </p>
            <div className="border border-stone-300 bg-white px-4 py-3 text-center text-sm font-bold uppercase tracking-[0.12em] text-stone-700">
              Invite Student Journalist
            </div>
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500">
              Role: Student Journalist
            </div>
          </div>
        </Panel>
      </div>
    </div>
  )
}
