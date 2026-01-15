import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { remarkBaseUrl } from './src/plugins/remark-base-url.mjs';

export default defineConfig({
  site: 'https://forensicdarkness.vercel.app',
  // base: '/forensic-darkness-site/', // Only needed for GitHub Pages subdirectory
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
    remarkPlugins: [remarkBaseUrl],
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
