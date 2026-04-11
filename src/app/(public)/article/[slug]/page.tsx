import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Tag } from '@/components/ui/Tag'
import { Panel } from '@/components/ui/Panel'
import { AdSlot } from '@/components/public/AdSlot'
import { getArticleBySlug, getActiveAdPlacements } from '@/lib/queries'
import { formatDateTime } from '@/lib/utils'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug) as any

  if (!article) return { title: 'Article Not Found' }

  return {
    title: `${article.seoTitle || article.headline} — The Independence Sentinel`,
    description: article.seoDescription || article.deck || '',
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticleBySlug(slug) as any

  if (!article || article.status !== 'published') {
    notFound()
  }

  const adsResult = await getActiveAdPlacements('in_article')
  const inArticleAd = (adsResult.docs as any[])[0] || null

  return (
    <div className="grid gap-6 p-6 lg:grid-cols-12">
      {/* Main Article */}
      <article className="lg:col-span-8">
        <div className="mb-4 flex flex-wrap gap-2">
          {article.section && <Tag>{article.section}</Tag>}
          {article.tags?.map((t: any) => (
            <Tag key={t.tag}>{t.tag}</Tag>
          ))}
          {article.contributorType === 'student' && (
            <Tag tone="accent">Student Journalist</Tag>
          )}
        </div>

        <h1 className="font-serif text-4xl font-black leading-tight text-[#181512] md:text-5xl">
          {article.headline}
        </h1>

        {article.deck && (
          <p className="mt-3 text-xl leading-8 text-stone-600">
            {article.deck}
          </p>
        )}

        <div className="mt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">
          By {article.author?.name || 'Staff Reporter'}
          {article.publishDate && ` \u2022 Published ${formatDateTime(article.publishDate)}`}
          {article.updatedDate && ` \u2022 Updated ${formatDateTime(article.updatedDate)}`}
        </div>

        {article.heroImage?.url ? (
          <div className="my-6 overflow-hidden border border-stone-300">
            <img
              src={article.heroImage.url}
              alt={article.heroImage.alt || article.headline}
              className="h-80 w-full object-cover"
            />
            {article.imageCaption && (
              <div className="border-t border-stone-300 bg-[#f7f1e6] px-4 py-2 text-[11px] text-stone-600">
                {article.imageCaption}
                {article.heroImage.credit && ` — ${article.heroImage.credit}`}
              </div>
            )}
          </div>
        ) : (
          <div className="my-6 h-80 border border-stone-300 bg-[linear-gradient(135deg,#cfc6b6,#ebe4d6)]" />
        )}

        {/* Article body */}
        <div className="prose-sentinel">
          <RichTextRenderer content={article.body} />
        </div>
      </article>

      {/* Sidebar */}
      <div className="lg:col-span-4 space-y-6">
        <Panel title="Story Tools" subtitle="Share this story">
          <div className="flex flex-wrap gap-2">
            <Tag tone="muted">Share</Tag>
            <Tag tone="muted">Print</Tag>
            <Tag tone="muted">Email</Tag>
            <Tag tone="muted">Save</Tag>
          </div>
        </Panel>

        {article.relatedArticles?.length > 0 && (
          <Panel title="Related Coverage" subtitle="More on this topic">
            <div className="space-y-4">
              {article.relatedArticles.map((related: any) => (
                <div key={related.id} className="border-b border-stone-300 pb-4 last:border-b-0 last:pb-0">
                  <Link href={`/article/${related.slug}`}>
                    <div className="font-serif text-lg font-bold leading-7 text-[#1f1a14] hover:text-[#8b6b2e]">
                      {related.headline}
                    </div>
                  </Link>
                  <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500">
                    {related.section}
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        )}

        <Panel title="Sponsored" subtitle="Paid placement">
          <AdSlot placement={inArticleAd} className="h-48" />
        </Panel>
      </div>
    </div>
  )
}

function RichTextRenderer({ content }: { content: any }) {
  if (!content) return null

  // Handle Lexical rich text
  if (content.root?.children) {
    return (
      <div>
        {content.root.children.map((node: any, i: number) => (
          <RichTextNode key={i} node={node} />
        ))}
      </div>
    )
  }

  // Fallback for string content
  if (typeof content === 'string') {
    return <div dangerouslySetInnerHTML={{ __html: content }} />
  }

  return null
}

function RichTextNode({ node }: { node: any }) {
  if (!node) return null

  switch (node.type) {
    case 'paragraph':
      return (
        <p>
          {node.children?.map((child: any, i: number) => (
            <RichTextNode key={i} node={child} />
          ))}
        </p>
      )
    case 'heading': {
      const Tag = `h${node.tag || 2}` as keyof React.JSX.IntrinsicElements
      return (
        <Tag>
          {node.children?.map((child: any, i: number) => (
            <RichTextNode key={i} node={child} />
          ))}
        </Tag>
      )
    }
    case 'quote':
      return (
        <blockquote>
          {node.children?.map((child: any, i: number) => (
            <RichTextNode key={i} node={child} />
          ))}
        </blockquote>
      )
    case 'list': {
      const ListTag = node.listType === 'number' ? 'ol' : 'ul'
      return (
        <ListTag>
          {node.children?.map((child: any, i: number) => (
            <RichTextNode key={i} node={child} />
          ))}
        </ListTag>
      )
    }
    case 'listitem':
      return (
        <li>
          {node.children?.map((child: any, i: number) => (
            <RichTextNode key={i} node={child} />
          ))}
        </li>
      )
    case 'text': {
      let text: React.ReactNode = node.text || ''
      if (node.format & 1) text = <strong>{text}</strong>
      if (node.format & 2) text = <em>{text}</em>
      if (node.format & 8) text = <u>{text}</u>
      return <>{text}</>
    }
    case 'linebreak':
      return <br />
    default:
      if (node.children) {
        return (
          <>
            {node.children.map((child: any, i: number) => (
              <RichTextNode key={i} node={child} />
            ))}
          </>
        )
      }
      return null
  }
}
