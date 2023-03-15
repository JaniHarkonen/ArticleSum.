import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Datepicker from "../../../../components/Datepicker/Datepicker";


export default function GotoPanel(props) {
  const onGoto = props.onGoto;
  const value = props.value?.toISOString() || (new Date()).toISOString();
  const [date, setDate] = useState(value);


  return (
    <Form>
      <h5>{"Goto date"}:</h5>
      <Datepicker
        value={date}
        onChange={setDate}
      />
      <Button onClick={() => onGoto(new Date(date))}>{"Goto"}</Button>
    </Form>
  );
}
