module.exports = {
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 80,
  bracketSameLine: true,
  endOfLine: 'auto',
  tabWidth: 2,
  useTabs: false,
  tailwindConfig: './tailwind.config.js',
  plugins: [
    require.resolve('prettier-plugin-astro'),
    require('prettier-plugin-tailwindcss'),
  ],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
