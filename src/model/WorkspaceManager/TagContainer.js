import Container from "./Container";

export default class TagContainer extends Container {
  resolveId(item) {
    return item.tagId;
  }
}
