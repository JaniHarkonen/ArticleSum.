import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

import { useContext } from "react";

import { FilesysDialogSettings, showOpenFile, showSaveFile } from "../../utils/dialog";
import { GlobalContext } from "../../context/GlobalContext";

const pathModule = window.require("path");

/**
 * A simple drop menu containing the functionalities for workspaces.
 * The following functionalities are provided:
 * - creation of a new workspace
 * - opening of an existing workspace
 * 
 * The drop menu is created using Bootstrap's `Dropdown`-component
 * where the options are listed as `Dropdown.Item`-components upon 
 * expansion.
 * 
 * The `dialog`-utility module is also used to display file system
 * prompts for opening and saving files. 
 */
export default function WorkspaceDropMenu() {
  /**
   * Prefix for the translation keys used by the file system dialog 
   * components.
   */
  const tDialog = "filesys-dialog.workspace.";

  /**
   * Prefix for the translation keys used by the UI-elements of this 
   * component.
   */
  const tWorkspaceChanger = "workspace-changer.";

  const { languageManager: lm, workspaceManager: wm, setActiveWorkspacePath } = useContext(GlobalContext);

  /**
   * Opens the "save file" file system dialog window using the default 
   * ArticleSum. workspace file settings. Once a valid filename is 
   * entered, the current workspace will close and a new one will 
   * be created and opened.
   */
  const createWorkspace = () => {

      // Select a workspace file and create the workspace if valid
    showSaveFile({
      ...FilesysDialogSettings(),
      title: lm.translate(tDialog + "create.title"),
      buttonLabel: lm.translate(tDialog + "create.button"),
      filters: [{ name: lm.translate(tDialog + "filter"), extensions: ["asum"] }]
    }, (path) => {
      if( !path || path === "" )
      return;

      wm.closeWorkspace();
      wm.createWorkspace(path, pathModule.parse(path).name);
      setActiveWorkspacePath(wm.getWorkspacePath());
    });
  };

  /**
   * Opens the "open file" file system dialog window using the default 
   * ArticleSum. workspace file settings. Once a valid filename is 
   * entered, the current workspace will close and the chosen one will 
   * be opened.
   */
  const openWorkspace = () => {

      // Select a workspace file and open it if valid
    showOpenFile({
      ...FilesysDialogSettings(),
      title: lm.translate(tDialog + "open.title"),
      buttonLabel: lm.translate(tDialog + "open.button"),
      filters: [{ name: lm.translate(tDialog + "filter"), extensions: ["asum"] }]
    }, (path) => {
      if( !path )
      return;

      path = path[0];

      wm.closeWorkspace();
      wm.openWorkspace(path);
      setActiveWorkspacePath(wm.getWorkspacePath());
    });
  };

  return (
    <DropdownButton title={lm.translate(tWorkspaceChanger + "workspace")}>
      <Dropdown.Item onClick={createWorkspace}>{lm.translate(tWorkspaceChanger + "create")}</Dropdown.Item>
      <Dropdown.Item onClick={openWorkspace}>{lm.translate(tWorkspaceChanger + "open")}</Dropdown.Item>
    </DropdownButton>
  );
}
