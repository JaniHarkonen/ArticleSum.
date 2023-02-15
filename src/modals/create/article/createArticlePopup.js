import ArticleForm from "../../../forms/ArticleForm/ArticleForm";
import useArticleForm from "../../../hooks/form/useArticleForm";
import createFormPopup from "../createFormPopup";
import applySimpleFormControls from "../applySimpleFormControls";


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
