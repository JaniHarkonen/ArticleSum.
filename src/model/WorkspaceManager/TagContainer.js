import Container from "./Container";


export default class TagContainer extends Container {
  resolveId(item) {
    return item.tagId;
  }

  setId(item, id) {
    item.tagId = id;
    return item;
  }
}
