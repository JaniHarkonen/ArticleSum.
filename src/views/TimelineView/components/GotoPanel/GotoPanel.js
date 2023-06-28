import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useState, useContext } from "react";

import Datepicker from "../../../../components/Datepicker/Datepicker";

import { GlobalContext } from "../../../../context/GlobalContext";


export default function GotoPanel(props) {
  const onGoto = props.onGoto;
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
