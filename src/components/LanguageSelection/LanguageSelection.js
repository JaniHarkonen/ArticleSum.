import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import { useContext } from "react";

import LanguageManager from "../../locales/LanguageManager";

import { GlobalContext } from "../../context/GlobalContext";
import { mapElements } from "../../utils/mapElements";

/**
 * Provides a drop menu for language selection. The drop menu 
 * has the current langauge selection as its caption, and will 
 * list all the available languages once expanded.
 * 
 * The `LanguageManager.listAllLanguages()`-method is called 
 * to return an array of available languages that are then 
 * mapped over to generate the `Dropdown.Items`.
 * 
 * When a language is selected, the `LanguageManager` will 
 * call a hook in `App` to update the application.
 */
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
