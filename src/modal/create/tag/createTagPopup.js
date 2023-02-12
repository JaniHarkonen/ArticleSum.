import TagForm from "../../../forms/TagForm/TagForm";
import useTagForm from "../../../hooks/useTagForm";
import createFormPopup from "../createFormPopup";
import applySimpleFormControls from "../applySimpleFormControls";


export default function createTagPopup(baseTag = null) {
  const popup = createFormPopup({
    titleKey: "modals.form-modal.tag.title.edit",
    FormElement: TagForm,
    useHook: useTagForm,
    baseInstance: baseTag
  });

  applySimpleFormControls(popup);

  return popup;
}
