import { FormControlButton } from "../../../components/FormControlButtons/FormControlButtons";
import ArticleForm from "../../../forms/ArticleForm/ArticleForm";
import useArticleForm from "../../../hooks/useArticleForm";

export default function createArticlePopup(baseArticle = null) {
  const controls = {
    buttons: {
      submit: FormControlButton({ titleKey: "modals.form-modal.controls.save", onClick: "" })
    },
    order: ["submit"]
  };

  return {
    titleKey: "modals.form-modal.article.title.edit",
    FormElement: ArticleForm,
    controls: controls,
    useHook: useArticleForm,
    baseInstance: baseArticle
  };
}
