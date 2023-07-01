/**
 * This utility module contains all utility functions pertaining to 
 * colors, their conversion and handling.
 */

/**
 * Converts an 8bit color value to hexadecimal (base16).
 * 
 * @param {Number} bit8 8-bit value to convert to hexadecimal.
 * 
 * @returns A hexadecimal representing the 8-bit value.
 */
export const bit8ToHex = (bit8) => {
  const hex = bit8.toString(16);  // Use base16

  return (hex.length === 1) ? "0" + hex : "" + hex; // Add the leading 0
};

/**
 * Converts red, green and blue values to a hexadecimal
 * presentation.
 * 
 * @param {Number} r 8-bit red value (0-255).
 * @param {Number} g 8-bit green value (0-255).
 * @param {Number} b 8-bit blue value (0-255).
 * 
 * @returns A hexadecimal representing the color components.
 */
export const rgbToHex = (r, g, b) => {
  const rHex = bit8ToHex(r);
  const gHex = bit8ToHex(g);
  const bHex = bit8ToHex(b);

  return rHex + "" + gHex + "" + bHex;
};

/**
 * Converts a hexadecimal color representation to 8-bit
 * red, green and blue components.
 * 
 * @param {Number} hex Hexadecimal (base16) value that is to 
 * be converted.
 * @param {Boolean} hasLeadingSign Whether the hexadecimal
 * has leading zeroes.
 * 
 * @returns A JSON containing the `red`, `green` and `blue` 
 * components of the color.
 */
export const hexToRGB = (hex, hasLeadingSign = false) => {
  let offset = 0;
  
  if( hasLeadingSign )
  offset++;

  const r = parseInt(hex.substring(offset, offset + 2), 16);
  offset += 2;
  const g = parseInt(hex.substring(offset, offset + 2), 16);
  offset += 2;
  const b = parseInt(hex.substring(offset, offset + 2), 16);
  
  return {
    r: r,
    g: g,
    b: b
  };
};
