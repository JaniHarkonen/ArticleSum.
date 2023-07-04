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

  /**
   * Whether the content of the form has changed (this is useful when the 
   * control buttons should react to changes in the form, for example, when
   * determining if the "save" button should be highlighted in the article
   * form).
   */
  const hasContentChanged = props.hasContentChanged;

  /**
   * Hook that resets the flag tracking whether the content of the form has 
   * changed (for example, after saving).
   */
  const resetContentChangeFlag = props.resetContentChangeFlag;

  const { languageManager: lm } = useContext(GlobalContext);

  return controls.order.map((controlKey) => {
    const control = controls.buttons[controlKey];
    let controlProps = control.props;

    if( hasContentChanged && control.reactToContentChange )
    controlProps = control.reactToContentChange(controlProps);

    return (
      <Button
        key={"form-control-buttons-button-" + controlKey}
        onClick={() => actions[control.onClick]({ resetContentChangeFlag })}
        {...controlProps}
      >
        {lm.translate(control.titleKey)}
      </Button>
    );
  });
}
