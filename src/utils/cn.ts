/**
 * Simple utility function to merge class names
 * Fallback implementation that doesn't require external dependencies
 */
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ").trim();
}

export default cn;
