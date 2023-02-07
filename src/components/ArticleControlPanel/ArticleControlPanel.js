import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Article } from "../../model/components/Article";
import createArticleForm from "../../modal/createArticleForm";
import applyAdd from "../../modal/applyAdd";
import FormModal from "../../modal/FormModal/FormModal";
import useArticleForm from "../../hooks/useArticleForm";


export default function ArticleControlPanel() {
  const {languageManager: lm, popupModal} = useContext(GlobalContext);

  const handleArticleAdd = () => {
    const newArticle = Article();
    const form = applyAdd(createArticleForm(newArticle), lm);
    
    popupModal(
      <FormModal
        title={form.title}
        form={form.form}
        footer={form.footer}
        useForm={useArticleForm}
        baseInstance={newArticle}
      />
    );
  };

  return (
    <Form>
      <b>Add an article</b>
      <br />
      <Button onClick={handleArticleAdd}>Add</Button>
    </Form>
  );
}
