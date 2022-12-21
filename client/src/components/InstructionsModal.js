import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const InstructionsModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="warning" onClick={handleShow} className="ms-2">
        Demo Instructions
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sportopedia Demo Instructions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            To explore the functionality of the web application, click the 'Demo
            Login' button and login with the provided credentials.
          </p>
          <p>
            After logging in, click the different teams such as "7U", "8U",
            "9U", etc. and view the athletes.
          </p>
          <p>
            Users can click the "Scorebook" icon next to the athlete's name to
            view their details.
          </p>{" "}
          <p>
            Users can view, add, edit, and delete both athletes and gamelog
            data.
          </p>
          <strong>
            This web application is in development for a youth sports
            organization to track and visualize their athlete's stats.
          </strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default InstructionsModal;
