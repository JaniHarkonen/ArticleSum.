import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useContext } from "react";

import { Tag } from "../../model/components/Tag";
import { GlobalContext } from "../../context/GlobalContext";
import useFormPopup from "../../hooks/modal/useFormModal";
import applyTagAdd from "../../modals/create/tag/applyTagAdd";
import createTagPopup from "../../modals/create/tag/createTagPopup";

/**
 * A basic tag control panel used by the `TagsView`. The panel simply 
 * provides a single "add" button that can be used to create a new tag
 * in the application. Once the "add" button is clicked, a popup modal 
 * is shown where the user can enter the tag information.
 */
export default function TagControlPanel() {
  const { popup } = useFormPopup();
  const { languageManager: lm } = useContext(GlobalContext);
  
  /**
   * Creates a tag popup modal as well as a dummy `Tag`-JSON with 
   * default values. The dummy tag will function as the base instance 
   * of the popped up tag form. Finally, an "add" button is applied 
   * to the popup modal which is then displayed.
   */
  const handleArticleAdd = () => {
    popup(applyTagAdd(createTagPopup(Tag())));
  };

  return (
    <Form>
      <Button onClick={handleArticleAdd}>
        {lm.translate("control-panels.controls.add")}
      </Button>
    </Form>
  );
}
