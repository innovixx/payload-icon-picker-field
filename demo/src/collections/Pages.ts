import type { CollectionConfig } from 'payload/types'

// eslint-disable-next-line import/no-relative-packages
import { iconPickerField } from '../../../dist'

const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'text',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      // NOTE: in order for position: 'sidebar' to work here,
      // the first field of this config must be of type `tabs`,
      // and this field must be a sibling of it
      // See `./Posts` or the `../../README.md` for more info
      admin: {
        position: 'sidebar',
      },
    },
    iconPickerField({
      name: 'icon',
      label: 'Icon',
    }),
    {
      name: 'date',
      type: 'date',
    },
  ],
}

export default Pages