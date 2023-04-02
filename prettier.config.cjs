/** @type {import("prettier").Config} */
const config = {
  printWidth: 80,
  singleQuote: true,
  jsxSingleQuote: true,
  semi: false,
  trailingComma: 'all',
  importOrder: ['^[~/]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
}

module.exports = config
