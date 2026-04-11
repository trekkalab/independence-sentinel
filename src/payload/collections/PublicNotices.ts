import type { CollectionConfig } from 'payload'
import { isEditorOrAbove } from '../access/roles'

export const PublicNotices: CollectionConfig = {
  slug: 'public-notices',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'noticeType', 'startDate', 'endDate'],
  },
  access: {
    create: isEditorOrAbove,
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
      name: 'body',
      type: 'richText',
      required: true,
    },
    {
      name: 'noticeType',
      type: 'select',
      options: [
        { label: 'City Government', value: 'city' },
        { label: 'County', value: 'county' },
        { label: 'School District', value: 'school' },
        { label: 'Legal', value: 'legal' },
        { label: 'Public Hearing', value: 'hearing' },
        { label: 'General', value: 'general' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
    },
    {
      name: 'endDate',
      type: 'date',
    },
    {
      name: 'sponsoringEntity',
      type: 'text',
    },
    {
      name: 'paid',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
