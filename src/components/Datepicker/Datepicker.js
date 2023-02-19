export default function Datepicker(props) {
  const value = props.value;
  const onChange = props.onChange;
  const inputProps = props.inputProps || {};

  return (
    <input
      className="form-control"
      type="date"
      value={value.split("T")[0]}
      onChange={(e) => onChange(e.target.value)}
      {...inputProps}
    />
  );
}
