import './App.css';
import Header from './components/Header/Header';
import Workspace from './components/Workspace/Workspace';
import { GlobalContext } from './context/GlobalContext';
import { useState } from 'react';
import ArticleForm from './forms/ArticleForm/ArticleForm';
import FormModal from './modal/FormModal/FormModal';


function App({ languageManager }) {
  const [activeLanguage, setLanguage] = useState(languageManager.getActiveLanguage());
  const [activeTheme, setTheme] = useState(null);

  languageManager.updateLanguageSetter(setLanguage);

  return (
    <GlobalContext.Provider
      value={{
        languageManager: languageManager,
        theme:  { activeTheme: activeTheme, setTheme: setTheme }
      }}
    >
      <div className="App">
        <Header />
        <FormModal>
          <ArticleForm />
      </FormModal>
        <Workspace />
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
