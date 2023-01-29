import './App.css';
import Header from './components/Header/Header';
import Workspace from './components/Workspace/Workspace';
import { GlobalContext } from './context/GlobalContext';
import { useState } from 'react';
import ArticleForm from './forms/ArticleForm/ArticleForm';
import FormModal from './modal/FormModal/FormModal';


function App(props) {
  const { workspaceManager, languageManager } = props;
  const [activeLanguage, setLanguage] = useState(languageManager.getActiveLanguage());
  const [activeTheme, setTheme] = useState(null);

    // Pass the language setter function to LanguageManager allowing
    // the LanguageManager.changeLanguage-method to update the React-
    // components under this one
  languageManager.updateLanguageSetter(setLanguage);

  return (
    <GlobalContext.Provider
      value={{
        languageManager: languageManager,
        workspaceManager: workspaceManager,
        theme: { activeTheme: activeTheme, setTheme: setTheme }
      }}
    >
      <div className="App">
        <Header />
        {/*<FormModal>
          <ArticleForm />
    </FormModal>*/}
        <Workspace />
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
