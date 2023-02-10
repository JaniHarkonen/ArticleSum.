import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { hexToRGB, rgbToHex } from "../../utils/colors";


export default function TagForm(props) {
  const { tagName, tagColor } = props.data;
  const { setTagName, setTagColor } = props.setters;
  const { r, g, b } = tagColor;

  return (
    <Form>
      <Row>
        <Col><b>Tag: </b></Col>
        <Col>
          <Form.Control
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
          />
        </Col>
        <Col>
          <input
            type="color"
            value={"#" + rgbToHex(r, g, b)}
            onChange={(e) => setTagColor(hexToRGB(e.target.value, true))}
          />
        </Col>
      </Row>
    </Form>
  );
}
