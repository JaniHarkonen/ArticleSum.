import createComponentFromSchema from "./createComponentFromSchema";


export const articleSchema = {
  id: { defaultValue: "55" },
  title: { defaultValue: "DICK" },
  "publish-date": { defaultValue: "" },
  "read-date": { defaultValue: "" },
  source: { defaultValue: "" },
  tags: { defaultValue: [] },
  notes: { defaultValue: "" }
};

const component = createComponentFromSchema(articleSchema);
export const { constructor: Article, schemaKeys: articleFields } = component;