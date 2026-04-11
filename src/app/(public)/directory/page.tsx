import { getDirectoryListings } from '@/lib/queries'
import { Tag } from '@/components/ui/Tag'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Local Directory — The Independence Sentinel',
  description: 'Business and community directory for Independence, Missouri.',
}

export default async function DirectoryPage() {
  const result = await getDirectoryListings()
  const listings = result.docs as any[]

  const categories = [
    { label: 'All', value: '' },
    { label: 'Dining', value: 'dining' },
    { label: 'Retail', value: 'retail' },
    { label: 'Professional', value: 'professional' },
    { label: 'Healthcare', value: 'healthcare' },
    { label: 'Home Services', value: 'home' },
    { label: 'Nonprofit', value: 'nonprofit' },
    { label: 'Education', value: 'education' },
  ]

  return (
    <div className="bg-[#fffdf8] p-6">
      <div className="mb-6 border-b-2 border-[#1c1a17] pb-2">
        <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-stone-500">
          Community Resource
        </div>
        <h1 className="mt-1 font-serif text-4xl font-bold text-[#1f1a14]">
          Local Directory
        </h1>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Tag key={cat.value} tone="muted">
            {cat.label}
          </Tag>
        ))}
      </div>

      {listings.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <article
              key={listing.id}
              className={`border p-5 ${
                listing.featuredSponsor
                  ? 'border-[#8b6b2e] bg-[#efe2bf]'
                  : 'border-stone-300 bg-[#faf6ee]'
              }`}
            >
              {listing.featuredSponsor && (
                <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#5f4718]">
                  Featured Sponsor
                </div>
              )}
              <h3 className="font-serif text-lg font-bold text-[#1f1a14]">
                {listing.name}
              </h3>
              <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500">
                {listing.category}
              </div>
              {listing.address && (
                <div className="mt-2 text-sm text-stone-600">{listing.address}</div>
              )}
              {listing.phone && (
                <div className="text-sm text-stone-600">{listing.phone}</div>
              )}
              {listing.website && (
                <a
                  href={listing.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block text-sm text-[#8b6b2e] hover:underline"
                >
                  Visit Website
                </a>
              )}
              {listing.description && (
                <p className="mt-2 text-sm leading-6 text-stone-700">
                  {listing.description}
                </p>
              )}
            </article>
          ))}
        </div>
      ) : (
        <p className="py-12 text-center text-stone-500">
          Directory listings coming soon.
        </p>
      )}
    </div>
  )
}
