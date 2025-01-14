import type { CollectionConfig } from 'payload'

import path from 'path'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: (): boolean => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt Text',
      required: true,
    },
  ],
  upload: {
    staticDir: path.join(process.cwd(), 'storage', 'media'),
  },
}