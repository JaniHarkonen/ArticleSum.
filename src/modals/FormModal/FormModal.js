import Modal from "react-bootstrap/Modal";
import FormControlButtons from "../../components/FormControlButtons/FormControlButtons";


export default function FormModal(props) {
  const header = props.header || "";
  const FormElement = props.FormElement || function() {};
  const controls = props.controls || {};
  const useForm = props.useForm || function() {};
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
