import { createContext } from "react";


export const GlobalContext = createContext({
  languageManager: null,
  workspaceManager: null,
  theme: { activeTheme: null, setTheme: (theme) => {} },
  popupModal: () => {},
  closeModal: () => {},
  setActiveWorkspacePath: () => {}
});
