import { articleFields } from "../../../model/components/Article";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import { mapElements } from "../../../utils/mapElements";
import { capitalizeFirstLetter } from "../../../utils/stringUtils";


export const articleFieldToLocaleField = (articleField) => {
  const prefix = "forms.article-filter-form.";

  switch( articleField )
  {
    case "id":            return prefix + "id";
    case "title":         return prefix + "title";
    case "publish-date":  return prefix + "publish-date";
    case "read-date":     return prefix + "read-date";
    case "source":        return prefix + "source";
    case "tags":          return prefix + "tag";
    case "notes":         return prefix + "note";
  }

  return null;
};

export default function ArticleFilters(props) {
  const data = props.data;
  const setters = props.setters;
  const disabledFilters = props.disabledFilters;
  const { languageManager: lm } = useContext(GlobalContext);

  return mapElements(
    articleFields,
    (key, filter) => {
      return (
        <Form.Group
          key={key}
          as={Row}
        >
          <Form.Label 
            column
          >
            <b>{lm.translate(articleFieldToLocaleField(filter))}:</b>
          </Form.Label>
          <Col sm="10">
            <Form.Control
              value={data[filter]}
              onChange={(e) => setters["set" + capitalizeFirstLetter(filter)](e.target.value)}
            />
          </Col>
        </Form.Group>
      );
    },
    "article-filters-",
    disabledFilters
  );
}
