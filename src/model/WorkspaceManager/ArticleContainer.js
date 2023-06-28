import Container from "./Container";


export default class ArticleContainer extends Container {
  resolveId(item) {
    return item.id;
  }

  setId(item, id) {
    item.id = id;
    return item;
  }
}
