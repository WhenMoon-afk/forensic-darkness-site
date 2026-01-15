/**
 * Remark plugin to prepend base URL to internal links and images in MDX content.
 * This ensures all /path URLs work correctly on GitHub Pages with a base path.
 */
import { visit } from 'unist-util-visit';

const BASE_URL = '/forensic-darkness-site/';

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
