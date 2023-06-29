import Button from "react-bootstrap/Button";

import { useContext } from "react";

import { GlobalContext } from "../../context/GlobalContext";

/**
 * A generic component that renders given control buttons using Bootstrap's
 * `Button`-components. Each button is assigned an onClick-action. Additional 
 * props can also be assigned for each `Button`.
 * 
 * The control buttons are represented by ordered JSONs. This means that the 
 * the JSON not only contains the controls themselves but also the order in 
 * which the controls are to be rendered (see `createOrderedJson`-utility for 
 * more information). 
 */
export default function FormControlButtons(props) {
  /**
   * Ordered JSON containing the controls that are to be rendered in the 
   * order that the are to be rendered in. Each control should have a title,
   * which is displayed on the button, and an onClick-action which is the 
   * key of the action found in `actions`-JSON that will be run upon click.
   */
  const controls = props.controls || { order: [] };

  /**
   * A JSON of actions that can be executed by the control buttons upon click.
   */
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
