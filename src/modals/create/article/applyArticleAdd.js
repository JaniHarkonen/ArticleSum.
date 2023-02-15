import applyTitle from "../../../components/FormControlButtons/json/applyTitle";


export default function applyArticleAdd(articlePopup) {
  articlePopup = applyTitle(articlePopup, "modals.form-modal.article.title.add");
  articlePopup.controls.buttons.submit = applyTitle(articlePopup.controls.buttons.submit, "modals.form-modal.controls.create");

  return articlePopup;
}
