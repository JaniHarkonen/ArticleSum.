/**
 * Takes a component schema, which is just a JSON containing the fields of 
 * the component paired to their specifications (like defaultValue), and 
 * generates a constructor function as well as an array of the fields of
 * the component. Finally, a JSON containing the constructor and the fields 
 * is returned.
 * @param {JSON} schema Component schema to generate the component off of.
 * 
 * @returns Returns a JSON containing the aspects used to form a component.
 */
export default function createComponentFromSchema(schema) {
  const component = {};
  const schemaKeys = Object.keys(schema);

  for( let key of schemaKeys )
  component[key] = schema[key].defaultValue;

  const constructor = (settings) => {
    return {
      ...schema,
      ...settings
    };
  };

  return {
    constructor,
    schemaKeys
  };
};
