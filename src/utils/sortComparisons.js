export const compareNumber = (n1, n2) => {
  if( n1 > n2 )
  return -1;
  
  if( n1 < n2 )
  return 1;
  
  return 0;
};

export const compareDateStrings = (d1, d2) => {
  return compareNumber(Date.parse(d1).getTime(), Date.parse(d2).getTime());
};

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
