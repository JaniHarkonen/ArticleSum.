import applyTitle from "../../../components/FormControlButtons/json/applyTitle";

/**
 * Applier-function that applies a title as well as the "add"
 * button for the props of a tag `FormModal`.
 * 
 * @param {JSON} tagPopup Props of the tag `FormModal` that the 
 * title and the "add" button are to be applied to.
 * 
 * @returns Props for the tag `FormModal`.
 */
export default function applyTagAdd(tagPopup) {
  tagPopup = applyTitle(tagPopup, "modals.form-modal.tag.title.add");
  tagPopup.controls.buttons.submit = applyTitle(tagPopup.controls.buttons.submit, "modals.form-modal.controls.create");

  return tagPopup;
}
