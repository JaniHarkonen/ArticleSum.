import Form from "react-bootstrap/Form";

import { useState } from "react";

import WordInventoryDropdown, { ID_PREFIXES } from "./WordInventoryDropdown";

import useKeyListener from "../../hooks/keyboard/useKeyListener";
import callbackElementById from "../../utils/callbackElementById";

/**
 * Checks whether the characters of an item match with the first 
 * characters of a word. This function is used to filter suggestions
 * during input.
 * 
 * @param {String} item The item to match against the words first 
 * characters.
 * @param {String} word Word whose first characters should match up 
 * with those of the item.
 * 
 * @returns Whether the item matches the initials of the word.
 */
const checkInitials = (item, word) => {
  if( word.length > item.length )
  return false;

  item = item.toLowerCase();
  word = word.toLowerCase();

  const itemInitials = item.substring(0, word.length);
  return (itemInitials === word);
};

/**
 * Returns a space-free copy of a string if a given 
 * condition is met, or the same string if it is not.
 * 
 * @param {String} string String whose spaces should be 
 * removed if a the condition is met.
 * @param {Function} condition Function that, when evaluated, 
 * returns `true` or `false` whether a condition within was 
 * satisfied.
 * 
 * @returns The string without spaces if the condition was met.
 * The string will simply be returned if the condition was not met.
 */
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

/**
 * A versatile drop down search component that takes an inventory
 * of words that are suggested to the user as they type their input.
 * This component consists of a Bootstrap Form.Control-component and a
 * WordInventoryDropdown-component.
 * 
 * The keywords are separated by spaces, so each entered word must 
 * correspond to a single word. As a word is being entered, it is 
 * compared against the inventory of suggested words using the 
 * `filterCriteria`-function provided in `props`. By default, the case-
 * agnostic initials are used to find suggestions.
 * 
 * By default, only a single word may be input to the Form.Control, as 
 * spaces are not allowed. However, `multiInput`-prop can be used to 
 * enable the entering of multiple words at once. This is known to be 
 * glitchy and should be avoided.
 */
export default function DropdownSearch(props) {
  /**
   * The prefix of the IDs of the elements that are children of this 
   * component.
   */
  const idPrefix = "dropdown-search-";

  /**
   * Prefix of the IDs of the Dropdown.Items of `WordInventoryDropdown`.
   */
  const idItem = ID_PREFIXES.idItem;

  /**
   * ID of the search input field.
   */
  const idControl = idPrefix + "control-";

  /**
   * Inventory of words that can be searched.
   */
  const inventory = props.inventory || DEFAULT_SETTINGS.inventory;

  /**
   * Whether multiple words can be input to the search field.
   */
  const isMultiInput = props.multiInput || DEFAULT_SETTINGS.multiInput;

  /**
   * Current value of the search field.
   */
  const value = removeSpacesConditional(props.value, !isMultiInput);

  /**
   * Hook that updates the parent component when the input changes.
   */
  const onChange = props.onChange || DEFAULT_SETTINGS.onChange;

  /**
   * Called when the search field loses focus.
   */
  const onBlur = props.onBlur || DEFAULT_SETTINGS.onBlur;

  /**
   * Criteria that is used to search for suggestions from the 
   * inventory of words.
   */
  const filterCriteria = props.filterCriteria || DEFAULT_SETTINGS.filterCriteria;

  const [isDropdownOpen, openDropdown] = useState(DEFAULT_SETTINGS.openDropdown);

  /**
   * Shifts the focus from the search field to the drop menu to 
   * allow navigation via arrow keys.
   */
  const switchFocusToDropdown = () => {
    callbackElementById(idItem + "0", (e) => {
      if( !document.activeElement.id.includes(idItem) )
      e.focus();
    });
    openDropdown(true);
  };

  /**
   * Removes the previous word from the input if multi-input is 
   * enabled.
   */
  const erasePreviousWordIfComplete = () => {
    if( isMultiInput && value[value.length - 1] === " " )
    {
      const previousWordStart = value.lastIndexOf(" ", value.length - 2) + 2;
      onChange(value.substring(0, previousWordStart));
    }
  };

  /**
   * Carries out the blur-event, which will only be triggered if 
   * the drop menu is not open.
   */
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

  /**
   * Called when an item is selected from the drop menu. Adds 
   * the item to the search field and shifts focus back to it.
   * 
   * @param {String} match Word that is to be added to the 
   * search field.
   */
  const handleItemSelection = (match) => {
    callbackElementById(idControl, (e) => e.focus());

    const newValue = value.substring(0, value.lastIndexOf(" ") + 1) + match;
    handleChange(newValue);
    openDropdown(false);
  };

  /**
   * Handles the changing of the input of the search field by notifying
   * the parent component and opening the drop menu.
   * 
   * @param {JSON} e Event-object of the onChange-event.
   */
  const handleInputChange = (e) => {
    handleChange(e.target.value);
    openDropdown(true);
  };

  /**
   * Updates the parent component with a changed search field value.
   * 
   * @param {String} changes Updated search field value.
   */
  const handleChange = (changes) => {
    onChange(removeSpacesConditional(changes, !isMultiInput));
  };

  /**
   * Forms an updated suggestion word inventory based on the current 
   * input and renders the drop menu.
   * 
   * @param {Array} inv Inventory of available word suggestions.
   * 
   * @returns JSX-element of the drop menu.
   */
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
