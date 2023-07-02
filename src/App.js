import Modal from "react-bootstrap/Modal";
import Header from './components/Header/Header';

import { useState } from 'react';

import Workspace from './components/Workspace/Workspace';

import { GlobalContext } from './context/GlobalContext';
import useModal from './hooks/modal/useModal';

import './App.css';

/**
 * Fundamental React-component that contains the entire UI of 
 * the application.
 */
function App(props) {
  const { workspaceManager, languageManager } = props;
  const [activeLanguage, setLanguage] = useState(languageManager.getActiveLanguage());
  const [activeTheme, setTheme] = useState(null);
  const [activeWorkspacePath, setActiveWorkspacePath] = useState(workspaceManager.getWorkspacePath());
  const { displayedModal, popupModal, closeModal, isModalOpen } = useModal();

    // Pass the language setter function to LanguageManager allowing
    // the LanguageManager.changeLanguage-method to update the React-
    // components under this one
  languageManager.updateLanguageSetter(setLanguage);

  return (
    <GlobalContext.Provider
      value={{
        languageManager,
        workspaceManager,
        theme: { activeTheme: activeTheme, setTheme: setTheme },
        popupModal,
        closeModal,
        setActiveWorkspacePath
      }}
    >
      <div
        id="App"
        className="App"
      >
        <Header />
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={isModalOpen()}
          onHide={() => closeModal()}
        >
          {displayedModal}
        </Modal>
        <div className="App-workspace-container">
          <Workspace />
        </div>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
