import { getRecentObituaries } from '@/lib/queries'
import { formatDate } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Obituaries — The Independence Sentinel',
  description: 'Obituaries and memorial notices from Independence, Missouri.',
}

export default async function ObituariesPage() {
  const result = await getRecentObituaries(50)
  const obituaries = result.docs as any[]

  return (
    <div className="bg-[#fffdf8] p-6">
      <div className="mb-6 border-b-2 border-[#1c1a17] pb-2">
        <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-stone-500">
          Memorial
        </div>
        <h1 className="mt-1 font-serif text-4xl font-bold text-[#1f1a14]">
          Obituaries
        </h1>
      </div>

      {obituaries.length > 0 ? (
        <div className="space-y-6">
          {obituaries.map((obit) => (
            <article key={obit.id} className="border-b border-stone-300 pb-6 last:border-b-0">
              <div className="flex gap-5">
                {obit.photo?.url && (
                  <img
                    src={obit.photo.url}
                    alt={obit.name}
                    className="h-24 w-24 shrink-0 border border-stone-300 object-cover"
                  />
                )}
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1f1a14]">
                    {obit.name}
                  </h3>
                  <div className="mt-1 text-sm text-stone-500">
                    {obit.birthDate && formatDate(obit.birthDate, 'MMM d, yyyy')}
                    {obit.birthDate && obit.deathDate && ' — '}
                    {obit.deathDate && formatDate(obit.deathDate, 'MMM d, yyyy')}
                  </div>
                  {obit.serviceInfo && (
                    <p className="mt-2 text-sm leading-6 text-stone-700">
                      {obit.serviceInfo}
                    </p>
                  )}
                  {obit.funeralHome && (
                    <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500">
                      {obit.funeralHome}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="py-12 text-center text-stone-500">
          No obituaries published at this time.
        </p>
      )}
    </div>
  )
}
