module.exports = {
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 80,
  bracketSameLine: true,
  endOfLine: 'auto',
  tabWidth: 2,
  useTabs: false,
  plugins: [require.resolve('prettier-plugin-astro')],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
