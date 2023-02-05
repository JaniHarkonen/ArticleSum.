import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import ArticleForm from "../../forms/ArticleForm/ArticleForm";
import { Article } from "../../model/components/Article";
import popupArticleForm from "../../modal/popupArticleForm";
import applyAdd from "../../modal/applyAdd";


export default function ArticleControlPanel() {
  const {languageManager: lm, popupForm} = useContext(GlobalContext);

  const handleArticleAdd = () => {
    const article = Article();
    const form = applyAdd(popupArticleForm(article), lm);
    popupForm(form);
  };

  return (
    <Form>
      <b>Add an article</b>
      <br />
      <Button onClick={handleArticleAdd}>Add</Button>
    </Form>
  );
}
