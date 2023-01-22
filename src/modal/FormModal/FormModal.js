import Modal from "react-bootstrap/Modal";


export default function FormModal(props) {
  const children = props.children;

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={true}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit article information
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
