import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LanguageManager from "./locales/LanguageManager";
import Languages from './locales/Languages';

import "../node_modules/bootstrap/dist/css/bootstrap.css";


const languageManager = new LanguageManager(Languages.FI);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App languageManager={languageManager} />);
