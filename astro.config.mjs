import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://forensicdarkness.com',
  integrations: [mdx(), sitemap(), tailwind()],
  output: 'static',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover'
  },
  build: {
    assets: '_assets'
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
