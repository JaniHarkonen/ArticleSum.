import ArticleContainer from "./ArticleContainer";
import TagContainer from "./TagContainer";

const fs = window.require("fs");


export default class WorkspaceManager {
  constructor() {
    this.articles = null;
    this.tags = null;

    this.workspacePath = "";
  }

  loadWorkspace(path) {
    return JSON.parse(fs.readFileSync(path));
  }

  saveWorkspace() {
    const ws = {
      articles: this.articles.getItemArrayReference(),
      tags: this.tags.getItemArrayReference()
    };

    fs.writeFileSync(this.workspacePath, JSON.stringify(ws, null, 2));
  }

  openWorkspace(path) {
    if( !path )
    return;

    const ws = this.loadWorkspace(path);
    this.workspacePath = path;

    const notify = (changes) => this.workspaceModified(changes);
    this.articles = new ArticleContainer(ws.articles, notify);
    this.tags = new TagContainer(ws.tags, notify);
  }

  closeWorkspace() {
    this.articles = null;
    this.tags = null;

    this.workspacePath = "";
  }

  workspaceModified(changes) {
    if( changes.affectedItems.length === 0 )
    return;
    
    this.saveWorkspace();
    console.log(this.articles.getItemArrayReference());
  }

  getArticleContainer() {
    return this.articles;
  }

  getTagContainer() {
    return this.tags;
  }

  getWorkspacePath() {
    return this.workspacePath;
  }
}
