'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Panel } from '@/components/ui/Panel'
import { Tag } from '@/components/ui/Tag'
import { STATUS_LABELS } from '@/lib/utils'

export default function EditorialReviewPage() {
  const params = useParams()
  const [article, setArticle] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [actionMessage, setActionMessage] = useState('')

  useEffect(() => {
    async function loadArticle() {
      try {
        const res = await fetch(`/api/articles/${params.id}`)
        if (res.ok) {
          const data = await res.json()
          setArticle(data)
        }
      } catch {
        // Article not found or API not ready
      } finally {
        setLoading(false)
      }
    }
    loadArticle()
  }, [params.id])

  async function handleAction(action: string) {
    setActionMessage('')
    try {
      const statusMap: Record<string, string> = {
        revision: 'needs_edit',
        approve: 'ready',
        schedule: 'scheduled',
        publish: 'published',
      }

      const res = await fetch(`/api/articles/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: statusMap[action] }),
      })

      if (res.ok) {
        setActionMessage(`Article ${action === 'publish' ? 'published' : action === 'schedule' ? 'scheduled' : action === 'revision' ? 'returned for revision' : 'approved'}.`)
        const data = await res.json()
        setArticle(data.doc || data)
      }
    } catch {
      setActionMessage('Action failed. Ensure you are signed in via CMS Admin.')
    }
  }

  async function runAiReview() {
    setActionMessage('Running AI review...')
    try {
      const res = await fetch('/api/ai-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId: params.id }),
      })
      if (res.ok) {
        const data = await res.json()
        setArticle((prev: any) => prev ? { ...prev, aiReview: data.review } : prev)
        setActionMessage('AI review complete.')
      }
    } catch {
      setActionMessage('AI review failed.')
    }
  }

  if (loading) {
    return (
      <Panel title="Loading..." subtitle="Fetching article for review">
        <p className="text-sm text-stone-500">Loading article data...</p>
      </Panel>
    )
  }

  if (!article) {
    return (
      <Panel title="Article Not Found" subtitle="Review">
        <p className="text-sm text-stone-600">
          Could not load this article. It may not exist or you may need to sign in via the CMS Admin panel first.
        </p>
      </Panel>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* Article preview */}
      <div className="lg:col-span-8">
        <Panel title="Article Preview" subtitle={STATUS_LABELS[article.status] || article.status}>
          <div className="mb-4 flex flex-wrap gap-2">
            {article.section && <Tag>{article.section}</Tag>}
            <Tag tone={article.status === 'ready' ? 'accent' : article.status === 'needs_edit' ? 'warning' : 'muted'}>
              {STATUS_LABELS[article.status] || article.status}
            </Tag>
            {article.contributorType === 'student' && (
              <Tag tone="accent">Student Journalist</Tag>
            )}
          </div>

          <h2 className="font-serif text-3xl font-black text-[#181512]">
            {article.headline}
          </h2>
          {article.deck && (
            <p className="mt-2 text-lg text-stone-600">{article.deck}</p>
          )}
          <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">
            By {article.author?.name || 'Reporter'}
          </div>

          <div className="mt-4 border-t border-stone-300 pt-4 text-sm leading-7 text-stone-700">
            {typeof article.body === 'string' ? (
              <p>{article.body}</p>
            ) : (
              <p className="text-stone-500">[Rich text content — view full article in CMS Admin]</p>
            )}
          </div>
        </Panel>
      </div>

      {/* Review pane */}
      <div className="lg:col-span-4 space-y-6">
        {/* Teacher approval indicator */}
        {article.contributorType === 'student' && (
          <Panel title="Student Journalism Safeguard">
            <div className="border border-[#d6b463] bg-[#f3e8c9] p-3 text-sm text-[#4b3710]">
              {article.teacherApprovalDate ? (
                <>Teacher approved on {article.teacherApprovalDate}</>
              ) : (
                <>Awaiting teacher approval</>
              )}
            </div>
          </Panel>
        )}

        {/* AI Review */}
        <Panel title="AI Review" subtitle="Automated checks">
          {article.aiReview?.reviewedAt ? (
            <div className="space-y-3">
              <div className={`border p-3 text-sm ${(article.aiReview.grammarIssues || 0) > 0 ? 'border-[#d6b463] bg-[#f3e8c9] text-[#4b3710]' : 'border-stone-300 bg-[#faf6ee] text-stone-700'}`}>
                {article.aiReview.grammarIssues || 0} grammar issues detected
              </div>
              <div className={`border p-3 text-sm ${(article.aiReview.factualClaimWarnings || 0) > 0 ? 'border-[#d6b463] bg-[#f3e8c9] text-[#4b3710]' : 'border-stone-300 bg-[#faf6ee] text-stone-700'}`}>
                {article.aiReview.factualClaimWarnings || 0} factual claim warnings
              </div>
              <div className={`border p-3 text-sm ${(article.aiReview.attributionFlags || 0) > 0 ? 'border-[#d6b463] bg-[#f3e8c9] text-[#4b3710]' : 'border-stone-300 bg-[#faf6ee] text-stone-700'}`}>
                {article.aiReview.attributionFlags || 0} attribution flags
              </div>
              {article.aiReview.suggestedSeoTitle && (
                <div className="border border-stone-300 bg-[#faf6ee] p-3 text-sm text-stone-700">
                  Suggested SEO title: {article.aiReview.suggestedSeoTitle}
                </div>
              )}
              {article.aiReview.suggestedTags && (
                <div className="border border-stone-300 bg-[#faf6ee] p-3 text-sm text-stone-700">
                  Suggested tags: {article.aiReview.suggestedTags}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-stone-500">No AI review yet.</p>
              <button
                onClick={runAiReview}
                className="border border-stone-300 bg-white px-4 py-2 text-sm font-bold uppercase tracking-[0.12em] text-stone-700 hover:bg-stone-100"
              >
                Run AI Review
              </button>
            </div>
          )}
        </Panel>

        {/* Actions */}
        <Panel title="Editor Actions" subtitle="Review controls">
          <div className="space-y-3">
            <button
              onClick={() => handleAction('revision')}
              className="w-full border border-stone-300 bg-white px-4 py-3 text-center text-sm font-bold uppercase tracking-[0.12em] text-stone-700 hover:bg-stone-100"
            >
              Request Revision
            </button>
            <button
              onClick={() => handleAction('approve')}
              className="w-full border border-[#8b6b2e] bg-[#efe2bf] px-4 py-3 text-center text-sm font-bold uppercase tracking-[0.12em] text-[#5f4718] hover:bg-[#e6d5a8]"
            >
              Approve &amp; Mark Ready
            </button>
            <button
              onClick={() => handleAction('schedule')}
              className="w-full border border-[#8b6b2e] bg-[#efe2bf] px-4 py-3 text-center text-sm font-bold uppercase tracking-[0.12em] text-[#5f4718] hover:bg-[#e6d5a8]"
            >
              Schedule
            </button>
            <button
              onClick={() => handleAction('publish')}
              className="w-full bg-[#1c1a17] px-4 py-3 text-center text-sm font-bold uppercase tracking-[0.12em] text-[#f7f1e6] hover:opacity-90"
            >
              Publish Now
            </button>
          </div>
          {actionMessage && (
            <p className="mt-3 text-sm font-semibold text-stone-700">{actionMessage}</p>
          )}
        </Panel>
      </div>
    </div>
  )
}
