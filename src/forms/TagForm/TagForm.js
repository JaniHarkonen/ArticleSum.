import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";


export default function TagForm() {
  return (
    <Form>
      <h2>Create tag</h2>
      <Row>
        <Col>Tag: </Col>
        <Col>
          <Form.Control />
        </Col>
        <Col><input type="color" /></Col>
      </Row>
      <Row>
        <Button>Add</Button>
      </Row>
    </Form>
  );
}
