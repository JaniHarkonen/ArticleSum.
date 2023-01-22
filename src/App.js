import './App.css';
import Header from './components/Header/Header';
import Workspace from './components/Workspace/Workspace';
import { GlobalContext } from './context/GlobalContext';
import { locales } from './locales/locales';
import { useState } from 'react';
import ArticleForm from './forms/ArticleForm/ArticleForm';
import FormModal from './modal/FormModal/FormModal';


function App() {
  const [activeLocale, setLocale] = useState(locales.FI);
  const [activeTheme, setTheme] = useState(null);

  return (
    <GlobalContext.Provider
        value={{
          locale: { activeLocale: activeLocale, setLocale: setLocale },
          theme:  { activeTheme: activeTheme, setTheme: setTheme }
        }}
      >
      <div className="App">
        <Header />
        {/*<FormModal>
          <ArticleForm />
        </FormModal>
      */}
        <Workspace />
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
