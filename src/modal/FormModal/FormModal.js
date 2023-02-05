import { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { GlobalContext } from "../../context/GlobalContext";


export default function FormModal(props) {
  const children = props.children;
  const show = props.show;
  const title = props.title || "";
  const footer = props.footer || <></>;
  const { popupForm } = useContext(GlobalContext);

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
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        {footer}
      </Modal.Footer>
    </Modal>
  );
}
