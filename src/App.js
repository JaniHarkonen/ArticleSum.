import './App.css';
import Header from './components/Header/Header';
import Workspace from './components/Workspace/Workspace';
import { GlobalContext } from './context/GlobalContext';
import { useState } from 'react';
import Modal from "react-bootstrap/Modal";


function App(props) {
  const {workspaceManager, languageManager} = props;
  const [activeLanguage, setLanguage] = useState(languageManager.getActiveLanguage());
  const [activeTheme, setTheme] = useState(null);
  const [displayedModal, popupModal] = useState(null);

    // Pass the language setter function to LanguageManager allowing
    // the LanguageManager.changeLanguage-method to update the React-
    // components under this one
  languageManager.updateLanguageSetter(setLanguage);

  const isModalOpen = () => {
    return (displayedModal != null);
  };

  return (
    <GlobalContext.Provider
      value={{
        languageManager: languageManager,
        workspaceManager: workspaceManager,
        theme: { activeTheme: activeTheme, setTheme: setTheme },
        popupModal: popupModal,
      }}
    >
      <div className="App">
        <Header />
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={isModalOpen()}
          onHide={() => popupModal(null)}
        >
          {displayedModal}
        </Modal>
        <Workspace />
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
