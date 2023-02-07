import { useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { GlobalContext } from "../../context/GlobalContext";
import useArticleForm from "../../hooks/useArticleForm";
import createArticleForm from "../../modal/createArticleForm";
import FormModal from "../../modal/FormModal/FormModal";
import { Article } from "../../model/components/Article";


export default function ArticleListing(props) {
  const article = props.article;
  const eventKey = props.eventKey;
  const articleTitle = article.title;
  const articleSource = article.source;
  const { popupModal, languageManager: lm } = useContext(GlobalContext);

  const handleArticleEdit = (editedArticle) => {
    const form = createArticleForm(editedArticle, lm);
    
    popupModal(
      <FormModal
        title={form.title}
        form={form.form}
        footer={form.footer}
        useForm={useArticleForm}
        baseInstance={editedArticle}
      />
    );
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
