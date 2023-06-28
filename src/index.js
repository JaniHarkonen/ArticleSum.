import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import LanguageManager from "./locales/LanguageManager";
import Languages from './locales/Languages';
import WorkspaceManager from './model/WorkspaceManager/WorkspaceManager';

import { getConfig } from './utils/config';

import './index.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css";


const config = getConfig();
const languageManager = new LanguageManager((config.language === "") ? Languages.ENG : (Languages[config.language] || Languages.ENG));
const workspaceManager = new WorkspaceManager();
workspaceManager.openWorkspace(config.lastWorkspace);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App
    workspaceManager={workspaceManager}
    languageManager={languageManager}
  />
);
