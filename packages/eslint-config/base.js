module.exports = {
  parserOptions: {
    // 指定ESLint可以解析JSX语法
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['prettier', 'import', 'unused-imports'],
  extends: [
    'turbo',
    // 使用prettier格式化代码
    // https://github.com/prettier/eslint-config-prettier#readme
    'prettier',
    // 整合typescript-eslint与prettier
    // https://github.com/prettier/eslint-plugin-prettier
    'plugin:prettier/recommended',
  ],
  rules: {
    /* ********************************** ES6+ ********************************** */
    'no-console': 0,
    'no-var-requires': 0,
    'no-restricted-syntax': 0,
    'no-continue': 0,
    'no-empty': 0,
    'no-await-in-loop': 0,
    'no-return-await': 0,
    'no-unused-vars': 0,
    'no-multi-assign': 0,
    'no-param-reassign': [2, { props: false }],
    'import/prefer-default-export': 0,
    'import/no-cycle': 0,
    'import/no-dynamic-require': 0,
    'max-classes-per-file': 0,
    'class-methods-use-this': 0,
    'guard-for-in': 0,
    'no-underscore-dangle': 0,
    'no-plusplus': 0,
    'no-lonely-if': 0,
    'no-bitwise': ['error', { allow: ['~'] }],
    'no-shadow': 0,
    'no-param-reassign': 0,
    'prefer-destructuring': 0,
    'prettier/prettier': [
      0,
      {
        singleQuote: true,
        proseWrap: 'never',
        endOfLine: 'auto',
        printWidth: 100,
        trailingComma: 'all',
        semi: true,
      },
    ],
    /* ********************************** Module Import ********************************** */

    'import/no-absolute-path': 0,
    'import/extensions': 0,
    'import/no-named-default': 0,
    'no-restricted-exports': 0,
    'import/no-import-module-exports': 0,

    // 一部分文件在导入devDependencies的依赖时不报错
    'import/no-extraneous-dependencies': 0,
    // 模块导入顺序规则
    'import/order': [
      1,
      {
        pathGroups: [
          {
            pattern: '@/**',
            group: 'external',
            position: 'after',
          },
        ],
        alphabetize: { order: 'asc', caseInsensitive: false },
        'newlines-between': 'always-and-inside-groups',
        warnOnUnassignedImports: true,
      },
    ],
    // 自动删除未使用的导入
    // https://github.com/sweepline/eslint-plugin-unused-imports
    'unused-imports/no-unused-imports': 1,
    'unused-imports/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: true,
      },
    ],
  },
};
