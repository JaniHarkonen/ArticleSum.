import Dropdown from "react-bootstrap/Dropdown";

const idPrefix = "word-inventory-dropdown-";
const idItem = idPrefix + "item-";

export const ID_PREFIXES = {
  idPrefix,
  idItem
};

export const DEFAULT_SETTINGS = {
  onSelect: () => {},
  show: false
};

/**
 * Renders a drop menu containing a given inventory of 
 * words. Essentially a Bootstrap Dropdown-component 
 * containing a Dropdown.Menu consisting of Dropdown.Items.
 */
export default function WordInventoryDropdown(props) {

  /**
   * Inventory of words to display inside the drop menu.
   */
  const inventory = props.inventory || [];

  /**
   * Updates the parent component with the selection when a 
   * word is selected inside the drop menu.
   */
  const onSelect = props.onSelect || DEFAULT_SETTINGS.onSelect;

  /**
   * Whether the drop menu should be displayed.
   */
  const show = props.show || DEFAULT_SETTINGS.show;

  return (
    <Dropdown
      onSelect={onSelect}
      show={show}
      autoClose="inside"
    >
      <Dropdown.Menu style={{ width: "100%" }}>
        {inventory.map((match, index) => (
          <Dropdown.Item
            id={idItem + index}
            key={idItem + match}
            eventKey={match}
          >
            {match}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
