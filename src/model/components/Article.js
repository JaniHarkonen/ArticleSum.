import createComponentFromSchema from "./createComponentFromSchema";


export const articleSchema = {
  id: { defaultValue: null },
  title: { defaultValue: "title" },
  "publish-date": { defaultValue: "" },
  "read-date": { defaultValue: "" },
  source: { defaultValue: "" },
  tags: { defaultValue: [] },
  notes: { defaultValue: "" }
};

const component = createComponentFromSchema(articleSchema);
export const { constructor: Article, schemaKeys: articleFields } = component;