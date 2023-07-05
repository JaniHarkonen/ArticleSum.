import { createContext } from "react";

/**
 * Global context for the application containing the following
 * values:
 * - reference to the `LanguageManager`-instance that can be 
 * used to fetch translations
 * - reference to the `WorkspaceManager`-instance that maintains 
 * the model of the workspace and handles reads/writes
 * - theme (currently unused)
 * - `popupModal`-function that can be used to display the 
 * modal window found in `App`
 * - `closeModal`-function that can be used to close the modal 
 * window found in `App`
 * - `setActiveWorkspacePath`-function that can be used to update 
 * the application when the workspace is changed
 */
export const GlobalContext = createContext({
  languageManager: null,
  workspaceManager: null,
  theme: { activeTheme: null, setTheme: (theme) => {} },
  popupModal: () => {},
  closeModal: () => {},
  setActiveWorkspacePath: () => {}
});
