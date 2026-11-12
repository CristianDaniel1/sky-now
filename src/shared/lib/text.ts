/**
 * Upper-cases the first letter of a text.
 *
 * @param text - Text to change.
 * @returns The text with its first letter in upper case.
 */
export const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);
