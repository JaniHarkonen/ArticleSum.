import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import FormModal from "../../modals/FormModal/FormModal";


export default function useFormModal() {
  const { popupModal, languageManager: lm } = useContext(GlobalContext);

  const popup = (props) => {
    const titleKey = props.titleKey;
    const FormElement = props.FormElement;
    const controls = props.controls;
    const useHook = props.useHook;
    const baseInstance = props.baseInstance;

    popupModal(
      <FormModal
        header={<>{lm.translate(titleKey)}</>}
        FormElement={FormElement}
        controls={controls}
        useForm={useHook}
        baseInstance={baseInstance}
      />
    );
  };

  return { popup };
}
