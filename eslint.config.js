import payloadEsLintConfig from '@payloadcms/eslint-config'
import payloadPlugin from '@payloadcms/eslint-plugin'

export const defaultESLintIgnores = [
  '**/.temp',
  '**/.*',
  '**/.git',
  '**/tsconfig.tsbuildinfo',
  '**/README.md',
  '**/eslint.config.js',
  '**/dist/',
  '**/node_modules/',
]

/** @typedef {import('eslint').Linter.Config} Config */

export const rootParserOptions = {
  sourceType: 'module',
  ecmaVersion: 'latest',
  projectService: {
    maximumDefaultProjectFileMatchCount_THIS_WILL_SLOW_DOWN_LINTING: 40,
    allowDefaultProject: ['scripts/*.ts', '*.js', '*.mjs', '*.d.ts'],
  },
}

/** @type {Config[]} */
export const rootEslintConfig = [
  ...payloadEsLintConfig,
  {
    ignores: [
      ...defaultESLintIgnores,
    ],
  },
  {
    plugins: {
      payload: payloadPlugin,
    },
    rules: {
      'payload/no-jsx-import-statements': 'warn',
      'payload/no-relative-monorepo-imports': 'error',
      'payload/no-imports-from-exports-dir': 'error',
      'payload/no-imports-from-self': 'error',
      'payload/proper-payload-logger-usage': 'error',
    },
  },
]

export default [
  ...rootEslintConfig,
  {
    languageOptions: {
      parserOptions: {
        ...rootParserOptions,
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

]