export default function createEnum(keys) {
  const e = {};

  for( let key of keys )
  e[key] = key;

  return e;
}
