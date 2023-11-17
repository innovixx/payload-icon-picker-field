import deepmerge from 'deepmerge'
import type { Plugin } from 'payload/config'

import type { PluginConfig } from './types'

export default (pluginConfig: PluginConfig): Plugin =>
  config => {
    return deepmerge(config, pluginConfig.overwrites || {})
  }
