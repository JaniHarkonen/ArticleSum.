import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useState, useContext } from "react";

import Datepicker from "../../../../components/Datepicker/Datepicker";

import { GlobalContext } from "../../../../context/GlobalContext";

/**
 * Provides a form used by the `TimelineView` that lets the 
 * user to shift the timeline to a given date.
 * 
 * The panel consists of a `Datepicker`-component which can 
 * be used to input the date, and a Bootstrap `Button` which 
 * is used to move to that date.
 */
export default function GotoPanel(props) {
  /**
   * Hook that updates the parent component when the user 
   * clicks "goto".
   */
  const onGoto = props.onGoto;

  /**
   * Current date displayed by the date picker.
   */
  const value = props.value?.toISOString() || (new Date()).toISOString();

  const [date, setDate] = useState(value);
  const { languageManager: lm } = useContext(GlobalContext);

  return (
    <Form>
      <h5>{lm.translate("goto-panel.caption")}:</h5>
      
      <Datepicker
        value={date}
        onChange={setDate}
        inputProps={{
          style: { width: "auto" }
        }}
      />
      
      <Button
        className="mt-1"
        onClick={() => onGoto(new Date(date))}
      >
        {lm.translate("goto-panel.goto-button")}
      </Button>
    </Form>
  );
}
