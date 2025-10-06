export const escapeRegex = (text: string) => (
  text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
);

export const removeRegexCharacters = (text: string) => (
  text.replace(/[.*+?^${}()|[\]\\]/g, '')
);