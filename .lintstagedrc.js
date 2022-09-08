module.exports = {
  '*.{astro,js,jsx,ts,tsx}': 'eslint --fix',
  '*.{js,jsx,ts,tsx,md,html,css}': 'prettier --write',
  '*.astro': 'prettier -w --plugin-search-dir=.',
};
