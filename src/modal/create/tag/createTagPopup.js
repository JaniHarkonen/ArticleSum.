import { FormControlButton } from "../../../components/FormControlButtons/FormControlButtons";
import TagForm from "../../../forms/TagForm/TagForm";
import useTagForm from "../../../hooks/useTagForm";

export default function createArticlePopup(baseTag = null) {
  const controls = {
    buttons: {
      submit: FormControlButton({ titleKey: "modals.form-modal.controls.save", onClick: "" })
    },
    order: ["submit"]
  };

  return {
    titleKey: "modals.form-modal.tag.title.edit",
    FormElement: TagForm,
    controls: controls,
    useHook: useTagForm,
    baseInstance: baseTag
  };
}
