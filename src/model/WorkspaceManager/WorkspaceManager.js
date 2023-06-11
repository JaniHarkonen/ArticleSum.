import ArticleContainer from "./ArticleContainer";
import TagContainer from "./TagContainer";

const fs = window.require("fs");

export const Workspace = (counter, articles, tags) => {
  return {
    "id-counter": counter,
    "articles": articles || {},
    "tags": tags || {}
  };
};


export default class WorkspaceManager {
  constructor() {
    this.articles = null;
    this.tags = null;
    this.idCounter = 0;

    this.workspacePath = "";
  }

  loadWorkspace(path) {
    return JSON.parse(fs.readFileSync(path));
  }

  saveWorkspace(path, workspace) {
    const replacer = (key, value) => value ?? undefined;
    fs.writeFileSync(path, JSON.stringify(workspace, replacer, 2));
  }

  createWorkspace(path) {
    if( !path )
    return;

    this.workspacePath = path;
    this.saveWorkspace(this.workspacePath, Workspace(0));
    this.openWorkspace(this.workspacePath);
  }

  openWorkspace(path) {
    if( !path )
    return;

    const ws = this.loadWorkspace(path);
    this.workspacePath = path;

    const notify = (changes) => this.workspaceModified(changes);
    const idRetriever = this.getUniqueId.bind(this);

    this.idCounter = ws["id-counter"];
    this.articles = new ArticleContainer(ws.articles, notify);
    this.articles.setIdRetriever(idRetriever);
    this.tags = new TagContainer(ws.tags, notify);
    this.tags.setIdRetriever(idRetriever);
  }

  closeWorkspace() {
    this.articles = null;
    this.tags = null;
    this.idCounter = -1;

    this.workspacePath = "";
  }

  workspaceModified(changes) {
    if( changes.affectedItems.length <= 0 )
    return;
    
    const ws = Workspace(this.idCounter, this.articles.getItemArrayReference(), this.tags.getItemArrayReference());
    this.saveWorkspace(this.workspacePath, ws);
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

  getUniqueId() {
    return "" + (this.idCounter++);
  }
}
