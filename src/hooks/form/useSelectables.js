import { useState } from "react";


/**
 * Custom hook that provides selection functionalities to React-
 * components. The hook uses a JSON as a map to keep track of all 
 * the selected items. The array of available items is provided via 
 * props, where the items may be simple values, such as strings, or 
 * JSONs, such as articles. The selected items are entered into the 
 * map JSON according to ther identifier which is the item itself, 
 * in case of a simple value, or a specific field of the item if the 
 * item is a JSON.
 * 
 * When using JSON items the identifier-field must be provided via 
 * the *idField*-prop.
 * 
 * This hook provides functionalities to:
 * - select a specific item
 * - select all available items (as provided by props)
 * - de-select all selected items
 * - return the identifiers of all selected items
 * 
 * @param {JSON} props React-style props-JSON that has the following
 * form:
 * `
 * {
 *  items,
 *  idField?
 * }
 * `
 * 
 * WHERE:
 * *items* is an array containing the selectable items. The items can 
 * be simple values or JSONs.
 * 
 * *idField* is an optional field that will be used to determine the 
 * identifier field of the items. **Only to be used in conjunction with 
 * JSON items**.
 * 
 * @returns Hook exports.
 */
export default function useSelectables(props) {
  /**
   * Array of items available for selection.
   */
  const items = props.items;

  /**
   * Key of the field identifying the items when using JSON items.
   */
  const idField = props.idField;

  /**
   * Holds the identifiers of the currently selected items.
   */
  const [selection, setSelection] = useState({});


  /**
   * 
   * @param {*} id Identifier of the item that is to be (de)
   * selected.
   * @param {Boolean} isSelected Whether the item should be selected 
   * (true) or de-selected (false).
   */
  const handleSelect = (id, isSelected) => {
    setSelection({
      ...selection,
      [id]: isSelected
    });
  };

  /**
   * Selects all available items by including them in the 
   * *selection*.
   */
  const handleSelectAll = () => {
    const newSelection = {};

      // Selects items when they are the same as their identifiers
      // (e.g. strings)
    const defaultSelector = (target, item) => target[item] = true;

      // Selects items using a given identifier field (idField)
    const idFieldSelector = (target, item) => target[item[idField]] = true;

    let selector = defaultSelector;

    if( idField )
    selector = idFieldSelector;

      // Form a new selection using the appropriate selector
    for( let item of items )
    selector(newSelection, item);

    setSelection(newSelection);
  };

  /**
   * De-selects all selected items by clearing the *selection*.
   */
  const handleDeselectAll = () => setSelection({});

  /**
   * Returns an array of the identifiers of currently selected 
   * items.
   * @returns Array of identifiers.
   */
  const getSelectionIds = () => Object.keys(selection);
  

  return {
    selection,
    setSelection,
    getSelectionIds,
    handleSelect,
    handleSelectAll,
    handleDeselectAll
  };
}
