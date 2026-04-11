import type { CollectionConfig } from 'payload'
import { isEditorOrAbove } from '../access/roles'

export const Obituaries: CollectionConfig = {
  slug: 'obituaries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'publishDate', 'status'],
  },
  access: {
    create: isEditorOrAbove,
    read: () => true,
    update: isEditorOrAbove,
    delete: isEditorOrAbove,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'birthDate',
      type: 'date',
    },
    {
      name: 'deathDate',
      type: 'date',
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'serviceInfo',
      type: 'textarea',
      admin: {
        description: 'Service date, location, and arrangement details.',
      },
    },
    {
      name: 'funeralHome',
      type: 'text',
    },
    {
      name: 'publishDate',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
