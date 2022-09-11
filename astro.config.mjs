import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

import { remarkReadingTime } from './src/utils/remark-reading-time.mjs';

export default defineConfig({
  site: 'https://philstainer.io',
  integrations: [
    mdx({ remarkPlugins: [remarkReadingTime] }),
    sitemap(),
    react(),
  ],
});
