import LanguageManager from "../locales/LanguageManager";
import Button from "react-bootstrap/Button";
import TagForm from "../forms/TagForm/TagForm";


export default function createTagForm(article, languageManager = null) {
  const lmKey = "modals.form-modal.tag.edit.";
  const title = <>{LanguageManager.getTranslation(languageManager, lmKey + "title")}</>;

  const ArticleFormControls = (props) => {
    const {actionSaveChanges} = props.actions;

    return (
      <Button onClick={actionSaveChanges}>
        {LanguageManager.getTranslation(languageManager, lmKey + "controls.save")}
      </Button>
    );
  };

  return {
    title: title,
    form: <TagForm />,
    footer: <ArticleFormControls />
  };
}
