import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

import createEnum from "../../utils/createEnum";

export const FILTER_TYPES = createEnum(["INCLUDE_MATCHING", "FILTER_MATCHING"]);


export default function WordFilterForm(props) {
  const onSubmit = props.onSubmit;
  const [filterType, setFilterType] = useState(FILTER_TYPES.FILTER_MATCHING);
  const [wordString, setWordString] = useState("");

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
        label="Only include matching"
        checked={(filterType === FILTER_TYPES.INCLUDE_MATCHING)}
        onChange={() => setFilterType(FILTER_TYPES.INCLUDE_MATCHING)}
      />
      <Form.Check
        type="radio"
        label="Filter matching"
        checked={(filterType === FILTER_TYPES.FILTER_MATCHING)}
        onChange={() => setFilterType(FILTER_TYPES.FILTER_MATCHING)}
      />
      <Button
        variant="primary"
        onClick={handleSubmit}
      >
        {"Filter"}
      </Button>
    </Form>
  );
}
