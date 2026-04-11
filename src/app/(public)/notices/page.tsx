import { getPublicNotices } from '@/lib/queries'
import { formatDate } from '@/lib/utils'
import { Tag } from '@/components/ui/Tag'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Public Notices — The Independence Sentinel',
  description: 'Official public notices for Independence, Missouri.',
}

export default async function NoticesPage() {
  const result = await getPublicNotices(50)
  const notices = result.docs as any[]

  return (
    <div className="bg-[#fffdf8] p-6">
      <div className="mb-6 border-b-2 border-[#1c1a17] pb-2">
        <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-stone-500">
          Official Record
        </div>
        <h1 className="mt-1 font-serif text-4xl font-bold text-[#1f1a14]">
          Public Notices
        </h1>
      </div>

      {notices.length > 0 ? (
        <div className="space-y-4">
          {notices.map((notice) => (
            <article key={notice.id} className="border border-stone-300 bg-[#faf6ee] p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#1f1a14]">
                    {notice.title}
                  </h3>
                  {notice.sponsoringEntity && (
                    <div className="mt-1 text-sm text-stone-600">
                      {notice.sponsoringEntity}
                    </div>
                  )}
                  <div className="mt-2 text-sm text-stone-500">
                    Posted {formatDate(notice.startDate)}
                    {notice.endDate && ` — Expires ${formatDate(notice.endDate)}`}
                  </div>
                </div>
                <Tag tone={notice.paid ? 'accent' : 'muted'}>
                  {notice.noticeType || 'General'}
                </Tag>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="py-12 text-center text-stone-500">
          No active public notices at this time.
        </p>
      )}
    </div>
  )
}
