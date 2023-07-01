/**
 * This utility module contains commonly used string manipulation
 * functions.
 */

/**
 * Capitalizes the first letter of a given string.
 * 
 * @param {String} string String whose first letter to capitalize.
 * 
 * @returns A new string with the first letter capitalized.
 */
export const capitalizeFirstLetter = (string) => {
  return string[0].toUpperCase() + string.substring(1);
};

/**
 * Converts the first letter of a string into lower case.
 * 
 * @param {String} string String whose first letter is to be 
 * converted into lower case.
 * 
 * @returns A new string with the first letter in lower.
 */
export const lowercaseFirstLetter = (string) => {
  return string[0].toLowerCase() + string.substring(1);
};

/**
 * Converts a string written in kebab case where a space is 
 * indicated by a dash (example: `this-is-kebab-case`) into
 * a camel case string where the first letter is in lower 
 * case and subsequent spaces are indicated by writing each 
 * word with their first letter in upper case (example: 
 * `thisIsCamelCase`).
 * 
 * @param {String} string Kebab case string that is to be 
 * converted into camel case.
 * 
 * @returns A new string that is written in camel case.
 */
export const kebabCaseToCamelCase = (string) => {
  string = string[0].toLowerCase() + string.substring(1);
  
  const dashSplit = string.split("-");
  let camelString = dashSplit[0];

  for( let i = 1; i < dashSplit.length; i++ )
  camelString += capitalizeFirstLetter(dashSplit[i]);

  return camelString;
};

/**
 * Returns the number of occurrences of a character in a 
 * given string. **Notice:** this function only accepts single
 * characters as the second input.
 * 
 * @param {String} string String that is to be searched for 
 * occurrences.
 * @param {String} character Single character whose occurrences 
 * are to be counted.
 * 
 * @returns Number of occurrences of the `character` in the 
 * `string`.
 */
export const numberOfCharOccurrences = (string, character) => {
  let occurrences = 0;
  
  for( let c of string )
  if( c === character )
  occurrences++;

  return occurrences;
};
