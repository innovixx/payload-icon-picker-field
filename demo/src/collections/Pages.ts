import * as fa6Icons from 'react-icons/fa6'
import type { CollectionConfig } from 'payload/types'

// eslint-disable-next-line import/no-relative-packages
import iconPickerField from '../../../dist'
import { icons } from '../assets/icons'

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
      name: 'customIcons',
      label: 'Custom Icons',
      icons: icons,
    }),
    iconPickerField({
      name: 'reactIconsIcon',
      label: 'React Icons',
      reactIconPack: fa6Icons,
    }),
    {
      name: 'date',
      type: 'date',
    },
  ],
}

export default Pages
