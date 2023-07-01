/**
 * Calculates the modulo operation on a given value using a given 
 * modulus. This function differs from the simple %-operator as it 
 * also works for negative values.
 * 
 * @param {Number} x Value that the modulo operation is is to be 
 * carried on.
 * @param {Number} mod Modulus to use.
 * 
 * @returns `x % mod` (negative numbers properly calculated)
 */
export default function nmod(x, mod) {
  return ((x % mod) + mod) % mod;
}
