import type { CollectionConfig } from 'payload'
import { isEditorOrAbove, isPublishedOrEditorOrAbove, canReadOwnOrEditorial } from '../access/roles'
import { slugField } from '../fields/slug'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'headline',
    defaultColumns: ['headline', 'section', 'status', 'author', 'publishDate'],
  },
  access: {
    create: ({ req: { user } }) => {
      if (!user) return false
      return ['admin', 'editor', 'reporter', 'student_journalist'].includes(user.role)
    },
    read: isPublishedOrEditorOrAbove,
    update: canReadOwnOrEditorial,
    delete: isEditorOrAbove,
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'deck',
      type: 'text',
      admin: {
        description: 'Subheadline or summary line.',
      },
    },
    slugField,
    {
      name: 'section',
      type: 'select',
      required: true,
      options: [
        { label: 'Front Page', value: 'front-page' },
        { label: 'Government', value: 'government' },
        { label: 'Business', value: 'business' },
        { label: 'Community', value: 'community' },
        { label: 'Schools', value: 'schools' },
        { label: 'Events', value: 'events' },
        { label: 'History', value: 'history' },
        { label: 'Opinion', value: 'opinion' },
        { label: 'Obituaries', value: 'obituaries' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ req, value }) => {
            if (!value && req.user) return req.user.id
            return value
          },
        ],
      },
    },
    {
      name: 'contributorType',
      type: 'select',
      options: [
        { label: 'Staff', value: 'staff' },
        { label: 'Contributor', value: 'contributor' },
        { label: 'Student Journalist', value: 'student' },
      ],
      defaultValue: 'staff',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'imageCaption',
      type: 'text',
    },
    // Student Journalism Fields
    {
      name: 'schoolAffiliation',
      type: 'relationship',
      relationTo: 'schools',
      admin: {
        condition: (data) => data?.contributorType === 'student',
        description: 'School this student journalist represents.',
      },
    },
    {
      name: 'teacherApprover',
      type: 'relationship',
      relationTo: 'users',
      filterOptions: {
        role: { equals: 'teacher' },
      },
      admin: {
        condition: (data) => data?.contributorType === 'student',
        description: 'Teacher who must approve before editorial review.',
      },
    },
    {
      name: 'teacherApprovalDate',
      type: 'date',
      admin: {
        condition: (data) => data?.contributorType === 'student',
        readOnly: true,
        position: 'sidebar',
      },
    },
    // Dates
    {
      name: 'publishDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'updatedDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ value, operation }) => {
            if (operation === 'update') return new Date().toISOString()
            return value
          },
        ],
      },
    },
    // Editorial
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Submitted to Teacher', value: 'submitted_to_teacher' },
        { label: 'Returned by Teacher', value: 'returned_by_teacher' },
        { label: 'Teacher Approved', value: 'teacher_approved' },
        { label: 'Submitted', value: 'submitted' },
        { label: 'AI Reviewed', value: 'ai_reviewed' },
        { label: 'Needs Edit', value: 'needs_edit' },
        { label: 'Ready', value: 'ready' },
        { label: 'Scheduled', value: 'scheduled' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Feature on homepage.',
      },
    },
    {
      name: 'homepagePriority',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Lower number = higher priority on homepage. Leave empty for no homepage placement.',
      },
    },
    // SEO
    {
      name: 'seoTitle',
      type: 'text',
      admin: {
        description: 'Override title for search engines.',
      },
    },
    {
      name: 'seoDescription',
      type: 'textarea',
      admin: {
        description: 'Meta description for search engines.',
      },
    },
    // AI Review
    {
      name: 'aiReview',
      type: 'group',
      admin: {
        description: 'AI-generated review summary.',
      },
      fields: [
        {
          name: 'grammarIssues',
          type: 'number',
          defaultValue: 0,
        },
        {
          name: 'attributionFlags',
          type: 'number',
          defaultValue: 0,
        },
        {
          name: 'factualClaimWarnings',
          type: 'number',
          defaultValue: 0,
        },
        {
          name: 'suggestedTags',
          type: 'text',
        },
        {
          name: 'suggestedSeoTitle',
          type: 'text',
        },
        {
          name: 'suggestedSummary',
          type: 'textarea',
        },
        {
          name: 'riskFlags',
          type: 'array',
          fields: [
            {
              name: 'flag',
              type: 'text',
            },
            {
              name: 'severity',
              type: 'select',
              options: [
                { label: 'Low', value: 'low' },
                { label: 'Medium', value: 'medium' },
                { label: 'High', value: 'high' },
              ],
            },
            {
              name: 'detail',
              type: 'textarea',
            },
          ],
        },
        {
          name: 'reviewedAt',
          type: 'date',
        },
      ],
    },
    // Related
    {
      name: 'relatedArticles',
      type: 'relationship',
      relationTo: 'articles',
      hasMany: true,
    },
    // Editor notes
    {
      name: 'editorNotes',
      type: 'textarea',
      admin: {
        description: 'Internal notes for the editorial team. Not displayed publicly.',
      },
    },
  ],
}
