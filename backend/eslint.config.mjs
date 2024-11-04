import globals from 'globals'
import pluginJs from '@eslint/js'

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs', // Adjust for your module type
      globals: {
        ...globals.node,
        ...globals.jest // Add Jest globals here
      }
    }
  },
  {
    languageOptions: {
      globals: globals.browser // If you have any browser globals
    }
  },
  pluginJs.configs.recommended
]
