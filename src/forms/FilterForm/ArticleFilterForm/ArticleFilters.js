import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useContext } from "react";

import TagInput from "../../../components/TagInput/TagInput";

import { articleFields } from "../../../model/components/Article";
import { GlobalContext } from "../../../context/GlobalContext";
import { mapElements } from "../../../utils/mapElements";
import { kebabCaseToCamelCase } from "../../../utils/stringUtils";

/**
 * Converts the name of an article field to a `LanguageManager`-
 * translation key.
 * 
 * @param {String} articleField Name of the article field that is 
 * to be converted.
 * 
 * @returns A translation key.
 */
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

/**
 * A simple component that renders the input fields for an article 
 * filter form. The input fields are rendered as Bootstrap `Form.Group`-
 * components that typically couple a `Form.Label`-component with a 
 * `Form.Control`-component. A special case is made for the tag input 
 * field, which consists of a `Form.Label` coupled with the `TagInput`-
 * component (see `TagInput` for more information).
 * 
 * The component takes a `data`-prop which includes all the data that 
 * the input fields will manipulate. The `setters`-prop contains the 
 * setter-hooks that will be used to update the data in the parent 
 * component. The fields of the `data`-prop should be the same as the
 * article fields as the filters can be applied for each field of an 
 * article. For each field found in `data`, there should be a setter-
 * hook in the `setters`-prop. The setters should have the following 
 * form `setDataFieldName` where "DataFieldName" is the name of the 
 * data field that the setter modifies.
 * 
 * Filter input fields can be disabeld using the `disabledFields`-
 * prop.
 */
export default function ArticleFilters(props) {
  /**
   * Current values of the input fields.
   */
  const data = props.data;

  /**
   * Hooks that update the parent component when a value of an input 
   * field changes.
   */
  const setters = props.setters;

  /**
   * Array of the names of the fields whose filters should be disabled,
   * and thus, not rendered in the form.
   */
  const disabledFilters = props.disabledFilters;

  const { workspaceManager: wm, languageManager: lm } = useContext(GlobalContext);

  /**
   * Creates the `TagInput`-component that can be used to enter tags into 
   * the filter. The component will be provided with the current tags of 
   * the filter as well as the appropriate hook for updating the filters.
   * The `validityChecker`-function is left empty as entering invalid tags 
   * will have no imapct on the filteration process.
   * 
   * @returns `TagInput`-component with settings specific to this component.
   */
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
