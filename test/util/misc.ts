/**
 * Converts an itemName into an elementId (removing spaces, symbols, etc.)
 * @param itemName The item's name
 * @returns elementId
 */
export function nameToId(itemName: string) {
  return itemName.replace(/\s/g, '-').replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/\./g, '\\.').toLowerCase();
}
