import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export const DATE_INTERVAL_TYPES = {
  day: "day",
  month: "month",
  year: "year"
};


export default function IntervalPicker(props) {
  const onChange = props.onChange;
  
  const { languageManager: lm } = useContext(GlobalContext);

  const CONTROLS = [
    DATE_INTERVAL_TYPES.day,
    DATE_INTERVAL_TYPES.month,
    DATE_INTERVAL_TYPES.year
  ];


  const renderControls = () => {
    return CONTROLS.map((type) => <Button onClick={() => onChange(type)}>{lm.translate("date." + type)}</Button>);
  };


  return (
    <Col>
      {renderControls()}
    </Col>
  );
}
