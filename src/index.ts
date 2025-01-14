import type { Field, TextField } from "payload"
import { IconBaseProps } from "react-icons"

export const iconPickerField = (
  options?: {
    icons?: Record<string, string>
    reactIconPack?: { [key: string]: (props: IconBaseProps) => Element }
  } & Partial<TextField>,
): Field => {
  const { icons, reactIconPack, ...rest } = options || {}

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
            icons,
            reactIconPack,
          },
          path: '@innovixx/payload-icon-picker-field/components#IconPickerFieldComponent',
        },
      },
    },
    label: rest?.label || 'Icon Picker',
  } as TextField
}