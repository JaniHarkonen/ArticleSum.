import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useContext } from "react";

import TagInput from "../../../components/TagInput/TagInput";

import { articleFields } from "../../../model/components/Article";
import { GlobalContext } from "../../../context/GlobalContext";
import { mapElements } from "../../../utils/mapElements";
import { kebabCaseToCamelCase } from "../../../utils/stringUtils";


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
  const { workspaceManager: wm, languageManager: lm } = useContext(GlobalContext);

  const renderTagsInput = () => {
    return (
      <TagInput
        value={data["tags"]}
        onChange={setters["setTags"]}
        availableTags={wm.getTagContainer().filterItems()}
        validityChecker={() => true}
      />
    );
  };

  return mapElements(
    articleFields,
    (key, filter) => {  
      let controlElement = (
        <Form.Control
          value={data[filter] || ""}
          onChange={(e) => setters[kebabCaseToCamelCase("set-" + filter)](e.target.value)}
        />
      );

      if( filter === "tags" )
      controlElement = renderTagsInput();

      return (
        <Form.Group
          className="mt-1"
          key={key}
          as={Row}
        >
          <Form.Label column>
            <b>{lm.translate(articleFieldToLocaleField(filter))}:</b>
          </Form.Label>
          <Col
            className={(filter === "tags") ? "" : "d-flex align-items-center"}
            sm="10"
          >
            {controlElement}
          </Col>
        </Form.Group>
      );
    },
    "article-filters-",
    disabledFilters
  );
}
