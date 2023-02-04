import { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { GlobalContext } from "../../context/GlobalContext";


export default function FormModal(props) {
  const children = props.children;
  const { languageManager: lm, popupForm } = useContext(GlobalContext);
  const show = props.show;

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={() => popupForm(null)}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {lm.translate("modals.form-modal.header")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        lol
      </Modal.Footer>
    </Modal>
  );
}
