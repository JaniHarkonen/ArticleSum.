import FormControlSubmit from "../../components/FormControlButtons/json/FormControlSubmit";
import FormControlCancel from "../../components/FormControlButtons/json/FormControlCancel";
import createOrderedJson from "../../utils/createOrderedJson";
import applyOrder from "../../components/FormControlButtons/json/applyOrder";


export default function applySimpleFormControls(formPopup) {
  formPopup.controls = createOrderedJson({
    submit: applyOrder(FormControlSubmit("save", "actionSubmitChanges"), 1),
    cancel: applyOrder(FormControlCancel("actionCancel"), 0),
  }, {
    destDataField: "buttons"
  });
}
