import { FormControlButton } from "../../../components/FormControlButtons/FormControlButtons";

export default function applyArticleAdd(articlePopup) {
  const newPopup = {
    ...articlePopup,
    titleKey: "modals.form-modal.article.add.title"
  };

  newPopup.controls.buttons.submit = FormControlButton({ titleKey: "modals.form-modal.article.add.controls.create", onClick: "" });
  return newPopup;
}
