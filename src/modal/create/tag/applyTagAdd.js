export default function applyTagAdd(articlePopup) {
  const newPopup = {
    ...articlePopup,
    titleKey: "modals.form-modal.tag.title.add"
  };

  newPopup.controls.buttons.submit.titleKey = "modals.form-modal.controls.create";
  return newPopup;
}
