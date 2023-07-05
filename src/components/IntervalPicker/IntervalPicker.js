import Button from "react-bootstrap/Button";

import { useContext } from "react";

import { GlobalContext } from "../../context/GlobalContext";

/**
 * Interval types that can be selected using this interval 
 * picker.
 */
export const DATE_INTERVAL_TYPES = {
  day: "day",
  month: "month",
  year: "year"
};

/**
 * A generic component that simply renders three buttons that can be 
 * used by a parent component (such as `TimelineView`) to switch date
 * intervals. The buttons are represented by Bootstrap `Button`-
 * components where the current selection is highlighted using the 
 * `primary`-variant. The rest of the buttons will be colored using 
 * the `secondary`-variant.
 */
export default function IntervalPicker(props) {
  /**
   * Hook that updates the parent component with the proper interval 
   * selection type when a selection is made.
   */
  const onChange = props.onChange;

  /**
   * Current interval selection.
   */
  const value = props.value;
  
  const { languageManager: lm } = useContext(GlobalContext);

  /**
   * Interval types sorted into an array so that they can be 
   * easily iterated over.
   */
  const CONTROLS = [
    DATE_INTERVAL_TYPES.day,
    DATE_INTERVAL_TYPES.month,
    DATE_INTERVAL_TYPES.year
  ];

  return CONTROLS.map((type) => {
    return (
      <Button
        className="me-1 mt-1"
        key={"interval-picker-button-"+type}
        variant={(value === type) ? "primary" : "secondary"}
        onClick={() => onChange(type)}
      >
        {lm.translate("date." + type)}
      </Button>
    );
  });
}
