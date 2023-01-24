export const mapElements = (arr, elementCreator, keyPrefix = "", disabledFields = null) => {
  let elementMap = [];

  const s = arr.length;
  for( let i = 0; i < s; i++ )
  {
    const field = arr[i];
    if( !disabledFields || disabledFields.includes(field) )
    elementMap.push(elementCreator(keyPrefix + "" + i, field, i, arr));
  }

  return elementMap;
};