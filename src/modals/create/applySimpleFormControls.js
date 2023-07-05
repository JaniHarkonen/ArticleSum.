import FormControlSubmit from "../../components/FormControlButtons/json/FormControlSubmit";
import FormControlCancel from "../../components/FormControlButtons/json/FormControlCancel";
import createOrderedJson from "../../utils/createOrderedJson";
import applyOrder from "../../components/FormControlButtons/json/applyOrder";

/**
 * Applier-function that applies the "simple form controls" to 
 * given props of a `FormModal`. The simple form controls 
 * consist of the following functionalities:
 * - `submit` which will be used to submit information to the 
 * workspace
 * - `cancel` which will be used to cancel the changes and 
 * close the form modal popup window
 * 
 * Because the `FormControlButtons`-component only accepts 
 * ordered JSONs, the controls will be ordered from left to 
 * right. 
 * 
 * @param {JSON} formPopup The props of the `FormModal` that the 
 * controls will be applied to.
 */
export default function applySimpleFormControls(formPopup) {
  formPopup.controls = createOrderedJson({
    submit: applyOrder(FormControlSubmit("save", "actionSubmitChanges"), 1),
    cancel: applyOrder(FormControlCancel("actionCancel"), 0),
  }, {
    destDataField: "buttons"
  });
}
