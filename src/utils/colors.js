/*export const Color = (r, g, b) => {
  return {
    r: r || 0,
    g: g || 0,
    b: b || 0
  };
};

export const copyColor = (color) => {
  return Color(color.r, color.g, color.b);
}
*/
export const bit8ToHex = (bit8) => {
  const hex = bit8.toString(16);  // Use base16

  return hex.length === 1 ? "0" + hex : "" + hex; // Add the leading 0
};

export const rgbToHex = (r, g, b) => {
  const rHex = bit8ToHex(r);
  const gHex = bit8ToHex(g);
  const bHex = bit8ToHex(b);

  return rHex + "" + gHex + "" + bHex;
};

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
