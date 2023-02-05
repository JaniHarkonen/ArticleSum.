import LanguageManager from "../locales/LanguageManager";

export default function applyAdd(props, languageManager = null) {
  const lmKey = "modals.form-modal.article.add.title";
  const title = <>{LanguageManager.getTranslation(languageManager, lmKey)}</>;

  return {
    ...props,
    title: title,
    footer: <>XDXDXD ADDDER</>
  };
}
