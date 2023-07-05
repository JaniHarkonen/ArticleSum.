/**
 * Creates an "enumeration", which is simply a JSON where each 
 * key is paired up with its name in string-format, of a given 
 * array of `keys`.
 * 
 * @param {Array} keys Key names that are to be included in the 
 * "enumeration".
 * 
 * @returns A JSON representing the enumeration.
 */
export default function createEnum(keys) {
  const e = {};

  for( let key of keys )
  e[key] = key;

  return e;
}
