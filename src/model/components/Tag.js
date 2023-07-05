import createComponentFromSchema from "./createComponentFromSchema";

/**
 * A JSON representing an RGB-color.
 * 
 * @param {*} settings A JSON that will be used to set the
 * `r`-, `g`- and `b`-components.
 * 
 * @returns A JSON with the RGB-components of the color.
 */
export const Color = (settings) => {
  return {
    r: settings?.r || 0,
    g: settings?.g || 0,
    b: settings?.b || 0
  };
};

/**
 * The structure of a tag containing the field names as well as their 
 * default values.
 */
export const tagSchema = {
  tagId: { defaultValue: null },
  name: { defaultValue: "" },
  color: { defaultValue: Color() }
};

/**
 * Converts an array of tags into string consisting of the name of the 
 * tags.
 * 
 * @param {Array} tags Tags whose names should be stringified.
 * 
 * @returns A string of all the names of the tags separated by spaces.
 */
export const tagsToString = (tags) => {
  let string = "";

  if( tags )
  {
    for( let tag of tags )
    if( tag )
    string += tag.name + " ";
  }

  return string;
};

const component = createComponentFromSchema(tagSchema);
export const { constructor: Tag, schemaKeys: tagFields } = component;