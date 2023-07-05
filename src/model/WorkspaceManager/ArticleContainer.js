import Container from "./Container";

/**
 * A wrapper class specifically used for wrapping the article 
 * JSON of a workspace. This class extends `Container` and 
 * overrides its `resolveId`- and `setId`-methods to make 
 * them compatible with articles.
 */
export default class ArticleContainer extends Container {
  resolveId(item) {
    return item.id;
  }

  setId(item, id) {
    item.id = id;
    return item;
  }
}
