import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const InstructionsModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Demo Instructions
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className="border-0">
          <Modal.Title>
            <div className="instructions-title">Sportopedia</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="instructions-subtitle">
            Web application developed for a youth sports organization to track
            and visualize their youth athlete's stats.
          </div>
          <div className="subsection">Demo Login</div>
          <ul>
            <li>
              Login to the Demo Account by clicking the 'Demo Login' button.
            </li>
            <li>
              Users not logged in can still view stats but cannot edit or add
              stats as this route does not require authentication.
            </li>
          </ul>
          <div className="subsection">Teams</div>
          <ul>
            <li>
              Click the different teams such as "7U", "8U", "9U", etc. and view
              the athletes.
            </li>
            <li>Add a new athlete by clicking the 'New Athlete' button.</li>
          </ul>
          <div className="subsection">Athlete Stats</div>
          <ul>
            <li>
              Users can click the "Scorebook" icon next to the athlete's name to
              view their details and stats.
            </li>
            <li>
              Users can view, add, edit, and delete both athletes and gamelog
              data.
            </li>
            <li>
              Adding, editing, or deleting stats will automatically updated
              charts created with Chart.js library.
            </li>
          </ul>
          <div className="credits">
            <hr />
            <div className="credits-text">
              Project created by Jomel Bautista
            </div>
            <div className="credits-text">
              <small>
                If you would like to connect, please contact me at
                jomelgbautista@gmail.com
              </small>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default InstructionsModal;
