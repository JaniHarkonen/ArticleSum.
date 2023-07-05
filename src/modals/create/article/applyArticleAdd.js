import applyTitle from "../../../components/FormControlButtons/json/applyTitle";

/**
 * Applier-function that applies a title as well as the "add"
 * button for the props of an article `FormModal`.
 * 
 * @param {JSON} tagPopup Props of the article `FormModal` that the 
 * title and the "add" button are to be applied to.
 * 
 * @returns Props for article tag `FormModal`.
 */
export default function applyArticleAdd(articlePopup) {
  articlePopup = applyTitle(articlePopup, "modals.form-modal.article.title.add");
  articlePopup.controls.buttons.submit = applyTitle(articlePopup.controls.buttons.submit, "modals.form-modal.controls.create");

  return articlePopup;
}
