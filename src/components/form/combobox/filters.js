/**
 * @param {string} label a key reference for the object array
 * @param {string} search the terms to search for against the label specified
 * @param {Array} items an array of objects containing a property with the name of the label
 */
export function filterWithLabel(label = "", search = "", items = []) {
  const term = search.toLowerCase();

  return items.filter((item) => {
    const formatted = item[label].toLowerCase();
    return term.includes(formatted) || formatted.includes(term);
  });
}

/**
 * @param {string} search the term to search for within the items array
 * @param {Array} items an array of strings
 */
export function filterWithoutLabel(search = "", items = []) {
  const term = search.toLowerCase();

  return items.filter((item) => {
    const formatted = item.toLowerCase();
    return term.includes(formatted) || formatted.includes(term);
  });
}
