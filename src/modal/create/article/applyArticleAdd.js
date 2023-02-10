import { FormControlButton } from "../../../components/FormControlButtons/FormControlButtons";

export default function applyArticleAdd(articlePopup) {
  const newPopup = {
    ...articlePopup,
    titleKey: "modals.form-modal.article.title.add"
  };

  newPopup.controls.buttons.submit = FormControlButton({ titleKey: "modals.form-modal.controls.create", onClick: "" });
  return newPopup;
}