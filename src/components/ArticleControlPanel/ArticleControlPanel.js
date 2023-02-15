import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Article } from "../../model/components/Article";
import useFormPopup from "../../hooks/modal/useFormModal";
import createArticlePopup from "../../modals/create/article/createArticlePopup";
import applyArticleAdd from "../../modals/create/article/applyArticleAdd";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";


export default function ArticleControlPanel() {
  const { popup } = useFormPopup();
  const { languageManager: lm } = useContext(GlobalContext);

  const handleArticleAdd = () => {
    popup(applyArticleAdd(createArticlePopup(Article())));
  };

  return (
    <Form>
      <b>{lm.translate("control-panels.article.description")}</b>
      <br />
      <Button onClick={handleArticleAdd}>{lm.translate("control-panels.controls.add")}</Button>
    </Form>
  );
}
