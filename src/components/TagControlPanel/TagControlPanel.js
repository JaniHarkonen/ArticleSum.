import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Tag } from "../../model/components/Tag";
import useFormPopup from "../../hooks/useFormModal";
import applyTagAdd from "../../modal/create/tag/applyTagAdd";
import createTagPopup from "../../modal/create/tag/createTagPopup";


export default function TagControlPanel() {
  const { popup } = useFormPopup();

  const handleArticleAdd = () => {
    popup(applyTagAdd(createTagPopup(Tag())));
  };

  return (
    <Form>
      <b>Add a tag</b>
      <br />
      <Button onClick={handleArticleAdd}>Add</Button>
    </Form>
  );
}
