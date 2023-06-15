import Navbar from "react-bootstrap/Navbar";
import { useContext } from "react";

import LanguageSelection from "../LanguageSelection/LanguageSelection";
import WorkspaceDropMenu from "../WorkspaceDropMenu/WorkspaceDropMenu";
import { GlobalContext } from "../../context/GlobalContext";


export default function Header() {
  const { languageManager: lm } = useContext(GlobalContext);

  return (
    <Navbar
      bg="dark"
      variant="dark"
    >
      <Navbar.Brand>{lm.translate("app-name")}</Navbar.Brand>
      <Navbar.Collapse className="me-2">
        <WorkspaceDropMenu />
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end me-2">
        <LanguageSelection />
      </Navbar.Collapse>
    </Navbar>
  );
}
