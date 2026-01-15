/**
 * Remark plugin to prepend base URL to internal links and images in MDX content.
 * For Vercel deployment, BASE_URL is '/' (root).
 * For GitHub Pages subdirectory, change to '/forensic-darkness-site/'.
 */
import { visit } from 'unist-util-visit';

const BASE_URL = '/';

export function remarkBaseUrl() {
  return (tree) => {
    visit(tree, (node) => {
      // Handle links
      if (node.type === 'link' && node.url?.startsWith('/')) {
        node.url = BASE_URL + node.url.slice(1);
      }
      // Handle images
      if (node.type === 'image' && node.url?.startsWith('/')) {
        node.url = BASE_URL + node.url.slice(1);
      }
    });
  };
}
