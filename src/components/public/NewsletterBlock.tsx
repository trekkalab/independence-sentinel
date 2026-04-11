'use client'

import { useState } from 'react'

export function NewsletterBlock() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      setMessage(data.message || data.error)
      if (res.ok) setEmail('')
    } catch {
      setMessage('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-stone-500">
        The Morning Edition
      </div>
      <p className="mt-3 text-sm leading-6 text-stone-700">
        Get the day&apos;s top local stories delivered to your inbox every morning.
      </p>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="h-11 w-full border border-stone-300 bg-[#fbf8f1] px-3 text-sm text-stone-800 placeholder:text-stone-400 focus:border-[#8b6b2e] focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-3 w-full bg-[#1c1a17] px-4 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#f7f1e6] transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {message && (
        <p className="mt-2 text-sm text-stone-600">{message}</p>
      )}
    </div>
  )
}
