export default function createOrderedJson(json, fieldAliases = {}) {
  fieldAliases = {
    srcOrderField: "_order",
    destDataField: "data",
    destOrderField: "order",
    ...fieldAliases
  };

  const { srcOrderField, destDataField, destOrderField } = fieldAliases;

  const orderedJson = {
    [destDataField]: {},
    [destOrderField]: []
  };

  let fieldSum = 0; // Used to check that there are no gaps in the order
  let fieldCount = 0;

  for( let field in json )
  {
    orderedJson[destDataField][field] = json[field];

      // Two items cannot occupy the same position in the order
    const orderPosition = json[field][srcOrderField];
    if( orderedJson[destOrderField][orderPosition] )
    return null;

    fieldCount++;
    fieldSum += orderPosition;
    orderedJson[destOrderField][orderPosition] = field;
  }

  if( json.length <= 1 )
  return orderedJson;

    // If there are gaps in the order, return null
    // (comparing averages)
  if( fieldSum / fieldCount === (fieldCount - 1) / 2 )
  return orderedJson;

  return null;
}
