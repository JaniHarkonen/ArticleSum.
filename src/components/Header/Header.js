import Navbar from "react-bootstrap/Navbar";
import { useContext } from "react";

import LanguageSelection from "../LanguageSelection/LanguageSelection";
import WorkspaceDropMenu from "../WorkspaceDropMenu/WorkspaceDropMenu";

import { GlobalContext } from "../../context/GlobalContext";

/**
 * A major component that is placed on top of the page. Represents the 
 * header of the application. This component contains the logo and the 
 * name of the application as well as the name of the currently open 
 * workspace. The header also includes a drop menu for creating and 
 * opening workspaces along with a language selection drop menu.
 */
export default function Header() {
  const { languageManager: lm, workspaceManager: wm } = useContext(GlobalContext);

  return (
    <Navbar
      bg="dark"
      variant="dark"
    >
      <Navbar.Brand className="ms-2">
        {lm.translate("app-name")} – {wm.getWorkspaceName()}
      </Navbar.Brand>
      <Navbar.Collapse className="me-2">
        <WorkspaceDropMenu />
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end me-2">
        <LanguageSelection />
      </Navbar.Collapse>
    </Navbar>
  );
}
