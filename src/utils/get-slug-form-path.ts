export const getSlugFromPath = (path: string): string =>
  path
    .split('/')
    .at(-1)
    .replace(/.(mdx|md)$/, '');
