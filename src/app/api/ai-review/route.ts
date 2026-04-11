import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

/**
 * AI Review endpoint.
 * In production, this would call an LLM API to analyze article content.
 * For MVP, it performs basic rule-based checks.
 */
export async function POST(request: Request) {
  try {
    const { articleId } = await request.json()

    if (!articleId) {
      return NextResponse.json({ error: 'articleId is required.' }, { status: 400 })
    }

    const payload = await getPayloadClient()
    const article = await payload.findByID({ collection: 'articles', id: articleId })

    if (!article) {
      return NextResponse.json({ error: 'Article not found.' }, { status: 404 })
    }

    // Basic rule-based review (MVP placeholder for LLM integration)
    const bodyText = extractTextFromRichText(article.body)
    const riskFlags: Array<{ flag: string; severity: string; detail: string }> = []
    let grammarIssues = 0
    let attributionFlags = 0
    let factualClaimWarnings = 0

    // Check for common issues
    const sentences = bodyText.split(/[.!?]+/).filter(Boolean)

    for (const sentence of sentences) {
      const trimmed = sentence.trim()
      // Flag sentences starting with lowercase (after first)
      if (trimmed.length > 0 && trimmed[0] === trimmed[0].toLowerCase() && /^[a-z]/.test(trimmed)) {
        grammarIssues++
      }
    }

    // Check for unsupported claims
    const claimPatterns = [
      /according to sources/i,
      /sources say/i,
      /reportedly/i,
      /it is believed/i,
      /some say/i,
      /many people think/i,
    ]
    for (const pattern of claimPatterns) {
      if (pattern.test(bodyText)) {
        factualClaimWarnings++
        riskFlags.push({
          flag: 'Unsupported claim language',
          severity: 'medium',
          detail: `Found vague attribution: "${pattern.source}"`,
        })
      }
    }

    // Check for missing attribution
    if (bodyText.includes('"') && !bodyText.includes('said') && !bodyText.includes('according')) {
      attributionFlags++
      riskFlags.push({
        flag: 'Missing source attribution',
        severity: 'medium',
        detail: 'Quotes found without clear attribution to a named source.',
      })
    }

    // Generate suggestions
    const headline = article.headline || ''
    const suggestedSeoTitle = headline.length > 60
      ? headline.substring(0, 57) + '...'
      : headline
    const suggestedSummary = sentences.slice(0, 2).join('. ').trim() + '.'

    // Suggest tags based on content keywords
    const tagSuggestions: string[] = []
    const tagKeywords: Record<string, string[]> = {
      'independence-square': ['square', 'downtown', 'historic'],
      'city-council': ['council', 'city hall', 'vote', 'ordinance'],
      'schools': ['school', 'district', 'student', 'teacher'],
      'business': ['business', 'store', 'shop', 'restaurant', 'open'],
      'development': ['development', 'construction', 'building', 'zoning'],
    }
    const lowerBody = bodyText.toLowerCase()
    for (const [tag, keywords] of Object.entries(tagKeywords)) {
      if (keywords.some(kw => lowerBody.includes(kw))) {
        tagSuggestions.push(tag)
      }
    }

    const reviewData = {
      grammarIssues,
      attributionFlags,
      factualClaimWarnings,
      suggestedTags: tagSuggestions.join(', '),
      suggestedSeoTitle,
      suggestedSummary,
      riskFlags,
      reviewedAt: new Date().toISOString(),
    }

    // Update the article with AI review data
    await payload.update({
      collection: 'articles',
      id: articleId,
      data: {
        aiReview: reviewData,
        status: article.status === 'submitted' || article.status === 'teacher_approved'
          ? 'ai_reviewed'
          : article.status,
      },
    })

    return NextResponse.json({ success: true, review: reviewData })
  } catch (error) {
    console.error('AI review error:', error)
    return NextResponse.json({ error: 'AI review failed.' }, { status: 500 })
  }
}

function extractTextFromRichText(richText: any): string {
  if (!richText) return ''
  if (typeof richText === 'string') return richText

  // Handle Lexical rich text format
  if (richText.root && richText.root.children) {
    return extractChildren(richText.root.children)
  }

  return ''
}

function extractChildren(children: any[]): string {
  if (!Array.isArray(children)) return ''
  return children.map((child: any) => {
    if (child.text) return child.text
    if (child.children) return extractChildren(child.children)
    return ''
  }).join(' ')
}
