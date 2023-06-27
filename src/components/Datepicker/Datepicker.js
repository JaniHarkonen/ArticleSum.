import Form from "react-bootstrap/Form";


export default function Datepicker(props) {
  const value = props.value;
  const onChange = props.onChange;
  const inputProps = props.inputProps || {};

  return (
    <Form.Control
      type="date"
      value={value.split("T")[0]}
      onChange={(e) => onChange(e.target.value)}
      style={{width: "auto"}}
      {...inputProps}
    />
  );
}
