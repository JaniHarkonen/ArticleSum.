import createComponentFromSchema from "./createComponentFromSchema";


export const Color = (settings) => {
  return {
    r: settings?.r || 0,
    g: settings?.g || 255,
    b: settings?.b || 0
  };
};

export const tagSchema = {
  tagId: { defaultValue: null },
  name: { defaultValue: "anecdotal" },
  color: { defaultValue: Color() }
};

const component = createComponentFromSchema(tagSchema);
export const { constructor: Tag, schemaKeys: tagFields } = component;