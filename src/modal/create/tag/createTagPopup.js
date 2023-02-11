import FormControlSubmit from "../../../components/FormControlButtons/json/FormControlSubmit";
import FormControlCancel from "../../../components/FormControlButtons/json/FormControlCancel";
import applyOrder from "../../../components/FormControlButtons/json/applyOrder";
import TagForm from "../../../forms/TagForm/TagForm";
import useTagForm from "../../../hooks/useTagForm";
import createOrderedJson from "../../../utils/createOrderedJson";


export default function createTagPopup(baseTag = null) {
  const controls = createOrderedJson({
    submit: applyOrder(FormControlSubmit("save", "actionSaveChanges"), 1),
    cancel: applyOrder(FormControlCancel("actionCancel"), 0),
  }, {
    destDataField: "buttons"
  });

  return {
    titleKey: "modals.form-modal.tag.title.edit",
    FormElement: TagForm,
    controls: controls,
    useHook: useTagForm,
    baseInstance: baseTag
  };
}
