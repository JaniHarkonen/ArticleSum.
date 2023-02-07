import { cloneElement } from "react";
import Modal from "react-bootstrap/Modal";


export default function FormModal(props) {
  const title = props.title || "";
  const form = props.form;
  const footer = props.footer || <></>;
  const useForm = props.useForm;
  const baseInstance = props.baseInstance;
  const {data, setters, actions} = useForm(baseInstance);

  const customizedForm = cloneElement(form, { data, setters });
  const customizedFooter = cloneElement(footer, { data, actions });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {customizedForm}
      </Modal.Body>
      <Modal.Footer>
        {customizedFooter}
      </Modal.Footer>
    </>
  );
}
