import type { CollectionConfig } from 'payload'
import { isEditorOrAbove, isLoggedIn } from '../access/roles'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'startDate', 'venue', 'approved'],
  },
  access: {
    create: isLoggedIn,
    read: () => true,
    update: isEditorOrAbove,
    delete: isEditorOrAbove,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'venue',
      type: 'text',
    },
    {
      name: 'address',
      type: 'text',
    },
    {
      name: 'organizer',
      type: 'text',
    },
    {
      name: 'submissionSource',
      type: 'select',
      options: [
        { label: 'Staff', value: 'staff' },
        { label: 'Community Submission', value: 'community' },
        { label: 'Sponsor', value: 'sponsor' },
      ],
      defaultValue: 'staff',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Government', value: 'government' },
        { label: 'Business', value: 'business' },
        { label: 'Community', value: 'community' },
        { label: 'Schools', value: 'schools' },
        { label: 'Arts & Culture', value: 'arts-culture' },
        { label: 'Sports', value: 'sports' },
        { label: 'Music', value: 'music' },
        { label: 'Family', value: 'family' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'approved',
      type: 'checkbox',
      defaultValue: false,
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
      },
    },
  ],
}
