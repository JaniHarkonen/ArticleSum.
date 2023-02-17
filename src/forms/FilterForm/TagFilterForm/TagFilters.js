import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import { mapElements } from "../../../utils/mapElements";
import { tagFields } from "../../../model/components/Tag";


export const tagFieldToLocaleField = (tagField) => {
  const prefix = "forms.tag-filter-form.";

  switch( tagField )
  {
    case "tagId": return prefix + "tag-id";
    case "name":  return prefix + "name";
    case "color": return prefix + "color";
  }

  return null;
};

export default function TagFilters(props) {
  const disabledFilters = props.disabledFilters;
  const { languageManager: lm } = useContext(GlobalContext);

  return mapElements(
    tagFields,
    (key, filter) => {
      return (
        <Form.Group
          key={key}
          as={Row}
        >
          <Form.Label 
            column
          >
            <b>{lm.translate(tagFieldToLocaleField(filter))}:</b>
          </Form.Label>
          <Col sm="10">
            <Form.Control />
          </Col>
        </Form.Group>
      );
    },
    "tag-filters-",
    disabledFilters
  );
}
