import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')
  const type = searchParams.get('type') || 'all'

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] })
  }

  const payload = await getPayloadClient()
  const results: any = {}

  if (type === 'all' || type === 'articles') {
    const articles = await payload.find({
      collection: 'articles',
      where: {
        and: [
          { status: { equals: 'published' } },
          {
            or: [
              { headline: { contains: q } },
              { deck: { contains: q } },
            ],
          },
        ],
      },
      limit: 10,
      depth: 1,
    })
    results.articles = articles.docs
  }

  if (type === 'all' || type === 'events') {
    const events = await payload.find({
      collection: 'events',
      where: {
        and: [
          { approved: { equals: true } },
          { title: { contains: q } },
        ],
      },
      limit: 10,
    })
    results.events = events.docs
  }

  if (type === 'all' || type === 'obituaries') {
    const obituaries = await payload.find({
      collection: 'obituaries',
      where: {
        and: [
          { status: { equals: 'published' } },
          { name: { contains: q } },
        ],
      },
      limit: 10,
    })
    results.obituaries = obituaries.docs
  }

  if (type === 'all' || type === 'directory') {
    const directory = await payload.find({
      collection: 'directory-listings',
      where: {
        and: [
          { active: { equals: true } },
          {
            or: [
              { name: { contains: q } },
              { description: { contains: q } },
            ],
          },
        ],
      },
      limit: 10,
    })
    results.directory = directory.docs
  }

  return NextResponse.json({ results })
}
