import ArticleForm from "../../../forms/ArticleForm/ArticleForm";

import useArticleForm from "../../../hooks/form/useArticleForm";
import createFormPopup from "../createFormPopup";
import applySimpleFormControls from "../applySimpleFormControls";

/**
 * A more specific version of the `createFormPopup`. This creator-
 * function will create the props for a `FormModal` displaying the 
 * `ArticleForm`-form. The form will be assigned a given article as 
 * its base instance.
 * 
 * @param {JSON} baseArticle Article JSON that the form is based on.
 * 
 * @returns Props for an article `FormModal`.
 */
export default function createArticlePopup(baseArticle = null) {
  const popup = createFormPopup({
    titleKey: "modals.form-modal.article.title.edit",
    FormElement: ArticleForm,
    useHook: useArticleForm,
    baseInstance: baseArticle
  });

  applySimpleFormControls(popup);

  return popup;
}
