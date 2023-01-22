import Navbar from "react-bootstrap/Navbar";
import LanguageSelection from "../LanguageSelection/LanguageSelection";


export default function Header() {


  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>ArticleSum.</Navbar.Brand>
      <LanguageSelection />
    </Navbar>
  );
}
