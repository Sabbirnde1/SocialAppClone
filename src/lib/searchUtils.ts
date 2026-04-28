/**
 * Highlights matching text in search results
 * @param text - The text to highlight
 * @param query - The search query to match
 * @returns HTML string with highlighted matches
 */
export const highlightText = (text: string, query: string): string => {
  if (!query || !text) return text;
  
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark class="bg-primary/20 text-primary">$1</mark>');
};

/**
 * Formats search result counts
 * @param count - The number of results
 * @returns Formatted count string
 */
export const formatResultCount = (count: number): string => {
  if (count === 0) return '';
  if (count > 99) return '(99+)';
  return `(${count})`;
};
