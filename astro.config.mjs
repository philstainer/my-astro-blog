import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import { remarkReadingTime } from './src/utils/remark-reading-time.mjs';

export default defineConfig({
  site: 'https://philstainer.io',
  markdown: {
    remarkPlugins: [remarkReadingTime],
    extendDefaultPlugins: true,
  },
  integrations: [mdx(), sitemap(), react()],
});
