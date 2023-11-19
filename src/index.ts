import type { Field, TextField } from 'payload/dist/fields/config/types'

import IconInput from './components/IconPicker/input'

export const iconPickerField = (options?: Partial<TextField>): Field => {
  return {
    ...options,
    name: options?.name || 'iconPicker',
    label: options?.label || 'Icon Picker',
    type: 'text',
    admin: {
      ...options?.admin,
      components: {
        ...options?.admin?.components,
        Field: args => IconInput({ ...args }),
      },
    },
  }
}
