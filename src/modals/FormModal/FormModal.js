import Modal from "react-bootstrap/Modal";

import FormControlButtons from "../../components/FormControlButtons/FormControlButtons";

export const DEFAULT_SETTINGS = {
  header: "",
  FormElement: () => <></>,
  controls: {},
  useForm: (baseInstance) => {},
};

/**
 * A generic component for displaying forms in the modal of `App`.
 * Each form modal consists of a header which holds the title of 
 * the form, the body which holds the form information and input
 * fields, and the footer which holds the form controls. This makes
 * the form modal highly versatile as it can display any form that 
 * fits this strucutre.
 * 
 * Form modal also does not hold any specific state, rather, a 
 * custom hook that maintains the state must be provided in the 
 * `useForm`-prop. Form modals can be created with "creator"-
 * functions that are outlined in the `create`-subdirectory. Each 
 * form modal must also be based on a certain `baseInstance` which
 * holds the initial information displayed on the form.
 * 
 * The `useForm`-hook must always provide the form modal with the 
 * following information:
 * - `data` which holds the current state of the form input
 * - `setters` which holds the hooks that will be used to update 
 * the form input
 * - `actions` which holds the actions that will be triggered by 
 * the user using the form controls (see `FormControlButtons`-
 * component for more information)
 */
export default function FormModal(props) {
  /**
   * Header text of the form modal.
   */
  const header = props.header || DEFAULT_SETTINGS.header;

  /**
   * Function that will be used to create the JSX of the body of 
   * the form.
   */
  const FormElement = props.FormElement || DEFAULT_SETTINGS.FormElement;

  /**
   * A JSON containing the actions that can be triggered by the 
   * form control buttons.
   */
  const controls = props.controls || DEFAULT_SETTINGS.controls;

  /**
   * Custom hook that holds the state of the form.
   */
  const useForm = props.useForm || DEFAULT_SETTINGS.useForm;

  /**
   * Instance that holds the initial information that will be 
   * displayed on the form.
   */
  const baseInstance = props.baseInstance;
  
  const {data, setters, actions} = useForm(baseInstance);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {header}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormElement
          data={data}
          setters={setters}
        />
      </Modal.Body>
      <Modal.Footer>
        <FormControlButtons
          controls={controls}
          actions={actions}
        />
      </Modal.Footer>
    </>
  );
}
