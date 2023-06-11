import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { useContext } from "react";

import { FilesysDialogSettings, showOpenFile, showSaveFile } from "../../utils/dialog";
import { GlobalContext } from "../../context/GlobalContext";


export default function WorkspaceDropMenu() {
  const { languageManager: lm, workspaceManager: wm } = useContext(GlobalContext);


  const createWorkspace = () => {

      // Select a workspace file and create the workspace if valid
    showSaveFile({
      ...FilesysDialogSettings(),
      title: "Create a new workspace",
      buttonLabel: "Create",
      filters: [{ name: "ArticleSum. workspace", extensions: ["asum"] }]
    }, (path) => {
      if( !path || path === "" )
      return;

      wm.closeWorkspace();
      wm.createWorkspace(path);
    });
  };

  const openWorkspace = () => {

      // Select a workspace file and open it if valid
    showOpenFile({
      ...FilesysDialogSettings(),
      title: "Open a workspace",
      buttonLabel: "Open",
      filters: [{ name: "ArticleSum. workspace", extensions: ["asum"] }]
    }, (path) => {
      if( !path )
      return;

      path = path[0];

      wm.closeWorkspace();
      wm.openWorkspace(path);
    });
  };

  return (
    <DropdownButton title="Workspace">
      <Dropdown.Item onClick={createWorkspace}>Create</Dropdown.Item>
      <Dropdown.Item onClick={openWorkspace}>Open</Dropdown.Item>
    </DropdownButton>
  );
}
