import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export default function SelectableElement(props) {
  const children = props.children;
  const onChange = props.onChange || function(value) {};

  return (
    <Form.Group
      as={Row}
    >
      <Col>
        <Form.Check
          type="checkbox"
          onChange={(e) => onChange(e.target.value)}
        />
      </Col>
      <Col>
        {children}
      </Col>
    </Form.Group>
  );
}
