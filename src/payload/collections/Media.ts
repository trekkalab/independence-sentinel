import type { CollectionConfig } from 'payload'
import { isLoggedIn, isPublishedOrEditorOrAbove } from '../access/roles'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: '../public/media',
    mimeTypes: ['image/*', 'application/pdf'],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300 },
      { name: 'card', width: 768, height: 512 },
      { name: 'hero', width: 1920, height: 1080 },
    ],
  },
  admin: {
    useAsTitle: 'alt',
  },
  access: {
    create: isLoggedIn,
    read: () => true,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Describe the image for accessibility.',
      },
    },
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'credit',
      type: 'text',
      admin: {
        description: 'Photographer or source credit.',
      },
    },
  ],
}
