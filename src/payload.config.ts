import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const usePostgres = process.env.DATABASE_URI?.startsWith('postgres')

import { Users } from './payload/collections/Users'
import { Media } from './payload/collections/Media'
import { Articles } from './payload/collections/Articles'
import { Events } from './payload/collections/Events'
import { Obituaries } from './payload/collections/Obituaries'
import { PublicNotices } from './payload/collections/PublicNotices'
import { DirectoryListings } from './payload/collections/DirectoryListings'
import { Advertisers } from './payload/collections/Advertisers'
import { AdPlacements } from './payload/collections/AdPlacements'
import { Schools } from './payload/collections/Schools'
import { NewsletterSubscribers } from './payload/collections/NewsletterSubscribers'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' — Independence Sentinel',
    },
  },
  collections: [
    Users,
    Media,
    Articles,
    Events,
    Obituaries,
    PublicNotices,
    DirectoryListings,
    Advertisers,
    AdPlacements,
    Schools,
    NewsletterSubscribers,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'independence-sentinel-dev-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: usePostgres
    ? postgresAdapter({
        pool: {
          connectionString: process.env.DATABASE_URI!,
        },
      })
    : sqliteAdapter({
        client: {
          url: process.env.DATABASE_URI || 'file:./independence-sentinel.db',
        },
      }),
  sharp,
  plugins: [
    seoPlugin({
      collections: ['articles'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }: any) => `${doc?.headline || doc?.title || 'Article'} — The Independence Sentinel`,
      generateDescription: ({ doc }: any) => doc?.deck || doc?.seoDescription || '',
    }),
  ],
})
