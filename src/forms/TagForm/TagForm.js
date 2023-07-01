import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { useContext } from "react";

import { GlobalContext } from "../../context/GlobalContext";
import { hexToRGB, rgbToHex } from "../../utils/colors";

/**
 * Provides the form for tag information input. The user can input 
 * the name and the color of the tag. The name input field is a 
 * Bootstrap `Form.Control`-component while the color input uses 
 * the basic `input`-tag of `type` "color". All tag names must be 
 * in uppercase and contain no spaces, tabs or newline characters; 
 * rules which are also enforced by this component.
 * 
 * Unlike the `ArticleForm`, the tag form usually provides the user 
 * with the added functionality of being able to remove the tag.
 * However, this functionality is not provided by this component, 
 * rather, it is declared by a creator function in `modals/create/
 * tag/createTagPopup` and rendered by the `FormModal`-component.
 * 
 * The information of the form is provided via the `data`-prop and can 
 * be manipulated via the hooks found in `setters`-prop.
 */
export default function TagForm(props) {
  const { tagName, tagColor } = props.data;
  const { setTagName, setTagColor } = props.setters;
  const { r, g, b } = tagColor;
  const { languageManager: lm } = useContext(GlobalContext);

  /**
   * Called when the tag name input changes. Enforces the tag naming 
   * rules and updates the parent component.
   * 
   * @param {JSON} e Event-object from the onChange-event of the 
   * name input field.
   */
  const onChange = (e) => {
    setTagName(e.target.value.toUpperCase().replace(/\s/g, ""));
  };

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Row>
        <Col
          className="d-flex align-items-center"
          xs="2"
        >
          <b>{lm.translate("forms.tag-form.name")}: </b>
        </Col>
        <Col>
          <Form.Control
            value={tagName.toUpperCase().replace(/\s/g, "")}
            onChange={onChange}
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
