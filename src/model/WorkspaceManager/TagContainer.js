import Container from "./Container";

/**
 * A wrapper class specifically used for wrapping the tag 
 * JSON of a workspace. This class extends `Container` and 
 * overrides its `resolveId`- and `setId`-methods to make 
 * them compatible with tags.
 */
export default class TagContainer extends Container {
  resolveId(item) {
    return item.tagId;
  }

  setId(item, id) {
    item.tagId = id;
    return item;
  }
}
