import type { Field, TextField } from "payload"
import { IconBaseProps } from "react-icons"

export const iconPickerField = (
  options?: {
    icons?: Record<string, string>
  } & Partial<TextField>,
): Field => {
  const { icons, ...rest } = options || {}

  return {
    ...rest,
    name: rest?.name || 'iconPicker',
    type: 'text',
    admin: {
      ...rest?.admin,
      components: {
        ...rest?.admin?.components,
        Field: {
          clientProps: {
            icons: icons,
          },
          path: '@innovixx/payload-icon-picker-field/components#IconPickerFieldComponent',
        },
      },
    },
    label: rest?.label || 'Icon Picker',
  } as TextField
}