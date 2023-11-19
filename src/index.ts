import type { Field, TextField } from 'payload/dist/fields/config/types'

import IconInput from './components/IconInput'

interface IconBaseProps extends React.SVGAttributes<SVGElement> {
  children?: React.ReactNode
  size?: string | number
  color?: string
  title?: string
}

export default (
  options?: Partial<TextField> & {
    icons?: Record<string, string>
    reactIconPack?: { [key: string]: (props: IconBaseProps) => JSX.Element }
  },
): Field => {
  const { icons, reactIconPack, ...overwriteOptions } = options || {}

  let iconsFromPackAsRecord = {}

  if (!icons && reactIconPack) {
    iconsFromPackAsRecord = Object.entries(reactIconPack).reduce(
      (acc, [key, Icon]) =>
        typeof Icon === 'function' && {
          ...acc,
          [key]: Icon({ size: '1.5em' }),
        },
      {},
    )
  }

  return {
    ...overwriteOptions,
    name: overwriteOptions?.name || 'iconPicker',
    label: overwriteOptions?.label || 'Icon Picker',
    type: 'text',
    admin: {
      ...overwriteOptions?.admin,
      components: {
        ...overwriteOptions?.admin?.components,
        Field: args =>
          IconInput({ ...args, icons: icons || iconsFromPackAsRecord, renderSvg: Boolean(icons) }),
      },
    },
  }
}
