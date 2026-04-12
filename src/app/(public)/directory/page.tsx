import Link from 'next/link'
import { getDirectoryListings } from '@/lib/queries'
import { Tag } from '@/components/ui/Tag'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Business Directory — The Independence Sentinel',
  description: 'Local business directory for Independence, Missouri. Find restaurants, shops, services, and community organizations.',
}

const CATEGORY_LABELS: Record<string, string> = {
  dining: 'Restaurant & Dining',
  retail: 'Retail',
  professional: 'Professional Services',
  healthcare: 'Healthcare',
  home: 'Home Services',
  automotive: 'Automotive',
  arts: 'Arts & Entertainment',
  nonprofit: 'Nonprofit',
  religious: 'Church & Religious',
  government: 'Government',
  education: 'Education',
  other: 'Other',
}

export default async function DirectoryPage() {
  const result = await getDirectoryListings()
  const allListings = result.docs as any[]

  // Sort: sponsors first, then standard
  const tierOrder = { sponsor: 0, standard: 1 }
  const listings = [...allListings].sort((a, b) => {
    const aOrder = tierOrder[a.tier as keyof typeof tierOrder] ?? 1
    const bOrder = tierOrder[b.tier as keyof typeof tierOrder] ?? 1
    if (a.featuredSponsor && !b.featuredSponsor) return -1
    if (!a.featuredSponsor && b.featuredSponsor) return 1
    return aOrder - bOrder
  })

  const sponsors = listings.filter((l) => l.tier === 'sponsor')
  const standard = listings.filter((l) => l.tier !== 'sponsor')

  return (
    <div className="bg-[#fffdf8]">
      {/* Header */}
      <div className="border-b border-stone-300 p-6">
        <div className="mb-4 border-b-2 border-[#1c1a17] pb-2">
          <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-stone-500">
            Independence Business Community
          </div>
          <h1 className="mt-1 font-serif text-4xl font-bold text-[#1f1a14]">
            Business Directory
          </h1>
        </div>
        <p className="max-w-3xl text-sm leading-7 text-stone-700">
          Support local. The Independence Sentinel Business Directory connects residents with
          the businesses, services, and organizations that make our community work.
          Every listing is verified &mdash; a card on file confirms your business is real and active,
          and keeps the directory free of spam.
        </p>
      </div>

      {/* Pricing tiers */}
      <div className="border-b border-stone-300 bg-[#f4ecdd] p-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="border border-stone-300 bg-[#fffdf8] p-5">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500">Verified Listing</div>
            <div className="mt-2 font-serif text-2xl font-bold text-[#1f1a14]">$7<span className="text-sm font-normal text-stone-500">/mo</span></div>
            <ul className="mt-3 space-y-2 text-sm text-stone-700">
              <li>Verified active business</li>
              <li>Business name &amp; category</li>
              <li>Phone number</li>
              <li>Address</li>
            </ul>
            <div className="mt-4 border-t border-stone-200 pt-3 text-[11px] text-stone-500">
              Card on file &bull; Monthly verification audit
            </div>
          </div>
          <div className="border border-stone-300 bg-[#fffdf8] p-5">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7a5a1f]">Enhanced Listing</div>
            <div className="mt-2 font-serif text-2xl font-bold text-[#1f1a14]">$27<span className="text-sm font-normal text-stone-500">/mo</span></div>
            <ul className="mt-3 space-y-2 text-sm text-stone-700">
              <li>Everything in Verified</li>
              <li>Business description</li>
              <li>Website link</li>
              <li>Business hours</li>
              <li>Photo</li>
            </ul>
            <div className="mt-4 border-t border-stone-200 pt-3 text-[11px] text-stone-500">
              Full profile for engaged businesses
            </div>
          </div>
          <div className="border-2 border-[#8b6b2e] bg-[#efe2bf] p-5">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5f4718]">Sponsor</div>
            <div className="mt-2 font-serif text-2xl font-bold text-[#1f1a14]">$77<span className="text-sm font-normal text-stone-500">/mo</span></div>
            <ul className="mt-3 space-y-2 text-sm text-[#4b3710]">
              <li>Everything in Enhanced</li>
              <li>Logo displayed</li>
              <li>Featured placement at top</li>
              <li>Custom tagline</li>
              <li>Homepage visibility</li>
            </ul>
            <div className="mt-4 border-t border-[#c9a84e] pt-3 text-[11px] text-[#5f4718]">
              Premium visibility across the site
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <div className="inline-block bg-[#1c1a17] px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#f7f1e6]">
            List Your Business &mdash; Contact advertising@independencesentinel.com
          </div>
        </div>
      </div>

      {/* Sponsored Listings */}
      {sponsors.length > 0 && (
        <div className="border-b border-stone-300 p-6">
          <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.24em] text-[#7a5a1f]">
            Sponsored Businesses
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {sponsors.map((listing) => (
              <article
                key={listing.id}
                className="flex gap-4 border-2 border-[#8b6b2e] bg-[#efe2bf] p-5"
              >
                {listing.image?.url && (
                  <img
                    src={listing.image.url}
                    alt={listing.name}
                    className="h-20 w-20 shrink-0 border border-[#8b6b2e] object-cover"
                  />
                )}
                <div className="flex-1">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5f4718]">
                    Sponsor
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1f1a14]">
                    {listing.name}
                  </h3>
                  {listing.tagline && (
                    <div className="mt-1 text-sm italic text-[#5f4718]">{listing.tagline}</div>
                  )}
                  <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500">
                    {CATEGORY_LABELS[listing.category] || listing.category}
                  </div>
                  {listing.address && <div className="mt-2 text-sm text-stone-600">{listing.address}</div>}
                  {listing.phone && <div className="text-sm text-stone-600">{listing.phone}</div>}
                  {listing.description && (
                    <p className="mt-2 text-sm leading-6 text-stone-700">{listing.description}</p>
                  )}
                  {listing.hours && (
                    <div className="mt-2 text-sm text-stone-600">
                      <span className="font-semibold">Hours:</span> {listing.hours}
                    </div>
                  )}
                  {listing.website && (
                    <a
                      href={listing.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block border border-[#8b6b2e] bg-[#1c1a17] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#f7f1e6] hover:opacity-90"
                    >
                      Visit Website
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Standard Listings */}
      <div className="p-6">
        <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.24em] text-stone-500">
          All Verified Businesses
        </div>
        {standard.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {standard.map((listing) => (
              <article
                key={listing.id}
                className="border border-stone-300 bg-[#faf6ee] p-5"
              >
                <h3 className="font-serif text-lg font-bold text-[#1f1a14]">
                  {listing.name}
                </h3>
                <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500">
                  {CATEGORY_LABELS[listing.category] || listing.category}
                </div>
                {listing.address && (
                  <div className="mt-2 text-sm text-stone-600">{listing.address}</div>
                )}
                {listing.phone && (
                  <div className="text-sm text-stone-600">{listing.phone}</div>
                )}
                {listing.description && (
                  <p className="mt-2 text-sm leading-6 text-stone-700">{listing.description}</p>
                )}
                {listing.hours && (
                  <div className="mt-2 text-sm text-stone-600">
                    <span className="font-semibold">Hours:</span> {listing.hours}
                  </div>
                )}
                {listing.website && (
                  <a
                    href={listing.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block text-sm text-[#8b6b2e] hover:underline"
                  >
                    Visit Website
                  </a>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-stone-500">No businesses listed yet.</p>
            <div className="mt-4 inline-block bg-[#1c1a17] px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[#f7f1e6]">
              List Your Business
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
