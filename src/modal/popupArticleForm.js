import ArticleForm from "../forms/ArticleForm/ArticleForm";
import LanguageManager from "../locales/LanguageManager";


export default function popupArticleForm(article, languageManager = null) {
  const lmKey = "modals.form-modal.article.edit.title";
  const title = <>{LanguageManager.getTranslation(languageManager, lmKey)}</>;

  return {
    title: title,
    form: <ArticleForm article={article} />,
    footer: <>THIS IS DA EDITIOR</>
  };
}
