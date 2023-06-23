import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useContext } from "react";

import { hexToRGB, rgbToHex } from "../../utils/colors";
import { GlobalContext } from "../../context/GlobalContext";


export default function TagForm(props) {
  const { tagName, tagColor } = props.data;
  const { setTagName, setTagColor } = props.setters;
  const { r, g, b } = tagColor;
  const { languageManager: lm } = useContext(GlobalContext);

  return (
    <Form>
      <Row>
        <Col
          className="d-flex align-items-center"
          xs="2"
        >
          <b>{lm.translate("forms.tag-form.name")}: </b>
        </Col>
        <Col>
          <Form.Control
            value={tagName.toUpperCase()}
            onChange={(e) => setTagName(e.target.value)}
          />
        </Col>
        <Col className="d-flex align-items-center">
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
