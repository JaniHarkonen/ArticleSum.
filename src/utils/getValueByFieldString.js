/**
 * Returns a value from a given field of a JSON. Fields can be 
 * nested in the `fieldString` using dots (.) just like in 
 * typical JSON JavaScript notation.
 * 
 * @param {JSON} json JSON to retrieve the values from.
 * @param {String} fieldString Name of the field (fields) 
 * whose value is to be retrieved.
 * 
 * @returns The value of the field or `null` if the field is 
 * invalid.
 */
export default function getValueByFieldString(json, fieldString) {
  if( !fieldString || fieldString.length < 1 )
  return null;

  let value = json;
  const fields = fieldString.split(".");

  for( let field of fields )
  value = value[field];

  return value;
}
