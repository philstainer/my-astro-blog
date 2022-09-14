export const getSlugFromPath = (path: string): string => {
  const paths = path.split('/');

  if (paths.includes('index.md') || paths.includes('index.mdx'))
    return paths.at(paths.length - 2) ?? '';

  return paths.at(-1)?.replace(/.(mdx|md)$/, '') ?? '';
};
