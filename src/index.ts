import type { Field, TextField } from 'payload/dist/fields/config/types'

export const iconPickerField = (options?: Partial<TextField>): Field => {
  return {
    ...options,
    name: options?.name || 'iconPicker',
    label: options?.label || 'Icon Picker',
    type: 'text',
    admin: {
      ...options?.admin,
      // components: {
      //   ...options?.admin?.components,
      //   Field: args => TextInput({ ...args }),
      // },
    },
  }
}
