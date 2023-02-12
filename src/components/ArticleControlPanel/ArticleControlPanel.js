import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Article } from "../../model/components/Article";
import useFormPopup from "../../hooks/modal/useFormModal";
import createArticlePopup from "../../modals/create/article/createArticlePopup";
import applyArticleAdd from "../../modals/create/article/applyArticleAdd";


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
