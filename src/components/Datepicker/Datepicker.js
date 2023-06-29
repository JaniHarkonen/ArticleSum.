import Form from "react-bootstrap/Form";

/**
 * A basic component that uses a Bootstrap Form.Control-
 * component to render a date selection input field.
 */
export default function Datepicker(props) {
  /**
   * Datetime string that represents the current date 
   * value (should have the form: YYYY-MM-DDThh:mmZ, 
   * although everything after "T" will be ignored).
   */
  const value = props.value;

  /**
   * Hook that updates the parent component as the date 
   * is changed.
   */
  const onChange = props.onChange;

  /**
   * Additional props that will be passed onto the Bootstrap
   * Form.Control-component.
   */
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
