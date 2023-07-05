/**
 * A utility method that iterates over an array of items and 
 * creates elements based on the items with given key prefixes. 
 * The elements are assembled in an array that is then returned.
 * 
 * Disabled fields can also be specified. Each item of the 
 * array is searched inside the `disabledFields`-array. If a 
 * match is found, then no element will be generated.
 * 
 * The `elementCreator`-function takes in the key of the element
 * that will be created, the item being iterated over, the index 
 * of the item as well as a reference to the array of items. All 
 * of the parameters do not have to be used in the creator function, 
 * however, the function must return a JSX-element.
 * 
 * @param {Array} arr Array of items that are to be mapped into 
 * elements.
 * @param {Function} elementCreator Function that is used to generate 
 * an element (parameters: key, item, index, array).
 * @param {String} keyPrefix Prefix for the keys of the elements that 
 * will be generated. The prefix is supplemented with the index of 
 * the item.
 * @param {Array} disabledFields Optional, items that should not be 
 * included in the elements.
 * 
 * @returns Array of JSX-elements based on the array.
 */
export const mapElements = (arr, elementCreator, keyPrefix = "", disabledFields = null) => {
  let elementMap = [];

  const s = arr.length;
  for( let i = 0; i < s; i++ )
  {
    const field = arr[i];
    if( !disabledFields || !disabledFields.includes(field) )
    elementMap.push(elementCreator(keyPrefix + "" + i, field, i, arr));
  }

  return elementMap;
};