/**
 * Utility module that provides sorting functions for various 
 * purposes that are to be mainly used in the `Array.sort`-
 * method.
 */

/**
 * Compares the number `n1` to the number `n2` and returns a 
 * result accepted by the `Array.sort`-method (see `returns`).
 * 
 * @param {Number} n1 Number to compare.
 * @param {Number} n2 Number to compare to.
 * 
 * @returns 
 * - `-1` if `n1 > n2`
 * - `1` if `n1 < n2`
 * - `0` otherwise
 */
export const compareNumber = (n1, n2) => {
  if( n1 > n2 )
  return -1;
  
  if( n1 < n2 )
  return 1;
  
  return 0;
};

/**
 * Compares the datetime string `str1` to the datetime string 
 * `str2` and returns a result accepted by the `Array.sort`-
 * method (see `returns`).
 * 
 * @param {Number} str1 Datetime string to compare.
 * @param {Number} str2 Datetime string to compare to.
 * 
 * @returns 
 * - `-1` if `str1 > str2`
 * - `1` if `str1 < str2`
 * - `0` otherwise
 */
export const compareDateStrings = (str1, str2) => {
  const d1 = Date.parse(str1);
  const d2 = Date.parse(str2);

  if( !d1 || !d2 )
  return 1;

  return compareNumber(d1, d2);
};

/**
 * Compares the strings and returns a result accepted by the `Array.sort`-
 * method (see `returns`) to sort an array in an alphabetical order.
 * 
 * @param {String} s1 String to compare.
 * @param {String} s2 String to compare to.
 * 
 * @returns 
 * - `-1` if `s1 > s2`
 * - `1` if `s1 < s2`
 * - `0` otherwise
 */
export const compareStringAlphabetical = (s1, s2) => {
  const s = Math.min(s1.length, s2.length);
  
  for( let i = 0; i < s; i++ )
  {
    const comparison = compareNumber(s1.charCodeAt(i), s2.charCodeAt(i));

    if( comparison === 0 )
    continue;

    return comparison;
  }

  return 1;
};
