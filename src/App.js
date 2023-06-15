import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useState } from 'react';

import Header from './components/Header/Header';
import Workspace from './components/Workspace/Workspace';

import { GlobalContext } from './context/GlobalContext';
import useModal from './hooks/modal/useModal';

import './App.css';


function App(props) {
  const { workspaceManager, languageManager } = props;
  const [activeLanguage, setLanguage] = useState(languageManager.getActiveLanguage());
  const [activeTheme, setTheme] = useState(null);
  const { displayedModal, popupModal, closeModal, isModalOpen } = useModal();

    // Pass the language setter function to LanguageManager allowing
    // the LanguageManager.changeLanguage-method to update the React-
    // components under this one
  languageManager.updateLanguageSetter(setLanguage);

  return (
    <GlobalContext.Provider
      value={{
        languageManager: languageManager,
        workspaceManager: workspaceManager,
        theme: { activeTheme: activeTheme, setTheme: setTheme },
        popupModal: popupModal,
        closeModal: closeModal
      }}
    >
      <div className="App">
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
