/** @type {import("prettier").Config & {importOrder: string[], importOrderSeparation: boolean, importOrderSortSpecifiers: boolean}} */
const config = {
  printWidth: 80,
  singleQuote: true,
  jsxSingleQuote: true,
  semi: false,
  trailingComma: 'all',
  importOrder: ['^[~/]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    require.resolve('@trivago/prettier-plugin-sort-imports'),
    require.resolve('prettier-plugin-tailwindcss'),
  ],
  pluginSearchDirs: false,
}

module.exports = config
