import Image from 'next/image'

export function AdSlot({
  placement,
  className = '',
}: {
  placement?: {
    creative?: { url?: string; alt?: string } | null
    linkUrl?: string
    advertiser?: { name?: string } | null
    dimensions?: string
  } | null
  className?: string
}) {
  if (!placement || !placement.creative) {
    return (
      <div className={`flex items-center justify-center border-2 border-dashed border-stone-300 bg-[#faf6ee] text-sm font-medium text-stone-500 ${className}`}>
        Ad Space Available
      </div>
    )
  }

  const content = (
    <div className={`relative overflow-hidden border border-stone-200 ${className}`}>
      {placement.creative.url && (
        <img
          src={placement.creative.url}
          alt={placement.creative.alt || 'Advertisement'}
          className="h-full w-full object-cover"
        />
      )}
      <div className="absolute bottom-0 left-0 bg-stone-900/60 px-2 py-0.5 text-[9px] uppercase tracking-wider text-white">
        Sponsored
      </div>
    </div>
  )

  if (placement.linkUrl) {
    return (
      <a href={placement.linkUrl} target="_blank" rel="noopener noreferrer sponsored">
        {content}
      </a>
    )
  }

  return content
}
