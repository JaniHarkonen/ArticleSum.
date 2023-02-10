export default function applyArticleAdd(articlePopup) {
  const newPopup = {
    ...articlePopup,
    titleKey: "modals.form-modal.article.title.add"
  };

  newPopup.controls.buttons.submit.titleKey = "modals.form-modal.controls.create";
  return newPopup;
}
