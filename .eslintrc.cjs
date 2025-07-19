module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    // Files and paths that should NOT be linted or auto-fixed
    ignorePatterns: [
      'src/plugins/iconify/*.js',
      'src/components/icon/**',
      'src/assets/css/**',
      'node_modules',
      'dist',
      '*.d.ts',
      'vendor',
      '*.json',
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
      parser: '@typescript-eslint/parser',
      ecmaVersion: 13,
      sourceType: 'module',
    },
    extends: [
      'plugin:vue/vue3-recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:import/recommended',
      'plugin:import/typescript',
      'plugin:sonarjs/recommended',
      'plugin:promise/recommended'
    ],
    plugins: [
      'vue',
      '@typescript-eslint',
      'simple-import-sort',
      'sort-keys-fix',
      'newline-before-return',
      'sonarjs',
      'promise',
      'unicorn'
    ],
    rules: {
      // 1. Sort imports and exports alphabetically
      'simple-import-sort/imports': ['error', {
        groups: [
          // Side effect imports.
          ['^\\u0000'],
          // Packages.
          // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
          ['^@?\\w'],
          // Absolute imports and other imports such as Vue-style `@/foo`.
          // Anything not matched in another group.
          ['^'],
          // Relative imports.
          // Anything that starts with a dot.
          ['^\\.'],
        ]
      }],
      'simple-import-sort/exports': 'error',
  
      // 2. Block order: <template> → <script> → <style>
      'vue/block-order': ['error', { order: [['template', 'script'], 'style'] }],
  
      // 3. Disable shadowing
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'off',
  
      // 4. Use PascalCase for components in templates
      'vue/component-name-in-template-casing': ['error', 'PascalCase', { registeredComponentsOnly: false }],
  
      // 5. One attribute per line in multiline elements
      'vue/max-attributes-per-line': ['error', {
        singleline: 1,
        multiline: { max: 1, allowFirstLine: false }
      }],
  
      // 6. Alphabetical order of keys in objects
      'sort-keys-fix/sort-keys-fix': 'error',
  
      // 7. Blank line before each return
      'newline-before-return': 'error',
  
      // 8. Ensure refs used in <script setup> aren't marked as unused
      'vue/script-setup-uses-vars': 'error',
  
      // HIGH PRIORITY: SonarJS rules
      'sonarjs/no-identical-conditions': 'error',
      'sonarjs/no-duplicate-string': 'warn',
      'sonarjs/no-redundant-jump': 'error',
      'sonarjs/no-small-switch': 'warn',
      'sonarjs/prefer-immediate-return': 'warn',
      'sonarjs/no-inverted-boolean-check': 'warn',
  
      // HIGH PRIORITY: TypeScript ESLint rules
      '@typescript-eslint/explicit-function-return-type': ['warn', {
        'allowExpressions': true,
        'allowHigherOrderFunctions': true,
        'allowTypedFunctionExpressions': true
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/prefer-optional-chain': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
  
      // MEDIUM PRIORITY: Promise rules
      'promise/always-return': 'warn',
      'promise/no-return-wrap': 'error',
      'promise/param-names': 'error',
      'promise/catch-or-return': 'warn',
      'promise/no-nesting': 'warn',
  
      // MEDIUM PRIORITY: Unicorn rules
      'unicorn/filename-case': ['error', { 'case': 'kebabCase' }],
      'unicorn/no-abusive-eslint-disable': 'error',
      'unicorn/no-array-for-each': 'warn',
      'unicorn/prefer-array-find': 'warn',
      'unicorn/prefer-optional-catch-binding': 'warn',
  
      // MEDIUM PRIORITY: Import rules
      'import/first': 'error',
      'import/no-duplicates': 'error',
      'import/no-mutable-exports': 'error',
      // Disabled in favor of simple-import-sort with alphabetical ordering
      'import/order': 'off'
    },
    settings: {
      'import/resolver': {
        typescript: {}
      }
    }
  };
  