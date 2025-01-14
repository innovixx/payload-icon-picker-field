import type { GlobalConfig } from 'payload'

const Settings: GlobalConfig = {
  slug: 'settings',
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
  ],
}

export default Settings
