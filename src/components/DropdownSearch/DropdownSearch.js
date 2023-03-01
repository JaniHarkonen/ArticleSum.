import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import useKeyListener from "../../hooks/keyboard/useKeyListener";
import { useState } from "react";
import callbackElementById from "../../utils/callbackElementById";
import WordInventoryDropdown, { ID_PREFIXES } from "./WordInventoryDropdown";


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

export default function DropdownSearch(props) {
  const idPrefix = "dropdown-search-";
  const idItem = ID_PREFIXES.idItem;
  const idControl = idPrefix + "control-";

  const inventory = props.inventory || [];
  const isMultiInput = props.multiInput || false;
  const value = removeSpacesConditional(props.value, !isMultiInput);
  const onChange = props.onChange || function() {};
  const onBlur = props.onBlur || function() {};
  const filterCriteria = props.filterCriteria || checkInitials;
  const [isDropdownOpen, openDropdown] = useState(true);


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
  }

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

      // No
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
