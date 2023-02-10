//import { cloneElement } from "react";
import Modal from "react-bootstrap/Modal";
import FormControlButtons from "../../components/FormControlButtons/FormControlButtons";


export default function FormModal(props) {
  const header = props.header || "";//props.title || "";
  //const form = props.form;
  const FormElement = props.FormElement || function() {};
  //const footer = props.footer || <></>;
  const controls = props.controls || {};
  const useForm = props.useForm || function() {};
  const baseInstance = props.baseInstance;
  const {data, setters, actions} = useForm(baseInstance);

  console.log(FormElement);

  //const customizedForm = cloneElement(form, { data, setters });
  //const customizedFooter = cloneElement(footer, { data, actions });

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
