import { FormControlButton } from "../../../components/FormControlButtons/FormControlButtons";

export default function applyTagAdd(articlePopup) {
  const newPopup = {
    ...articlePopup,
    titleKey: "modals.form-modal.tag.title.add"
  };

  newPopup.controls.buttons.submit = FormControlButton({ titleKey: "modals.form-modal.controls.create", onClick: "" });
  return newPopup;
}
