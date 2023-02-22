import createComponentFromSchema from "./createComponentFromSchema";


export const Color = (settings) => {
  return {
    r: settings?.r || 0,
    g: settings?.g || 0,
    b: settings?.b || 0
  };
};

export const tagSchema = {
  tagId: { defaultValue: null },
  name: { defaultValue: "" },
  color: { defaultValue: Color() }
};

export const tagsToString = (tags) => {
  let string = "";

  for( let tag of tags )
  string += tag.name + " ";

  return string;
};

const component = createComponentFromSchema(tagSchema);
export const { constructor: Tag, schemaKeys: tagFields } = component;