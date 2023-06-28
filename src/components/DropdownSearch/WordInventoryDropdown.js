import Dropdown from "react-bootstrap/Dropdown";

const idPrefix = "word-inventory-dropdown-";
const idItem = idPrefix + "item-";

export const ID_PREFIXES = {
  idPrefix,
  idItem
};


export default function WordInventoryDropdown(props) {
  const inventory = props.inventory || [];
  const onSelect = props.onSelect || function() {};
  const show = props.show || false;

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
