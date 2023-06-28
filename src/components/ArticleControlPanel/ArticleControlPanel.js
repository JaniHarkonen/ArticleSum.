import Form from "react-bootstrap/Form";

import { useContext } from "react";

import { Article } from "../../model/components/Article";
import { GlobalContext } from "../../context/GlobalContext";
import useFormPopup from "../../hooks/modal/useFormModal";
import createArticlePopup from "../../modals/create/article/createArticlePopup";
import applyArticleAdd from "../../modals/create/article/applyArticleAdd";
import createButtons from "../../utils/createButtons";


export default function ArticleControlPanel(props) {
  const selection = props.selection || [];
  const { popup } = useFormPopup();
  const { languageManager: lm, workspaceManager: wm } = useContext(GlobalContext);
  
  const handleArticleAdd = () => {
    popup(applyArticleAdd(createArticlePopup(Article())));
  };

  const handleArticleDelete = () => {
    if( selection.getSelectionIds().length > 0 )
    wm.getArticleContainer().removeMany((article) => selection.articles[article.id]);
  };

  return (
    <Form>
      {createButtons([
        { className: "mt-1 me-1", onClick: handleArticleAdd, caption: lm.translate("control-panels.controls.add") },
        { className: "mt-1 me-1", onCLick: handleArticleDelete, caption: lm.translate("control-panels.controls.delete") }
      ])}
    </Form>
  );
}
