import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";

import createEnum from "../../utils/createEnum";
import { GlobalContext } from "../../context/GlobalContext";

export const FILTER_TYPES = createEnum([
  "INCLUDE_MATCHING",
  "FILTER_MATCHING"
]);


export default function WordFilterForm(props) {
  const onSubmit = props.onSubmit;
  
  const [filterType, setFilterType] = useState(FILTER_TYPES.FILTER_MATCHING);
  const [wordString, setWordString] = useState("");
  const { languageManager: lm } = useContext(GlobalContext);

  const handleSubmit = () => {
    onSubmit({
      filterType: filterType,
      filteredWords: wordString.split(" ")
    });
  };

  return (
    <Form>
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
      <Button
        variant="primary"
        onClick={handleSubmit}
      >
        {lm.translate("word-filter-form.filter")}
      </Button>
    </Form>
  );
}
