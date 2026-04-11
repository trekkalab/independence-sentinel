import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrSelf } from '../access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role'],
  },
  access: {
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'reporter',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Reporter', value: 'reporter' },
        { label: 'Student Journalist', value: 'student_journalist' },
        { label: 'Teacher', value: 'teacher' },
        { label: 'Advertiser', value: 'advertiser' },
      ],
      access: {
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
    {
      name: 'school',
      type: 'relationship',
      relationTo: 'schools',
      admin: {
        condition: (data) =>
          data?.role === 'student_journalist' || data?.role === 'teacher',
        description: 'Required for student journalists and teachers.',
      },
    },
    {
      name: 'teacherSponsor',
      type: 'relationship',
      relationTo: 'users',
      filterOptions: {
        role: { equals: 'teacher' },
      },
      admin: {
        condition: (data) => data?.role === 'student_journalist',
        description: 'The teacher who sponsors this student journalist.',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      admin: {
        description: 'Short bio displayed on author pages.',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
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
