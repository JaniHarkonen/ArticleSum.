import Button from "react-bootstrap/Button";

import { useContext } from "react";

import { GlobalContext } from "../../context/GlobalContext";


export default function FormControlButtons(props) {
  const controls = props.controls || { order: [] };
  const actions = props.actions;
  const { languageManager: lm } = useContext(GlobalContext);

  return controls.order.map((controlKey) => {
    const control = controls.buttons[controlKey];

    return (
      <Button
        key={"form-control-buttons-button-" + controlKey}
        onClick={actions[control.onClick]}
        {...control.props}
      >
        {lm.translate(control.titleKey)}
      </Button>
    );
  });
}
