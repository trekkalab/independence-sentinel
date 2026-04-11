import type { CollectionConfig } from 'payload'
import { isAdmin, isEditorOrAbove } from '../access/roles'

export const Advertisers: CollectionConfig = {
  slug: 'advertisers',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'contactName', 'billingStatus'],
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
      name: 'contactName',
      type: 'text',
    },
    {
      name: 'contactEmail',
      type: 'email',
    },
    {
      name: 'contactPhone',
      type: 'text',
    },
    {
      name: 'billingStatus',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Pending', value: 'pending' },
        { label: 'Inactive', value: 'inactive' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
    },
  ],
}
