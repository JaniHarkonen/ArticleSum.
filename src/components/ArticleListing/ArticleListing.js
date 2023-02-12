import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import useFormModal from "../../hooks/useFormModal";
import createArticlePopup from "../../modal/create/article/createArticlePopup";


export default function ArticleListing(props) {
  const article = props.article;
  const eventKey = props.eventKey;
  const articleTitle = article.title;
  const articleSource = article.source;
  
  const { popup } = useFormModal();

  const handleArticleEdit = (editedArticle) => {
    popup(createArticlePopup(editedArticle));
  };

  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>{articleTitle}</Accordion.Header>
      <Accordion.Body>
        {articleSource}
        <Button onClick={() => handleArticleEdit(article)}>Open</Button>
      </Accordion.Body>
    </Accordion.Item>
  );
}
