import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 })
    }

    const payload = await getPayloadClient()

    const existing = await payload.find({
      collection: 'newsletter-subscribers',
      where: { email: { equals: email } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      return NextResponse.json({ message: 'Already subscribed.' })
    }

    await payload.create({
      collection: 'newsletter-subscribers',
      data: { email, name: name || '', active: true },
    })

    return NextResponse.json({ message: 'Subscribed successfully.' })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json({ error: 'Subscription failed.' }, { status: 500 })
  }
}
