import FormControlSubmit from "../../../components/FormControlButtons/json/FormControlSubmit";
import FormControlCancel from "../../../components/FormControlButtons/json/FormControlCancel";
import applyOrder from "../../../components/FormControlButtons/json/applyOrder";
import ArticleForm from "../../../forms/ArticleForm/ArticleForm";
import useArticleForm from "../../../hooks/useArticleForm";
import createOrderedJson from "../../../utils/createOrderedJson";


export default function createArticlePopup(baseArticle = null) {
  const controls = createOrderedJson({
    submit: applyOrder(FormControlSubmit("save", "actionSaveChanges"), 1),
    cancel: applyOrder(FormControlCancel("actionCancel"), 0),
  }, {
    destDataField: "buttons"
  });

  return {
    titleKey: "modals.form-modal.article.title.edit",
    FormElement: ArticleForm,
    controls: controls,
    useHook: useArticleForm,
    baseInstance: baseArticle
  };
}
