import './App.css';
import Header from './components/Header/Header';
import Workspace from './components/Workspace/Workspace';
import { GlobalContext } from './context/GlobalContext';
import { useState } from 'react';
import FormModal from './modal/FormModal/FormModal';


function App(props) {
  const {workspaceManager, languageManager} = props;
  const [activeLanguage, setLanguage] = useState(languageManager.getActiveLanguage());
  const [activeTheme, setTheme] = useState(null);
  const [displayedForm, popupForm] = useState(null);

    // Pass the language setter function to LanguageManager allowing
    // the LanguageManager.changeLanguage-method to update the React-
    // components under this one
  languageManager.updateLanguageSetter(setLanguage);

  const renderFormModal = () => {
    if( !displayedForm )
    return <></>;
    
    return (
      <FormModal
        title={displayedForm.title}
        footer={displayedForm.footer}
        show={displayedForm != null}
      >
        {displayedForm.form}
      </FormModal>
    );
  };

  return (
    <GlobalContext.Provider
      value={{
        languageManager: languageManager,
        workspaceManager: workspaceManager,
        theme: { activeTheme: activeTheme, setTheme: setTheme },
        popupForm: popupForm,
      }}
    >
      <div className="App">
        <Header />
        {renderFormModal(displayedForm)}
        <Workspace />
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
