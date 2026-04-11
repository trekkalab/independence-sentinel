import type { CollectionConfig } from 'payload'
import { isEditorOrAbove } from '../access/roles'

export const DirectoryListings: CollectionConfig = {
  slug: 'directory-listings',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'tier', 'active'],
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
      name: 'tier',
      type: 'select',
      required: true,
      defaultValue: 'free',
      options: [
        { label: 'Free Listing', value: 'free' },
        { label: 'Enhanced Listing', value: 'enhanced' },
        { label: 'Sponsor', value: 'sponsor' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Free: name + category + phone. Enhanced: adds description, website, hours. Sponsor: adds logo, featured placement, and link.',
      },
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
      admin: {
        description: 'Available for Enhanced and Sponsor tiers.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Available for Enhanced and Sponsor tiers.',
      },
    },
    {
      name: 'hours',
      type: 'textarea',
      admin: {
        description: 'Business hours. Available for Enhanced and Sponsor tiers.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Logo or photo. Available for Sponsor tier.',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      admin: {
        description: 'Short tagline or slogan. Sponsor tier only.',
      },
    },
    {
      name: 'featuredSponsor',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Pin to top of directory and homepage.',
      },
    },
    {
      name: 'sponsorStartDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'When the paid listing begins.',
      },
    },
    {
      name: 'sponsorEndDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'When the paid listing expires.',
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
