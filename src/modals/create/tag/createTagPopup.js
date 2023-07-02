import TagForm from "../../../forms/TagForm/TagForm";

import useTagForm from "../../../hooks/form/useTagForm";
import createFormPopup from "../createFormPopup";
import applySimpleFormControls from "../applySimpleFormControls";
import applyDeleteButton from "./applyDeleteButton";

/**
 * A more specific version of the `createFormPopup`. This creator-
 * function will create the props for a `FormModal` displaying the 
 * `TagForm`-form. The form will be assigned a given tag as its 
 * base instance.
 * 
 * @param {JSON} baseTag Tag JSON that the form is based on.
 * 
 * @returns Props for a tag `FormModal`.
 */
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
