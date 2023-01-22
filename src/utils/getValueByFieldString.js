export default function getValueByFieldString(json, fieldString) {
  if( !fieldString || fieldString.length < 1 )
  return null;

  let value = json;
  const fields = fieldString.split(".");

  for( let field of fields )
  value = value[field];

  return value;
}
