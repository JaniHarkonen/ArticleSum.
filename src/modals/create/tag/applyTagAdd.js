import applyTitle from "../../../components/FormControlButtons/json/applyTitle";


export default function applyTagAdd(tagPopup) {
  tagPopup = applyTitle(tagPopup, "modals.form-modal.tag.title.add");
  tagPopup.controls.buttons.submit = applyTitle(tagPopup.controls.buttons.submit, "modals.form-modal.controls.create");

  return tagPopup;
}
