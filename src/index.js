import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import LanguageManager from "./locales/LanguageManager";
import Languages from './locales/Languages';
import WorkspaceManager from './model/WorkspaceManager/WorkspaceManager';

import './index.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css";


const languageManager = new LanguageManager(Languages.ENG);
const workspaceManager = new WorkspaceManager();
workspaceManager.openWorkspace(process.cwd() + "\\testing\\ws.asum");

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App
    workspaceManager={workspaceManager}
    languageManager={languageManager}
  />
);
