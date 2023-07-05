import FormControlDelete from "../../../components/FormControlButtons/json/FormControlDelete";

/**
 * Applier-function that applies a "delete" button to the 
 * `controls`-prop of a `FormModal`.
 * 
 * @param {JSON} formPopup Props of the `FormModal` the "delete"
 * button is to be applied to.
 */
export default function applyDeleteButton(formPopup) {
  formPopup.controls.buttons.delete = FormControlDelete("actionDelete");
  formPopup.controls.order.splice(0, 0, "delete");
}
