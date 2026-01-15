/**
 * Content utility functions shared across pages
 */

/** Words per minute for reading time calculation */
const WORDS_PER_MINUTE = 200;

/** Maximum excerpt length in characters */
const EXCERPT_LENGTH = 200;

/**
 * Calculate reading time in minutes based on word count
 */
export function getReadingTime(body?: string): number {
  if (!body) return 1;
  const wordCount = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

/**
 * Strip markdown formatting and create a clean text excerpt
 */
export function getExcerpt(body?: string, length: number = EXCERPT_LENGTH): string {
  if (!body) return '';
  return body
    .replace(/^#+\s+.*/gm, '')           // Remove headings
    .replace(/\*\*([^*]+)\*\*/g, '$1')   // Remove bold
    .replace(/\*([^*]+)\*/g, '$1')       // Remove italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '') // Remove images
    .replace(/`[^`]+`/g, '')             // Remove inline code
    .replace(/\n+/g, ' ')                // Replace newlines with space
    .trim()
    .substring(0, length) + '...';
}

/**
 * Extract the first image URL from markdown content
 */
export function getFirstImage(body?: string): string | undefined {
  if (!body) return undefined;
  const match = body.match(/!\[[^\]]*\]\(([^)]+)\)/);
  return match ? match[1] : undefined;
}

/**
 * Generate a case number in format FD-YYYY-MM from a date
 */
export function generateCaseNumber(date: string | Date): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  return `FD-${year}-${month}`;
}
