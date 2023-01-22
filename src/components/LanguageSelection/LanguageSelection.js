import { useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { GlobalContext } from "../../context/GlobalContext";
import { getAllLocales, getTranslation } from "../../locales/locales";


export default function LanguageSelection() {
  const { locale } = useContext(GlobalContext);
  const { activeLocale, setLocale } = locale;

  const renderLanguageItems = (locales) => {
    return locales.map((lc) => {
      return (
        <Dropdown.Item
          key={lc.locale}
          onClick={() => setLocale(lc.locale)}
        >
          {lc.language}
        </Dropdown.Item>
      );
    });
  };

  return (
    <DropdownButton title={getTranslation(activeLocale, "language")}>
      {renderLanguageItems(getAllLocales())}
    </DropdownButton>
  );
}
