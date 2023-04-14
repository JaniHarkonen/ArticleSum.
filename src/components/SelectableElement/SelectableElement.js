import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export const DEFAULT_SETTINGS = {
  checked: false,
  onChange: (value) => {}
};


export default function SelectableElement(props) {
  const children = props.children;
  const checked = props.checked || DEFAULT_SETTINGS.checked;
  const onChange = props.onChange || DEFAULT_SETTINGS.onChange;

  return (
    <Form.Group
      as={Row}
    >
      <Col>
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
