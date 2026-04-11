'use client'

import { useState } from 'react'
import { Panel } from '@/components/ui/Panel'

const SECTIONS = [
  'front-page', 'government', 'business', 'community',
  'schools', 'events', 'history', 'opinion', 'obituaries',
]

export default function SubmitStoryPage() {
  const [form, setForm] = useState({
    headline: '',
    deck: '',
    section: 'community',
    location: '',
    sourceLinks: '',
    body: '',
  })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSave(action: 'draft' | 'submit' | 'ai_review') {
    setSaving(true)
    setMessage('')

    try {
      // In production, this would POST to the Payload API
      // For now, show the intended behavior
      const statusMap = {
        draft: 'draft',
        submit: 'submitted',
        ai_review: 'submitted',
      }

      setMessage(
        action === 'draft'
          ? 'Draft saved. You can continue editing from My Drafts.'
          : action === 'ai_review'
            ? 'AI Review requested. Check back for results.'
            : 'Story submitted for editorial review.'
      )
    } catch {
      setMessage('Something went wrong. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-9">
        <Panel title="Story Submission" subtitle="Structured fields keep copy consistent">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">
                Headline
              </label>
              <input
                type="text"
                value={form.headline}
                onChange={(e) => update('headline', e.target.value)}
                className="h-11 w-full border border-stone-300 bg-[#fbf8f1] px-3 text-sm focus:border-[#8b6b2e] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">
                Deck / Subheadline
              </label>
              <input
                type="text"
                value={form.deck}
                onChange={(e) => update('deck', e.target.value)}
                className="h-11 w-full border border-stone-300 bg-[#fbf8f1] px-3 text-sm focus:border-[#8b6b2e] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">
                Section
              </label>
              <select
                value={form.section}
                onChange={(e) => update('section', e.target.value)}
                className="h-11 w-full border border-stone-300 bg-[#fbf8f1] px-3 text-sm focus:border-[#8b6b2e] focus:outline-none"
              >
                {SECTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">
                Location
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => update('location', e.target.value)}
                placeholder="e.g., Independence Square"
                className="h-11 w-full border border-stone-300 bg-[#fbf8f1] px-3 text-sm placeholder:text-stone-400 focus:border-[#8b6b2e] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">
                Source Links
              </label>
              <input
                type="text"
                value={form.sourceLinks}
                onChange={(e) => update('sourceLinks', e.target.value)}
                placeholder="URLs to source documents"
                className="h-11 w-full border border-stone-300 bg-[#fbf8f1] px-3 text-sm placeholder:text-stone-400 focus:border-[#8b6b2e] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">
                Hero Image
              </label>
              <div className="flex h-11 items-center border border-stone-300 bg-[#fbf8f1] px-3 text-sm text-stone-500">
                Upload via CMS Admin
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">
              Article Body
            </label>
            <textarea
              value={form.body}
              onChange={(e) => update('body', e.target.value)}
              rows={16}
              className="w-full border border-stone-300 bg-[#fbf8f1] p-3 text-sm leading-7 focus:border-[#8b6b2e] focus:outline-none"
              placeholder="Write your story here..."
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => handleSave('draft')}
              disabled={saving}
              className="bg-[#1c1a17] px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[#f7f1e6] hover:opacity-90 disabled:opacity-50"
            >
              Save Draft
            </button>
            <button
              onClick={() => handleSave('ai_review')}
              disabled={saving}
              className="border border-stone-300 bg-white px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] text-stone-700 hover:bg-stone-100 disabled:opacity-50"
            >
              Run AI Review
            </button>
            <button
              onClick={() => handleSave('submit')}
              disabled={saving}
              className="border border-[#8b6b2e] bg-[#efe2bf] px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[#5f4718] hover:bg-[#e6d5a8] disabled:opacity-50"
            >
              Submit to Editor
            </button>
          </div>

          {message && (
            <p className="mt-4 text-sm font-semibold text-stone-700">{message}</p>
          )}
        </Panel>
      </div>

      <div className="lg:col-span-3">
        <Panel title="AI Review" subtitle="Flags issues before editorial review">
          <div className="space-y-3 text-sm text-stone-600">
            <p>
              Click &ldquo;Run AI Review&rdquo; after writing your article to get automated
              feedback on grammar, attribution, factual claims, and SEO suggestions.
            </p>
            <div className="border border-stone-300 bg-[#faf6ee] p-3 text-stone-500">
              No review results yet.
            </div>
          </div>
        </Panel>
      </div>
    </div>
  )
}
