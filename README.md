# Forensic Darkness

A modern static website about serial killers, forensic psychology, and victim advocacy. Built with Astro 5 and Tailwind CSS.

**Live site:** https://whenmoon-afk.github.io/forensic-darkness-site/

## Features

- **Full-text search** - Powered by Pagefind
- **SEO optimized** - JSON-LD schemas, Open Graph, Twitter Cards, sitemap
- **PWA ready** - Installable on mobile devices
- **Accessible** - Skip links, ARIA roles, keyboard navigation
- **Print friendly** - Clean print stylesheet
- **Fast** - Static site with link prefetching

### Article Features
- Reading progress bar
- Estimated reading time
- Auto-generated table of contents
- Breadcrumb navigation
- Related posts
- Previous/Next navigation
- Social sharing buttons

## Tech Stack

- [Astro 5](https://astro.build/) - Static site generator
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [MDX](https://mdxjs.com/) - Content format
- [Pagefind](https://pagefind.app/) - Static search

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+

### Installation

```bash
# Clone the repository
git clone https://github.com/WhenMoon-afk/forensic-darkness-site.git
cd forensic-darkness-site

# Install dependencies
bun install

# Start development server
bun run dev
```

### Commands

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server at `localhost:4321` |
| `bun run build` | Build for production (includes Pagefind indexing) |
| `bun run preview` | Preview production build locally |

## Deployment

### GitHub Pages

1. Push to GitHub
2. Go to Settings → Pages
3. Set Source to "GitHub Actions"
4. The site will deploy automatically on push to `main`

### Custom Domain

Update `astro.config.mjs`:
```js
export default defineConfig({
  site: 'https://your-domain.com',
  // ...
});
```

## Configuration

### Contact Form

Update the Formspree form ID in `src/pages/contact.astro`:
```astro
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Site Metadata

Edit `src/layouts/BaseLayout.astro` to update:
- Site title
- Default description
- Social media images

## Project Structure

```
forensicdarkness/
├── public/
│   ├── images/          # Media files
│   ├── manifest.json    # PWA manifest
│   └── robots.txt       # Search engine directives
├── src/
│   ├── components/      # Reusable components
│   ├── content/posts/   # Blog posts (MDX)
│   ├── layouts/         # Page layouts
│   ├── pages/           # Routes
│   └── styles/          # Global CSS
├── astro.config.mjs     # Astro configuration
├── tailwind.config.mjs  # Tailwind configuration
└── package.json
```

## Content

### Adding Posts

Create a new `.mdx` file in `src/content/posts/`:

```mdx
---
title: "Post Title"
slug: "post-slug"
date: "2024-01-15"
author: "Author Name"
tags: ["tag1", "tag2"]
draft: false
---

Your content here...
```

### Categories and Tags

Posts are automatically organized by:
- **Categories** - Defined in frontmatter
- **Tags** - Defined in frontmatter

Archive pages are generated at:
- `/category/[category-slug]`
- `/tag/[tag-slug]`

## License

All rights reserved. Content is protected.

## Contact

- Email: forensicdarkness@gmail.com
- Facebook: [Forensic Darkness](https://www.facebook.com/forensicdarknessserialkillings)
