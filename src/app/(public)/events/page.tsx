import { getUpcomingEvents } from '@/lib/queries'
import { formatDate } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Community Calendar — The Independence Sentinel',
  description: 'Upcoming events in Independence, Missouri.',
}

export default async function EventsPage() {
  const result = await getUpcomingEvents(50)
  const events = result.docs as any[]

  return (
    <div className="bg-[#fffdf8] p-6">
      <div className="mb-6 border-b-2 border-[#1c1a17] pb-2">
        <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-stone-500">
          Community
        </div>
        <h1 className="mt-1 font-serif text-4xl font-bold text-[#1f1a14]">
          Events Calendar
        </h1>
      </div>

      {events.length > 0 ? (
        <div className="space-y-4">
          {events.map((event) => (
            <article
              key={event.id}
              className="border border-stone-300 bg-[#faf6ee] p-5"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7a5a1f]">
                    {event.category || 'Community'}
                  </div>
                  <h3 className="mt-1 font-serif text-xl font-bold text-[#1f1a14]">
                    {event.title}
                  </h3>
                  {event.venue && (
                    <div className="mt-1 text-sm text-stone-600">{event.venue}</div>
                  )}
                  {event.address && (
                    <div className="text-sm text-stone-500">{event.address}</div>
                  )}
                </div>
                <div className="shrink-0 text-right">
                  <div className="font-serif text-lg font-bold text-[#1f1a14]">
                    {formatDate(event.startDate, 'EEE, MMM d')}
                  </div>
                  <div className="text-sm text-stone-500">
                    {formatDate(event.startDate, 'h:mm a')}
                    {event.endDate && ` – ${formatDate(event.endDate, 'h:mm a')}`}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="py-12 text-center text-stone-500">
          No upcoming events listed. Check back soon.
        </p>
      )}
    </div>
  )
}
