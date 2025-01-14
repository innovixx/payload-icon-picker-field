import type { CollectionConfig } from 'payload'
import * as fa6Icons from 'react-icons/bs'

import { iconPickerField } from '@innovixx/payload-icon-picker-field'
import { icons } from '../assets/icons'

export const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      required: true,
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
      name: 'excerpt',
      type: 'text',
    },
    {
      name: 'date',
      type: 'date',
    },
  ],
}
