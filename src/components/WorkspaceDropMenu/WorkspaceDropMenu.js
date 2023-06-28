import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

import { useContext } from "react";

import { FilesysDialogSettings, showOpenFile, showSaveFile } from "../../utils/dialog";
import { GlobalContext } from "../../context/GlobalContext";

const pathModule = window.require("path");


export default function WorkspaceDropMenu() {
  const tDialog = "filesys-dialog.workspace.";
  const tWorkspaceChanger = "workspace-changer.";
  const { languageManager: lm, workspaceManager: wm, setActiveWorkspacePath } = useContext(GlobalContext);

  const createWorkspace = () => {

      // Select a workspace file and create the workspace if valid
    showSaveFile({
      ...FilesysDialogSettings(),
      title: lm.translate(tDialog + "create.title"),
      buttonLabel: lm.translate(tDialog + "create.button"),
      filters: [{ name: tDialog + "filter", extensions: ["asum"] }]
    }, (path) => {
      if( !path || path === "" )
      return;

      wm.closeWorkspace();
      wm.createWorkspace(path, pathModule.parse(path).name);
      setActiveWorkspacePath(wm.getWorkspacePath());
    });
  };

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
