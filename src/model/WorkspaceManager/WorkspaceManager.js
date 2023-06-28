import { editConfig } from "../../utils/config";
import ArticleContainer from "./ArticleContainer";
import TagContainer from "./TagContainer";

const fs = window.require("fs");

export const Workspace = (counter, name, articles, tags) => {
  return {
    "id-counter": counter,
    "workspace-name": name,
    "articles": articles || {},
    "tags": tags || {}
  };
};


export default class WorkspaceManager {
  constructor() {
    this.articles = null;
    this.tags = null;
    this.idCounter = 0;
    this.workspaceName = "";
    this.workspacePath = "";
    this.isWorkspaceOpen = false;
  }

  loadWorkspace(path) {
    return JSON.parse(fs.readFileSync(path));
  }

  saveWorkspace(path, workspace) {
    const replacer = (key, value) => value ?? undefined;
    fs.writeFileSync(path, JSON.stringify(workspace, replacer, 2));
  }

  createWorkspace(path, name) {
    if( !path || !name || name === "" )
    return;

    this.workspacePath = path;
    this.workspaceName = name;
    this.saveWorkspace(this.workspacePath, Workspace(0, this.workspaceName));
    this.openWorkspace(this.workspacePath);
    //editConfig({ lastWorkspace: this.workspacePath });
  }

  openWorkspace(path) {
    if( !path || !fs.existsSync(path) )
    return;

    this.closeWorkspace();

    const ws = this.loadWorkspace(path);
    this.workspacePath = path;

    const notify = (changes) => this.workspaceModified(changes);
    const idRetriever = this.getUniqueId.bind(this);

    this.idCounter = ws["id-counter"];
    this.workspaceName = ws["workspace-name"];
    this.articles = new ArticleContainer(ws.articles, notify);
    this.articles.setIdRetriever(idRetriever);
    this.tags = new TagContainer(ws.tags, notify);
    this.tags.setIdRetriever(idRetriever);
    this.isWorkspaceOpen = true;
  }

  closeWorkspace() {
    this.articles = null;
    this.tags = null;
    this.idCounter = 0;
    this.workspaceName = "";
    this.workspacePath = "";
    this.isWorkspaceOpen = false;
  }

  workspaceModified(changes) {
    if( changes.affectedItems.length <= 0 )
    return;
    
    const ws = Workspace(this.idCounter, this.workspaceName, this.articles.getItemArrayReference(), this.tags.getItemArrayReference());
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

  getWorkspaceName() {
    return this.workspaceName;
  }

  checkWorkspaceOpen() {
    return this.isWorkspaceOpen;
  }

  getUniqueId() {
    return "" + (this.idCounter++);
  }
}
