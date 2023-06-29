/**
 * Applies a `titleKey`-field to a given JSON.
 * 
 * @param {JSON} json JSON to apply the title field to.
 * @param {String} title Value of the title field.
 * 
 * @returns A new JSON with `titleKey`-field applied to 
 * it.
 */
export default function applyTitle(json, title) {
  return {
    ...json,
    titleKey: title
  };
}
