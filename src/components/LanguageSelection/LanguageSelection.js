import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import { useContext } from "react";

import LanguageManager from "../../locales/LanguageManager";

import { GlobalContext } from "../../context/GlobalContext";
import { mapElements } from "../../utils/mapElements";


export default function LanguageSelection() {
  const { languageManager: lm } = useContext(GlobalContext);

  const renderLanguageItems = (languages) => {
    return mapElements(
      languages, 
      (key, l) => {
        return (
          <Dropdown.Item
            key={key}
            onClick={() => lm.changeLanguage(l)}
          >
            {l.language}
          </Dropdown.Item>
        );
      },
      "language-selection-"
    );
  };

  return (
    <DropdownButton className="" title={lm.translate("language")}>
      {renderLanguageItems(LanguageManager.listAllLanguages())}
    </DropdownButton>
  );
}
