import Modal from "react-bootstrap/Modal";
import FormControlButtons from "../../components/FormControlButtons/FormControlButtons";

export const DEFAULT_SETTINGS = {
  header: "",
  FormElement: () => {},
  controls: {},
  useForm: (baseInstance) => {},
};


export default function FormModal(props) {
  const header = props.header || DEFAULT_SETTINGS.header;
  const FormElement = props.FormElement || DEFAULT_SETTINGS.FormElement;
  const controls = props.controls || DEFAULT_SETTINGS.controls;
  const useForm = props.useForm || DEFAULT_SETTINGS.useForm;
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
