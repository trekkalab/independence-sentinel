import type { CollectionConfig } from 'payload'
import { isAdmin, isEditorOrAbove } from '../access/roles'

export const AdPlacements: CollectionConfig = {
  slug: 'ad-placements',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'placementType', 'advertiser', 'active'],
  },
  access: {
    create: isEditorOrAbove,
    read: isEditorOrAbove,
    update: isEditorOrAbove,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'placementType',
      type: 'select',
      required: true,
      options: [
        { label: 'Homepage Hero Sponsor', value: 'homepage_hero' },
        { label: 'Sidebar Display', value: 'sidebar' },
        { label: 'Section Sponsor', value: 'section_sponsor' },
        { label: 'Newsletter Sponsor', value: 'newsletter' },
        { label: 'Sponsored Story', value: 'sponsored_story' },
        { label: 'In-Article Ad', value: 'in_article' },
      ],
    },
    {
      name: 'pageLocation',
      type: 'text',
      admin: {
        description: 'Where on the page this ad appears (e.g., "sidebar-top", "below-fold").',
      },
    },
    {
      name: 'dimensions',
      type: 'text',
      admin: {
        description: 'Display dimensions or notes (e.g., "300x250", "full-width banner").',
      },
    },
    {
      name: 'advertiser',
      type: 'relationship',
      relationTo: 'advertisers',
    },
    {
      name: 'creative',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'linkUrl',
      type: 'text',
      admin: {
        description: 'Click-through URL for the ad.',
      },
    },
    {
      name: 'startDate',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'monthlyRate',
      type: 'number',
      admin: {
        description: 'Monthly rate in dollars.',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
