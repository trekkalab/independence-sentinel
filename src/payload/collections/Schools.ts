import type { CollectionConfig } from 'payload'
import { isAdmin, isEditorOrAbove } from '../access/roles'

export const Schools: CollectionConfig = {
  slug: 'schools',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'district', 'active'],
  },
  access: {
    create: isAdmin,
    read: isEditorOrAbove,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'district',
      type: 'text',
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
