import Navbar from "react-bootstrap/Navbar";
import { useContext } from "react";

import LanguageSelection from "../LanguageSelection/LanguageSelection";
import WorkspaceDropMenu from "../WorkspaceDropMenu/WorkspaceDropMenu";

import { GlobalContext } from "../../context/GlobalContext";


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
