module.exports = {
  parserOptions: {
    // React启用jsx
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es6: true,
    browser: true,
    jest: true,
    node: true,
  },
  plugins: ['react-refresh'],
  extends: [
    // airbnb规范
    // airbnb规范
    // https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb
    'airbnb',
    // 兼容typescript的airbnb规范
    // https://github.com/iamturns/eslint-config-airbnb-typescript
    'airbnb-typescript',
    // react hooks的airbnb规范
    'airbnb/hooks',
    './base-ts',
  ],
  rules: {
    /* ********************************** React and Hooks ********************************** */
    'react/jsx-uses-react': 1,
    'react/jsx-uses-vars': 1,
    'react/jsx-no-useless-fragment': 0,
    'react/display-name': 0,
    'react/button-has-type': 0,
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'react/destructuring-assignment': 0,
    'react/static-property-placement': 0,
    'react/react-in-jsx-scope': 0,
    'react/require-default-props': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
    ],
    'react-hooks/exhaustive-deps': 0,
    'react-refresh/only-export-components': 0,

    /* ********************************** jax-a11y ********************************** */
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
  },
  settings: {
    extensions: ['.ts', '.tsx', '.d.ts', '.cts', '.mts', '.js', 'jsx', '.cjs', 'mjs', '.json'],
  },
};
