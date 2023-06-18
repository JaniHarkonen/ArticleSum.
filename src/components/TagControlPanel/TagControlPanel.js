import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useContext } from "react";

import { Tag } from "../../model/components/Tag";
import { GlobalContext } from "../../context/GlobalContext";
import useFormPopup from "../../hooks/modal/useFormModal";
import applyTagAdd from "../../modals/create/tag/applyTagAdd";
import createTagPopup from "../../modals/create/tag/createTagPopup";



export default function TagControlPanel() {
  const { popup } = useFormPopup();
  const { languageManager: lm } = useContext(GlobalContext);
  
  const handleArticleAdd = () => {
    popup(applyTagAdd(createTagPopup(Tag())));
  };

  return (
    <Form>
      {/*<b>{lm.translate("control-panels.tag.description")}</b>
      <br />*/}
      <Button onClick={handleArticleAdd}>
        {lm.translate("control-panels.controls.add")}
      </Button>
    </Form>
  );
}
