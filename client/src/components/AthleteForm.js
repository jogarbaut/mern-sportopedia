import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useAthleteContext } from "../hooks/useAthleteContext";
import { useAuthContext } from "../hooks/useAuthContext";

import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";

const AthleteForm = () => {
  // Funcationality for modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Athlete Form
  const { dispatch } = useAthleteContext();
  const { user } = useAuthContext();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [team, setTeam] = useState("");
  const [jerseyNumber, setJerseyNumber] = useState("");

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setJerseyNumber("");
    setTeam("");
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const athleteParameters = {
      firstName,
      lastName,
      team,
      jerseyNumber,
    };

    axios
      .post("http://localhost:8000/api/athlete", athleteParameters, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        dispatch({ type: "CREATE_ATHLETE", payload: res.data });
        clearForm();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Button
        className="new-athlete-btn"
        variant="primary"
        onClick={handleShow}
      >
        New Athlete
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>New Athlete Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmitHandler}>
            <Row className="justify-content-center align-items-center g-3 row-cols-2 row-cols-lg-5">
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />

              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />

              <Form.Control
                type="number"
                placeholder="Enter Jersey Number"
                onChange={(e) => setJerseyNumber(e.target.value)}
                value={jerseyNumber}
              />

              {/* <Form.Control
                  type="text"
                  placeholder="Enter Team Name"
                  onChange={(e) => setTeam(e.target.value)}
                  value={team}
                /> */}

              <Form.Control
                as="select"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
              >
                <option value="7U">7U</option>
                <option value="8U">8U</option>
                <option value="9U">9U</option>
                <option value="10U">10U</option>
                <option value="11U">11U</option>
                <option value="12U">12U</option>
                <option value="13U">13U</option>
                <option value="14U">14U</option>
                <option value="15U">15U</option>
                <option value="16U">16U</option>
                <option value="17U">17U</option>
              </Form.Control>

              <Col lg="auto">
                <Button variant="success" type="submit">
                  Add Athlete
                </Button>
                {/* <Button variant="secondary" onClick={clearForm}>Clear</Button> */}
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          {error && <div className="error">{error}</div>}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AthleteForm;
