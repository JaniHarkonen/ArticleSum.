import { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import { GlobalContext } from "../../context/GlobalContext";
import LanguageSelection from "../LanguageSelection/LanguageSelection";


export default function Header() {
  const { languageManager: lm } = useContext(GlobalContext);

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>{lm.translate("app-name")}</Navbar.Brand>
      <LanguageSelection />
    </Navbar>
  );
}
