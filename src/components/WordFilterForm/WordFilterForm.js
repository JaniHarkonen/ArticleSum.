import Form from "react-bootstrap/Form";

import { useContext, useState } from "react";

import { GlobalContext } from "../../context/GlobalContext";
import createEnum from "../../utils/createEnum";
import createButtons from "../../utils/createButtons";

/**
 * An "enum" of filters available in the word filter form.
 */
export const FILTER_TYPES = createEnum([
  "NONE",
  "INCLUDE_MATCHING",
  "FILTER_MATCHING"
]);

export const DEFAULT_SETTINGS = {
  defaultFilter: {
    filterType: FILTER_TYPES.NONE,
    filteredWords: []
  },
  wordString: ""
};

/**
 * Provides a quick filter form mainly for the `WordCloudView` -major
 * component. The quick filter has the following functionalities:
 * - filteration of the words included in the filter
 * - filteration of all the words NOT included in the filter
 * 
 * Unlike the `FilterForm`, which uses the `filters`-utilities, this 
 * component is not capable of forming complex filters. Instead, filter 
 * terms are simply separated via spaces.
 */
export default function WordFilterForm(props) {
  /**
   * Hook that updates the parent component when the input of the 
   * quick filter field changes.
   */
  const onSubmit = props.onSubmit;

  /**
   * Current filter type.
   */
  const defaultFilter = props.defaultFilter || DEFAULT_SETTINGS.defaultFilter;
  
  const [filterType, setFilterType] = useState(defaultFilter.filterType || DEFAULT_SETTINGS.defaultFilter);
  const [wordString, setWordString] = useState(defaultFilter.filteredWords || DEFAULT_SETTINGS.wordString);
  const { languageManager: lm } = useContext(GlobalContext);

  /**
   * Updates the parent once the filter type of the component is 
   * changed by passing the filter type along with the inventory 
   * of words onto the parent component. The word inventory is 
   * constructed by splitting the input string according to 
   * spaces.
   */
  const handleSubmit = () => {
    onSubmit({
      filterType: filterType,
      filteredWords: wordString.split(" ")
    });
  };

  /**
   * Clears the filters by resetting the filter type to "none" 
   * and updates the parent component. The input will also be 
   * reset.
   */
  const handleClear = () => {
    onSubmit({
      filterType: FILTER_TYPES.NONE,
      filteredWords: []
    });

    setFilterType(FILTER_TYPES.NONE);
    setWordString("");
  };

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Form.Label>
        {lm.translate("word-filter-form.label")}:
      </Form.Label>
      <Form.Control
        value={wordString}
        onChange={(e) => setWordString(e.target.value)}
      />
      <Form.Check
        type="radio"
        label={lm.translate("word-filter-form.match-only")}
        checked={(filterType === FILTER_TYPES.INCLUDE_MATCHING)}
        onChange={() => setFilterType(FILTER_TYPES.INCLUDE_MATCHING)}
      />
      <Form.Check
        type="radio"
        label={lm.translate("word-filter-form.match-filter")}
        checked={(filterType === FILTER_TYPES.FILTER_MATCHING)}
        onChange={() => setFilterType(FILTER_TYPES.FILTER_MATCHING)}
      />
      {createButtons([
        { key: "word-filter-form-button-clear", className: "me-1 mt-1", onClick: handleClear, caption: lm.translate("word-filter-form.clear") },
        { key: "word-filter-form-button-filter", className: "mt-1", onClick: handleSubmit, caption: lm.translate("word-filter-form.filter") }
      ])}
    </Form>
  );
}
