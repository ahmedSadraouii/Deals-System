module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  importOrder: [
    '^react$',
    '^next$',
    '^next/',
    '^next(.*?)/',
    '<THIRD_PARTY_MODULES>',
    '^@/(.*)$',
    '\\.json$',
    '\\.css$',
  ],
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
};
