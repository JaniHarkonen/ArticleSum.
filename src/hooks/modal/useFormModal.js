import { useContext } from "react";

import FormModal from "../../modals/FormModal/FormModal";

import { GlobalContext } from "../../context/GlobalContext";

/**
 * A more specialized version of the `useModal`-custom hook. 
 * Provides the functionality to popup a `FromModal` using 
 * the modal component found in `App`.
 * 
 * In order to popup a form it must be wrapped by a `FormModal`-
 * component. This can be done via the `popup`-function which 
 * must be provided with the following `props`:
 * - `titleKey` which is the `LanguageManager`-translation key
 * that is used to retrieve the caption for the form modal 
 * window
 * - the `FormElement`-function itself whose JSX will be wrapped
 * by the form modal (**notice:** only the `FormElement`-function
 * must be provided as the JSX will be rendered later)
 * - `controls` which are functions that can be triggered by the 
 * user, typically found at the bottom of the form (see 
 * `FormControlButtons`-component for more information on how to 
 * construct the `controls`-JSON)
 * - `useHook` which is the custom hook that will be used by the 
 * form modal to provide the wrapped `FormElement` with the `data`
 * that is displayed on the form and the `setters` for that data
 * - reference to the `baseInstance` which the form is based off 
 * of (a default JSON, such as article or tag, is used when 
 * creating a new instance)
 */
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
