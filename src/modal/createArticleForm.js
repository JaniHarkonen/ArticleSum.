import ArticleForm from "../forms/ArticleForm/ArticleForm";
import LanguageManager from "../locales/LanguageManager";
import Button from "react-bootstrap/Button";


export default function createArticleForm(article, languageManager = null) {
  const lmKey = "modals.form-modal.article.edit.";
  const title = <>{LanguageManager.getTranslation(languageManager, lmKey + "title")}</>;

  const ArticleFormControls = (props) => {
    const {actionSaveChanges} = props.actions;

    return <Button onClick={actionSaveChanges}>{LanguageManager.getTranslation(languageManager, lmKey + "controls.create")}</Button>;
  };

  return {
    title: title,
    form: <ArticleForm article={article} />,
    footer: <ArticleFormControls />
  };
}
