import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Article } from "../../model/components/Article";
import useFormPopup from "../../hooks/useFormPopup";
import createArticlePopup from "../../modal/create/article/createArticlePopup";
import applyArticleAdd from "../../modal/create/article/applyArticleAdd";


export default function ArticleControlPanel() {
  const { popup } = useFormPopup();

  const handleArticleAdd = () => {
    popup(applyArticleAdd(createArticlePopup(Article())));
  };

  return (
    <Form>
      <b>Add an article</b>
      <br />
      <Button onClick={handleArticleAdd}>Add</Button>
    </Form>
  );
}
