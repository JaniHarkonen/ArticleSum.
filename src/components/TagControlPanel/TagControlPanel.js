import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Article } from "../../model/components/Article";
import createTagForm from "../../modal/createTagForm";
import applyAdd from "../../modal/applyAdd";
import FormModal from "../../modal/FormModal/FormModal";
import useTagForm from "../../hooks/useTagForm";
import { Tag } from "../../model/components/Tag";


export default function TagControlPanel() {
  const {languageManager: lm, popupModal} = useContext(GlobalContext);

  const handleArticleAdd = () => {
    const newTag = Tag();
    const form = createTagForm(newTag, lm);
    
    popupModal(
      <FormModal
        title={form.title}
        form={form.form}
        footer={form.footer}
        useForm={useTagForm}
        baseInstance={newTag}
      />
    );
  };

  return (
    <Form>
      <b>Add a tag</b>
      <br />
      <Button onClick={handleArticleAdd}>Add</Button>
    </Form>
  );
}
