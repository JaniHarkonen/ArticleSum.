import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { useContext, useState } from "react";

import { GlobalContext } from "../../context/GlobalContext";

export const DATE_INTERVAL_TYPES = {
  day: "day",
  month: "month",
  year: "year"
};


export default function IntervalPicker(props) {
  const onChange = props.onChange;
  const value = props.value;
  
  const { languageManager: lm } = useContext(GlobalContext);

  const CONTROLS = [
    DATE_INTERVAL_TYPES.day,
    DATE_INTERVAL_TYPES.month,
    DATE_INTERVAL_TYPES.year
  ];


  return CONTROLS.map((type) => {
    return (
      <Button
        className="me-1 mt-1"
        variant={(value === type) ? "primary" : "secondary"}
        onClick={() => onChange(type)}
      >
        {lm.translate("date." + type)}
      </Button>
    );
  });
}
