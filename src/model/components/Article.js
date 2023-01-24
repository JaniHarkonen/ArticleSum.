export const articleSchema = {
  id: { defaultValue: "" },
  title: { defaultValue: "" },
  "publish-date": { defaultValue: "" },
  "read-date": { defaultValue: "" },
  source: { defaultValue: "" },
  tags: { defaultValue: [] },
  notes: { defaultValue: "" }
};

export const Article = (settings) => {
  return {
    id: "",
    title: "",
    "publish-date": "",
    "read-date": "",
    source: "",
    tags: [],
    notes: "",
    ...settings
  };
};

export const articleFields = Object.keys(articleSchema);
