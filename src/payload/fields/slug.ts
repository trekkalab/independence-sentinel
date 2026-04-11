import type { Field } from 'payload'

export const slugField: Field = {
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  admin: {
    position: 'sidebar',
    description: 'URL-friendly identifier. Auto-generated from headline if left empty.',
  },
  hooks: {
    beforeValidate: [
      ({ value, siblingData }) => {
        if (!value && siblingData?.headline) {
          return siblingData.headline
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        }
        return value
      },
    ],
  },
}
