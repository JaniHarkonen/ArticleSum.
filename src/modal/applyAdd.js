import LanguageManager from "../locales/LanguageManager";
import Button from "react-bootstrap/Button";


export default function applyAdd(props, languageManager = null) {
  const lmKey = "modals.form-modal.article.add.";
  const title = <>{LanguageManager.getTranslation(languageManager, lmKey + "title")}</>;

  const ArticleFormControls = (props) => {
    const {actionSaveChanges} = props.actions;

    return (
      <Button onClick={actionSaveChanges}>
        {LanguageManager.getTranslation(languageManager, lmKey + "controls.create")}
      </Button>
    );
  };

  return {
    ...props,
    title: title,
    footer: <ArticleFormControls />
  };
}
