import { useContext } from "react";
import { FormControlButton } from "../../../components/FormControlButtons/FormControlButtons";
import { GlobalContext } from "../../../context/GlobalContext";
import ArticleForm from "../../../forms/ArticleForm/ArticleForm";


export default function useArticlePopup() {
  const { languageManager: lm } = useContext(GlobalContext);
  const category = "modals.form-modal.article.edit.";

  return {
    title: lm.translate(category + "title"),
    form: <ArticleForm />,
    controls: [
      FormControlButton({
        inner: <>{lm.translate(category + "controls.save")}</>,
        onClick: () => console.log("L")
      })
    ]
  };
}
