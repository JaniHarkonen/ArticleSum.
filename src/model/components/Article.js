import { isDatetimeStringValid } from "../../utils/dates";
import createComponentFromSchema from "./createComponentFromSchema";

/**
 * The structure of an article containing the field names as well as
 * their default values.
 */
export const articleSchema = {
  id: { defaultValue: null },
  title: { defaultValue: "" },
  "publish-date": { defaultValue: "" },
  "read-date": { defaultValue: "" },
  source: { defaultValue: "" },
  tags: { defaultValue: [] },
  notes: { defaultValue: "" }
};

/**
 * Performs a validity check on an article by determining how many 
 * fields are missing input.
 * 
 * The result is a JSON containing the following information:
 * - `hasIssues` which is a boolean value indicating whether the 
 * article had any issues
 * - `issueCount` which holds the number of issues found
 * - `issues` which holds an array containing the names of the 
 * fields that had issues
 * 
 * @param {JSON} article Article JSON that is to be checked for 
 * issues.
 * 
 * @returns A JSON summarizing the issues.
 */
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

/**
 * Determines whether an article has empty information fields 
 * using the `checkArticleIssues`-function.
 * 
 * @param {JSON} article JSON of the article that is to be checked.
 * 
 * @returns Whether the article contained issues (empty information
 * fields).
 */
export const isArticleIncomplete = (article) => {
  return checkArticleIssues(article).hasIssues;
};

const component = createComponentFromSchema(articleSchema);
export const { constructor: Article, schemaKeys: articleFields } = component;