import Form from "react-bootstrap/Form";

import { useState } from "react";

import WordInventoryDropdown, { ID_PREFIXES } from "./WordInventoryDropdown";

import useKeyListener from "../../hooks/keyboard/useKeyListener";
import callbackElementById from "../../utils/callbackElementById";

const checkInitials = (item, word) => {
  if( word.length > item.length )
  return false;

  item = item.toLowerCase();
  word = word.toLowerCase();

  const itemInitials = item.substring(0, word.length);
  return (itemInitials === word);
};

const removeSpacesConditional = (string, condition) => {
  if( !string )
  return "";

  if( !condition )
  return string;

  return string.replaceAll(" ", "");
};

export const DEFAULT_SETTINGS = {
  inventory: [],
  multiInput: false,
  onChange: (changes) => {},
  onBlur: () => {},
  filterCriteria: checkInitials,
  openDropdown: true
};


export default function DropdownSearch(props) {
  const idPrefix = "dropdown-search-";
  const idItem = ID_PREFIXES.idItem;
  const idControl = idPrefix + "control-";

  const inventory = props.inventory || DEFAULT_SETTINGS.inventory;
  const isMultiInput = props.multiInput || DEFAULT_SETTINGS.multiInput;
  const value = removeSpacesConditional(props.value, !isMultiInput);
  const onChange = props.onChange || DEFAULT_SETTINGS.onChange;
  const onBlur = props.onBlur || DEFAULT_SETTINGS.onBlur;
  const filterCriteria = props.filterCriteria || DEFAULT_SETTINGS.filterCriteria;

  const [isDropdownOpen, openDropdown] = useState(DEFAULT_SETTINGS.openDropdown);

  const switchFocusToDropdown = () => {
    callbackElementById(idItem + "0", (e) => {
      if( !document.activeElement.id.includes(idItem) )
      e.focus();
    });
    openDropdown(true);
  };

  const erasePreviousWordIfComplete = () => {
    if( isMultiInput && value[value.length - 1] === " " )
    {
      const previousWordStart = value.lastIndexOf(" ", value.length - 2) + 2;
      onChange(value.substring(0, previousWordStart));
    }
  };

  const handleBlur = () => {
    if( !isDropdownOpen )
    onBlur();
  };

  useKeyListener({
    listeners: {
      ArrowDown: switchFocusToDropdown,
      Enter: handleBlur,
      Backspace: erasePreviousWordIfComplete
    }
  });

  const handleItemSelection = (match) => {
    callbackElementById(idControl, (e) => e.focus());

    const newValue = value.substring(0, value.lastIndexOf(" ") + 1) + match;
    handleChange(newValue);
    openDropdown(false);
  };

  const handleInputChange = (e) => {
    handleChange(e.target.value);
    openDropdown(true);
  };

  const handleChange = (changes) => {
    onChange(removeSpacesConditional(changes, !isMultiInput));
  };

  const renderInventoryDropdown = (inv) => {
    const wordSplit = value.split(" ");
    const lastWord = wordSplit[wordSplit.length - 1];
    
      // No word inventory, no input or a word has already completed
    if( 
      inventory.length === 0 ||
      value === "" ||
      value[value.length - 1] === " "
    )
    return <></>;
    
      // Determine potential matches
    const matches = inv.filter((item) => filterCriteria(item, lastWord));

      // No matches
    if( matches.length === 0 )
    return <></>;

    return (
      <WordInventoryDropdown
        inventory={matches}
        show={isDropdownOpen}
        onSelect={handleItemSelection}
      />
    );
  };

  return (
    <>
      <Form.Control
        id={idControl}
        value={value}
        onChange={handleInputChange}
        onBlur={handleBlur}
      />
      {renderInventoryDropdown(inventory)}
    </>
  );
}
