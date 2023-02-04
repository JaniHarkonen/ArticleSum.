import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import ArticleForm from "../../forms/ArticleForm/ArticleForm";
import { Article } from "../../model/components/Article";


export default function ArticleControlPanel() {
  const {popupForm} = useContext(GlobalContext);

  return (
    <Form>
      <b>Add an article</b>
      <br />
      <Button onClick={() => popupForm(<ArticleForm article={Article()} />)}>Add</Button>
    </Form>
  );
}
