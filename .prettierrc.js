module.exports = {
  bracketSpacing: true,
  jsxBracketSameLine: true,
  singleQuote: true,
  trailingComma: 'all',
  endOfLine: 'lf',
  semi: true,
  printWidth: 90,
  importOrder: ['^react$', '^(?!(~/|./|../)).*$', '^~/(.*)$', '^[./]'],
  importOrderSeparation: true,
  plugins: ['./node_modules/@trivago/prettier-plugin-sort-imports'],
};
