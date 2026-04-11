import { getPayloadClient } from './payload'

export async function getPublishedArticles(limit = 20, section?: string) {
  const payload = await getPayloadClient()
  const where: any = { status: { equals: 'published' } }
  if (section) where.section = { equals: section }

  return payload.find({
    collection: 'articles',
    where,
    sort: '-publishDate',
    limit,
    depth: 2,
  })
}

export async function getFeaturedArticles(limit = 5) {
  const payload = await getPayloadClient()
  return payload.find({
    collection: 'articles',
    where: {
      status: { equals: 'published' },
      featured: { equals: true },
    },
    sort: 'homepagePriority',
    limit,
    depth: 2,
  })
}

export async function getArticleBySlug(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'articles',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })
  return result.docs[0] || null
}

export async function getUpcomingEvents(limit = 10) {
  const payload = await getPayloadClient()
  return payload.find({
    collection: 'events',
    where: {
      approved: { equals: true },
      startDate: { greater_than_equal: new Date().toISOString() },
    },
    sort: 'startDate',
    limit,
  })
}

export async function getRecentObituaries(limit = 10) {
  const payload = await getPayloadClient()
  return payload.find({
    collection: 'obituaries',
    where: { status: { equals: 'published' } },
    sort: '-publishDate',
    limit,
  })
}

export async function getPublicNotices(limit = 20) {
  const payload = await getPayloadClient()
  const now = new Date().toISOString()
  return payload.find({
    collection: 'public-notices',
    where: {
      startDate: { less_than_equal: now },
      or: [
        { endDate: { greater_than_equal: now } },
        { endDate: { exists: false } },
      ],
    },
    sort: '-startDate',
    limit,
  })
}

export async function getDirectoryListings(category?: string) {
  const payload = await getPayloadClient()
  const where: any = { active: { equals: true } }
  if (category) where.category = { equals: category }

  return payload.find({
    collection: 'directory-listings',
    where,
    sort: '-featuredSponsor',
    limit: 100,
  })
}

export async function getActiveAdPlacements(placementType?: string) {
  const payload = await getPayloadClient()
  const where: any = { active: { equals: true } }
  if (placementType) where.placementType = { equals: placementType }

  return payload.find({
    collection: 'ad-placements',
    where,
    depth: 2,
    limit: 20,
  })
}

// Editorial / Portal queries
export async function getArticlesByAuthor(authorId: string) {
  const payload = await getPayloadClient()
  return payload.find({
    collection: 'articles',
    where: { author: { equals: authorId } },
    sort: '-createdAt',
    limit: 50,
    depth: 1,
  })
}

export async function getArticlesForTeacherReview(teacherId: string) {
  const payload = await getPayloadClient()
  return payload.find({
    collection: 'articles',
    where: {
      teacherApprover: { equals: teacherId },
      status: { equals: 'submitted_to_teacher' },
    },
    sort: '-createdAt',
    depth: 2,
  })
}

export async function getEditorialQueue(statusFilter?: string) {
  const payload = await getPayloadClient()
  const where: any = {}
  if (statusFilter && statusFilter !== 'all') {
    where.status = { equals: statusFilter }
  } else {
    where.status = {
      in: [
        'submitted', 'teacher_approved', 'ai_reviewed',
        'needs_edit', 'ready', 'scheduled',
      ],
    }
  }

  return payload.find({
    collection: 'articles',
    where,
    sort: '-createdAt',
    limit: 50,
    depth: 2,
  })
}

export async function getAdRevenueSummary() {
  const payload = await getPayloadClient()
  const [activePlacements, allPlacements, advertisers] = await Promise.all([
    payload.find({
      collection: 'ad-placements',
      where: { active: { equals: true } },
      limit: 100,
    }),
    payload.find({
      collection: 'ad-placements',
      limit: 100,
    }),
    payload.find({
      collection: 'advertisers',
      limit: 100,
    }),
  ])

  const monthlyRevenue = activePlacements.docs.reduce(
    (sum, p: any) => sum + (p.monthlyRate || 0), 0
  )
  const unsold = allPlacements.docs.filter((p: any) => !p.advertiser).length

  return {
    activeCampaigns: activePlacements.totalDocs,
    unsoldSlots: unsold,
    monthlyRevenue,
    totalAdvertisers: advertisers.totalDocs,
  }
}
