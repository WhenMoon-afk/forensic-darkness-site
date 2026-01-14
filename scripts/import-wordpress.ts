import { XMLParser } from 'fast-xml-parser';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const XML_PATH = './import/forensicdarkness-serialkillersampawareness.WordPress.2026-01-14.xml';
const POSTS_DIR = './src/content/posts';
const PAGES_DIR = './src/content/pages';
const AUTHORS_DIR = './src/content/authors';

interface WPItem {
  title: string;
  link: string;
  pubDate: string;
  'dc:creator': string;
  'content:encoded': string;
  'excerpt:encoded': string;
  'wp:post_id': number;
  'wp:post_date': string;
  'wp:post_name': string;
  'wp:status': string;
  'wp:post_type': string;
  category?: Array<{ '#text': string; '@_domain': string; '@_nicename': string }> | { '#text': string; '@_domain': string; '@_nicename': string };
}

interface WPAuthor {
  'wp:author_login': string;
  'wp:author_email': string;
  'wp:author_display_name': string;
  'wp:author_first_name': string;
  'wp:author_last_name': string;
}

// Convert WordPress Block Editor HTML to Markdown
function blocksToMarkdown(html: string): string {
  if (!html || typeof html !== 'string') return '';

  let md = html
    // Remove block comments
    .replace(/<!-- wp:[^>]+-->/g, '')
    .replace(/<!-- \/wp:[^>]+-->/g, '')
    // Convert headings
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
    .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n')
    .replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1\n\n')
    // Convert paragraphs
    .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
    // Convert links
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    // Convert bold/strong
    .replace(/<strong>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<b>(.*?)<\/b>/gi, '**$1**')
    // Convert italic/em
    .replace(/<em>(.*?)<\/em>/gi, '*$1*')
    .replace(/<i>(.*?)<\/i>/gi, '*$1*')
    // Convert images
    .replace(/<figure[^>]*>[\s\S]*?<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/>[\s\S]*?<figcaption[^>]*>(.*?)<\/figcaption>[\s\S]*?<\/figure>/gi, '![$2]($1)\n*$3*\n\n')
    .replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, '![$2]($1)\n\n')
    // Convert lists
    .replace(/<ul[^>]*>/gi, '')
    .replace(/<\/ul>/gi, '\n')
    .replace(/<ol[^>]*>/gi, '')
    .replace(/<\/ol>/gi, '\n')
    .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
    // Convert blockquotes
    .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gis, (_, content) => {
      return content.split('\n').map((line: string) => `> ${line}`).join('\n') + '\n\n';
    })
    // Remove remaining HTML tags
    .replace(/<[^>]+>/g, '')
    // Fix HTML entities
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#8211;/g, '-')
    .replace(/&#8212;/g, '--')
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#38;/g, '&')
    // Clean up whitespace
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return md;
}

// Create URL-safe slug
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Extract categories and tags from item
function extractTaxonomies(item: WPItem): { categories: string[]; tags: string[] } {
  const categories: string[] = [];
  const tags: string[] = [];

  if (!item.category) return { categories, tags };

  const cats = Array.isArray(item.category) ? item.category : [item.category];

  for (const cat of cats) {
    if (cat['@_domain'] === 'category' && cat['#text'] !== 'Uncategorized') {
      categories.push(cat['#text']);
    } else if (cat['@_domain'] === 'post_tag') {
      tags.push(cat['#text']);
    }
  }

  return { categories, tags };
}

// Generate frontmatter for MDX file
function generateFrontmatter(item: WPItem, type: 'post' | 'page'): string {
  const { categories, tags } = extractTaxonomies(item);
  const title = item.title || 'Untitled';
  const date = item['wp:post_date'] || new Date().toISOString().split('T')[0];
  const author = item['dc:creator'] || 'foredark2day';
  const slug = item['wp:post_name'] || slugify(title);

  let frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
slug: "${slug}"
date: "${date}"
author: "${author}"
`;

  if (type === 'post') {
    if (categories.length > 0) {
      frontmatter += `categories:\n${categories.map(c => `  - "${c}"`).join('\n')}\n`;
    }
    if (tags.length > 0) {
      frontmatter += `tags:\n${tags.map(t => `  - "${t}"`).join('\n')}\n`;
    }
  }

  frontmatter += `draft: ${item['wp:status'] !== 'publish'}
---\n\n`;

  return frontmatter;
}

async function main() {
  console.log('Reading WordPress XML export...');
  const xmlContent = readFileSync(XML_PATH, 'utf-8');

  console.log('Parsing XML...');
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    textNodeName: '#text',
    parseTagValue: false,
  });

  const result = parser.parse(xmlContent);
  const channel = result.rss.channel;
  const items: WPItem[] = Array.isArray(channel.item) ? channel.item : [channel.item];
  const authors: WPAuthor[] = Array.isArray(channel['wp:author']) ? channel['wp:author'] : [channel['wp:author']];

  // Ensure directories exist
  for (const dir of [POSTS_DIR, PAGES_DIR, AUTHORS_DIR]) {
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
  }

  // Process authors
  console.log('Processing authors...');
  for (const author of authors) {
    const slug = author['wp:author_login'];
    const authorContent = `---
id: "${slug}"
name: "${author['wp:author_display_name']}"
firstName: "${author['wp:author_first_name']}"
lastName: "${author['wp:author_last_name']}"
email: "${author['wp:author_email']}"
---
`;
    writeFileSync(join(AUTHORS_DIR, `${slug}.md`), authorContent);
    console.log(`  Created author: ${slug}`);
  }

  // Process posts and pages
  let postCount = 0;
  let pageCount = 0;

  console.log('Processing content...');
  for (const item of items) {
    const postType = item['wp:post_type'];
    const status = item['wp:status'];
    const content = item['content:encoded'];

    // Skip nav_menu_item, attachment, feedback, etc.
    if (postType !== 'post' && postType !== 'page') continue;

    // Skip items with no meaningful content
    if (!content || content.trim().length < 10) continue;

    const title = item.title || 'Untitled';
    let slug = item['wp:post_name'];

    // Generate slug from title if empty
    if (!slug || slug.match(/^\d+$/)) {
      slug = slugify(title);
    }

    // Skip if still no valid slug
    if (!slug) continue;

    const markdown = blocksToMarkdown(content);
    const frontmatter = generateFrontmatter(item, postType as 'post' | 'page');
    const fileContent = frontmatter + markdown;

    const dir = postType === 'post' ? POSTS_DIR : PAGES_DIR;
    const filename = `${slug}.mdx`;

    writeFileSync(join(dir, filename), fileContent);

    if (postType === 'post') {
      postCount++;
      console.log(`  Created post: ${slug}`);
    } else {
      pageCount++;
      console.log(`  Created page: ${slug}`);
    }
  }

  console.log(`\nImport complete!`);
  console.log(`  Posts: ${postCount}`);
  console.log(`  Pages: ${pageCount}`);
  console.log(`  Authors: ${authors.length}`);
}

main().catch(console.error);
