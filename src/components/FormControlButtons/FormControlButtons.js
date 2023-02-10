import { useContext } from "react";
import Button from "react-bootstrap/Button";
import { GlobalContext } from "../../context/GlobalContext";


export const FormControlButton = (settings) => {
  return {
    titleKey: null,
    onClick: () => {},
    props: {},

    ...settings
  };
};

export default function FormControlButtons(props) {
  const controls = props.controls || { order: [] };
  const actions = props.actions;
  const { languageManager: lm } = useContext(GlobalContext);

  return controls.order.map((controlKey) => {
    const control = controls.buttons[controlKey];
    return (
      <Button
        onClick={actions[control.onClick]}
        {...control.props}
      >
        {lm.translate(control.titleKey)}
      </Button>
    );
  });
}
