import FormControlDelete from "../../../components/FormControlButtons/json/FormControlDelete";


export default function applyDeleteButton(formPopup) {
  formPopup.controls.buttons.delete = FormControlDelete("actionDelete");
  formPopup.controls.order.splice(0, 0, "delete");
}
