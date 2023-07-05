import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const DEFAULT_SETTINGS = {
  checked: false,
  onChange: (value) => {}
};

/**
 * A wrapper element that transforms its child elements into a form 
 * where a check box is placed to the left side of the children.
 */
export default function SelectableElement(props) {
  /**
   * Children elements that the selection check box is to be provided 
   * to.
   */
  const children = props.children;

  /**
   * Whether the check box is checked.
   */
  const checked = props.checked || DEFAULT_SETTINGS.checked;

  /**
   * Hook that updates the parent component once the check box value 
   * changes.
   */
  const onChange = props.onChange || DEFAULT_SETTINGS.onChange;
  
  return (
    <Form.Group
      as={Row}
    >
      <Col
        className="d-flex justify-content-end align-items-center"
        xs="1" 
      >
        <Form.Check
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(!checked)}
        />
      </Col>
      <Col>
        {children}
      </Col>
    </Form.Group>
  );
}
