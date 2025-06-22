import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['build/'] },

  tseslint.configs.recommended,

  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
)
