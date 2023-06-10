import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const DATE_INTERVAL_TYPES = {
  day: {
    type: "day",
    caption: "Day"
  },
  month: {
    type: "month",
    caption: "Month"
  },
  year: {
    type: "year",
    caption: "Year"
  }
};


export default function IntervalPicker(props) {
  const onChange = props.onChange;

  const CONTROLS = [
    DATE_INTERVAL_TYPES.day,
    DATE_INTERVAL_TYPES.month,
    DATE_INTERVAL_TYPES.year
  ];

  const renderControls = () => {
    return CONTROLS.map((type) => <Button onClick={() => onChange(type)}>{type.caption}</Button>);
  };

  return (
    <Col>
      {renderControls()}
    </Col>
  );
}
