import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { getExcerpt } from '../utils/content';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  // Use BASE_URL from config for consistent path handling
  const baseUrl = import.meta.env.BASE_URL;

  return rss({
    title: 'Forensic Darkness',
    description: 'Serial Killers & Awareness - Victims being informed with help and resources',
    site: context.site!,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.description || getExcerpt(post.body, 200),
      link: `${baseUrl}blog/${post.data.slug || post.slug}/`,
      categories: post.data.tags || [],
    })),
    customData: `<language>en-us</language>`,
  });
}
