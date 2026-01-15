import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    date: z.string(),
    author: z.string().optional().default('foredark2day'),
    categories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
    description: z.string().optional(),
    image: z.string().optional(),
    // Content intensity indicators
    intensity: z.number().min(1).max(5).optional().default(2),
    contentWarnings: z.array(z.enum(['violence', 'graphic', 'psychological', 'sexual', 'child'])).optional(),
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    date: z.string(),
    author: z.string().optional().default('foredark2day'),
    draft: z.boolean().default(false),
    description: z.string().optional(),
  }),
});

const authors = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    name: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    bio: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const collections = { posts, pages, authors };
