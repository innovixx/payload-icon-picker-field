import type { Field, TextField } from 'payload/dist/fields/config/types'

import IconInput from './components/IconInput'

export const iconPickerField = (
  options?: Partial<TextField> & {
    icons?: Record<string, string>
  },
): Field => {
  const { icons, ...overwriteOptions } = options || {}

  return {
    ...overwriteOptions,
    name: overwriteOptions?.name || 'iconPicker',
    label: overwriteOptions?.label || 'Icon Picker',
    type: 'text',
    admin: {
      ...overwriteOptions?.admin,
      components: {
        ...overwriteOptions?.admin?.components,
        Field: args => IconInput({ ...args, icons }),
      },
    },
  }
}
