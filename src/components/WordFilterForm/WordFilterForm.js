import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";

import createEnum from "../../utils/createEnum";
import { GlobalContext } from "../../context/GlobalContext";
import createButtons from "../../utils/createButtons";

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


export default function WordFilterForm(props) {
  const onSubmit = props.onSubmit;
  const defaultFilter = props.defaultFilter || DEFAULT_SETTINGS.defaultFilter;
  
  const [filterType, setFilterType] = useState(defaultFilter.filterType || DEFAULT_SETTINGS.defaultFilter);
  const [wordString, setWordString] = useState(defaultFilter.filteredWords || DEFAULT_SETTINGS.wordString);
  const { languageManager: lm } = useContext(GlobalContext);

  const handleSubmit = () => {
    onSubmit({
      filterType: filterType,
      filteredWords: wordString.split(" ")
    });
  };

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
