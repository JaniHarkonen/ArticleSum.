import TagForm from "../../../forms/TagForm/TagForm";
import useTagForm from "../../../hooks/form/useTagForm";
import createFormPopup from "../createFormPopup";
import applySimpleFormControls from "../applySimpleFormControls";
import applyDeleteButton from "./applyDeleteButton";


export default function createTagPopup(baseTag = null) {
  const popup = createFormPopup({
    titleKey: "modals.form-modal.tag.title.edit",
    FormElement: TagForm,
    useHook: useTagForm,
    baseInstance: baseTag
  });

  applySimpleFormControls(popup);
  applyDeleteButton(popup);

  return popup;
}
