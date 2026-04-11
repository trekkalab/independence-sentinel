import type { CollectionConfig } from 'payload'
import { isEditorOrAbove } from '../access/roles'

export const DirectoryListings: CollectionConfig = {
  slug: 'directory-listings',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'featuredSponsor', 'active'],
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
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Restaurant & Dining', value: 'dining' },
        { label: 'Retail', value: 'retail' },
        { label: 'Professional Services', value: 'professional' },
        { label: 'Healthcare', value: 'healthcare' },
        { label: 'Home Services', value: 'home' },
        { label: 'Automotive', value: 'automotive' },
        { label: 'Arts & Entertainment', value: 'arts' },
        { label: 'Nonprofit', value: 'nonprofit' },
        { label: 'Church & Religious', value: 'religious' },
        { label: 'Government', value: 'government' },
        { label: 'Education', value: 'education' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'address',
      type: 'text',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'website',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'featuredSponsor',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Highlight as a paid featured listing.',
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
