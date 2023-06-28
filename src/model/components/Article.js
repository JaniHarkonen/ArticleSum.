import { isDatetimeStringValid } from "../../utils/dates";
import createComponentFromSchema from "./createComponentFromSchema";


export const articleSchema = {
  id: { defaultValue: null },
  title: { defaultValue: "" },
  "publish-date": { defaultValue: "" },
  "read-date": { defaultValue: "" },
  source: { defaultValue: "" },
  tags: { defaultValue: [] },
  notes: { defaultValue: "" }
};

export const checkArticleIssues = (article) => {
  const issues = [];

  const pushIfFailsCheck = (check, issue) => {
    if( !check )
    issues.push(issue);
  };

  const pushIfValidString = (field) => {
    pushIfFailsCheck(article[field] && typeof article[field] === "string" && article[field] !== "", field);
  };

  pushIfValidString("id");
  pushIfValidString("title");
  pushIfFailsCheck(isDatetimeStringValid(article["publish-date"]), "publish-date");
  pushIfFailsCheck(isDatetimeStringValid(article["read-date"]), "read-date");
  pushIfValidString("source");
  pushIfFailsCheck(article.tags && article.tags.length > 0, "tags");
  pushIfValidString("notes");

  return {
    hasIssues: (issues.length > 0),
    issueCount: issues.length,
    issues
  };
};

export const isArticleIncomplete = (article) => {
  return checkArticleIssues(article).hasIssues;
};

const component = createComponentFromSchema(articleSchema);
export const { constructor: Article, schemaKeys: articleFields } = component;