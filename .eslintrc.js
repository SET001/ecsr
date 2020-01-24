module.exports = {
  extends: ['airbnb/base'],
  parser:  "@typescript-eslint/parser",
  plugins: ['@typescript-eslint', 'prettier'],
  parserOptions:  {
    ecmaVersion:  2018,
    sourceType:  "module"
  },
  ignorePatterns: ['dist/', 'node_modules/'],
  rules:{
    semi: ["error", "never"],
    "import/no-cycle": "off",
    "import/prefer-default-export": "off",
    "import/no-unresolved": 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': ["error", {"devDependencies": ["**/*.spec.ts"]}],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "no-useless-constructor": "off",
    "@typescript-eslint/no-useless-constructor": "error",
    "no-empty-function": 'off',
    "@typescript-eslint/no-empty-function": "error",
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-tabindex': 'off',
    'lines-between-class-members': 'off',
    'no-bitwise': 'off',
    'no-plusplus': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-shadow': 'off',
    
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': [".ts",".tsx"]
     },
     'import/resolver': {
         'node': {
             'extensions': [".js",".jsx",".ts",".tsx"]
         }
     }
  },
  env: {
    browser: true,
    node: true,
    jasmine: true
  },
}