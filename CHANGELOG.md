# Changelog

All notable changes to the Forensic Darkness website.

## [1.1.0] - 2026-01-14

### Added

#### Visual Enhancements
- Featured images on article cards (auto-extracted from content)
- Image thumbnails on homepage, blog, tag, and category pages

#### Performance
- Image compression (71MB → 32MB, 55% reduction)
- Lazy loading with `loading="lazy"` on all card images
- Async image decoding with `decoding="async"`
- DNS prefetch for Google Fonts

#### Accessibility
- Enhanced focus-visible styles for keyboard navigation
- `prefers-reduced-motion` support for users who prefer less animation
- `color-scheme: dark` meta tag for native dark mode

#### Developer Experience
- Image optimization script (`scripts/optimize-images.ts`)
- Sharp added as dev dependency

### Changed
- Improved excerpt generation on tag/category pages (strip markdown)
- Added reading time to tag and category archive pages

---

## [1.0.0] - 2026-01-14

### Added

#### Core Platform
- Astro 5 static site with Tailwind CSS
- MDX content support for blog posts
- WordPress content migration (14 posts, 64 images)
- GitHub Actions deployment workflow

#### SEO & Discovery
- JSON-LD structured data (WebSite, Article, BreadcrumbList schemas)
- Open Graph and Twitter Card meta tags
- XML sitemap with auto-generation
- RSS feed with autodiscovery
- robots.txt for search engines
- Canonical URLs on all pages

#### Search
- Full-text search powered by Pagefind
- 1994 words indexed across 88 pages
- Search icon in header navigation
- Dedicated search page with dark theme

#### Navigation & UX
- Reading progress bar on articles
- Estimated reading time on articles and listings
- Auto-generated table of contents
- Breadcrumb navigation with schema
- Previous/Next article navigation
- Related posts based on tags
- Back-to-top button
- Keyboard navigation (j/k for next/prev)
- Link prefetching for instant navigation

#### PWA & Mobile
- Web app manifest for "Add to Home Screen"
- Theme color for browser UI
- Apple mobile web app support
- Responsive design throughout

#### Accessibility
- Skip to content link
- ARIA roles and labels
- Keyboard focus management
- Semantic HTML structure

#### Pages
- Homepage with hero and recent articles
- Blog index with tag filtering
- Individual article pages
- Category archive pages
- Tag archive pages
- Serial Killers hub page
- About page
- Resources page with crisis hotlines
- Spirituality page
- Contact page (Formspree-ready)
- Privacy policy
- Disclaimer
- Custom 404 page with search
- Search page

#### Print Support
- Print stylesheet for articles
- Hidden navigation when printing
- URL expansion for external links

#### Documentation
- Comprehensive README
- This CHANGELOG

### Technical Details

- **Framework**: Astro 5.16.9
- **Styling**: Tailwind CSS 3.4
- **Content**: MDX with Astro Content Collections
- **Search**: Pagefind 1.4.0
- **Build**: Bun runtime
- **Deployment**: GitHub Pages via Actions

---

*Migrated from WordPress.com to modern static site architecture.*
