import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useAthleteContext } from "../hooks/useAthleteContext";
import { useAuthContext } from "../hooks/useAuthContext";

import axios from "axios";
import moment from "moment";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";

const GamelogUpdateForm = ({ athleteId, game }) => {
  // Funcationality for modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { dispatch } = useAthleteContext();
  const { user } = useAuthContext();

  const [date, setDate] = useState(game.date);
  const [opponent, setOpponent] = useState(game.opponent);
  const [result, setResult] = useState(game.result);
  const [score, setScore] = useState(game.score);
  const [opponentScore, setOpponentScore] = useState(game.opponentScore);
  const [points, setPoints] = useState(game.points);
  const [fieldGoalsMade, setFieldGoalsMade] = useState(game.fieldGoalsMade);
  const [fieldGoalsAttempted, setFieldGoalsAttempted] = useState(
    game.fieldGoalsAttempted
  );
  const [fieldGoalsPercentage, setFieldGoalsPercentage] = useState(
    game.fieldGoalsPercentage
  );
  const [threePointFieldGoalsMade, setThreePointFieldGoalsMade] = useState(
    game.threePointFieldGoalsMade
  );
  const [threePointFieldGoalsAttempted, setThreePointFieldGoalsAttempted] =
    useState(game.threePointFieldGoalsAttempted);
  const [threePointFieldGoalsPercentage, setThreePointFieldGoalsPercentage] =
    useState(game.threePointFieldGoalsPercentage);
  const [freethrowsMade, setFreethrowsMade] = useState(game.freethrowsMade);
  const [freethrowsAttempted, setFreethrowsAttempted] = useState(
    game.freethrowsAttempted
  );
  const [freethrowsPercentage, setFreethrowsPercentage] = useState(
    game.freethrowsPercentage
  );
  const [rebounds, setRebounds] = useState(game.rebounds);
  const [assists, setAssists] = useState(game.assists);
  const [blocks, setBlocks] = useState(game.blocks);
  const [steals, setSteals] = useState(game.steals);
  const [turnovers, setTurnovers] = useState(game.turnovers);

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    axios
      .put(
        `http://localhost:8000/api/athlete/gamelog/game/${athleteId}/${game._id}`,
        {
          date,
          opponent,
          result,
          score,
          opponentScore,
          points,
          fieldGoalsMade,
          fieldGoalsAttempted,
          fieldGoalsPercentage,
          threePointFieldGoalsMade,
          threePointFieldGoalsAttempted,
          threePointFieldGoalsPercentage,
          freethrowsMade,
          freethrowsAttempted,
          freethrowsPercentage,
          rebounds,
          assists,
          blocks,
          steals,
          turnovers,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .then((res) => {
        dispatch({ type: "UPDATE_ATHLETE", payload: res.data });
        handleClose()
      })
      .catch((err) => console.log(err));
  };

  const clearForm = () => {
    setDate("");
    setOpponent("");
    setResult("");
    setScore("");
    setOpponentScore("");
    setPoints(0);
    setFieldGoalsMade("");
    setFieldGoalsAttempted("");
    setFieldGoalsPercentage("");
    setThreePointFieldGoalsMade("");
    setThreePointFieldGoalsAttempted("");
    setThreePointFieldGoalsPercentage("");
    setFreethrowsMade("");
    setFreethrowsAttempted("");
    setFreethrowsPercentage("");
    setRebounds("");
    setAssists("");
    setBlocks("");
    setSteals("");
    setTurnovers("");
  };

  const determineResult = (teamScore, oppScore) => {
    if (
      parseInt(teamScore) > parseInt(oppScore) &&
      parseInt(teamScore, oppScore) !== null
    ) {
      return "W";
    } else if (
      parseInt(teamScore) < parseInt(oppScore) &&
      parseInt(teamScore, oppScore) !== null
    ) {
      return "L";
    } else {
      return "";
    }
  };

  const calcPercentage = (made, attempted) => {
    return parseFloat((made / attempted) * 100).toFixed(1);
  };

  const calcPoints = () => {
    return parseInt(
      fieldGoalsMade * 2 + threePointFieldGoalsMade * 3 + freethrowsMade * 1
    );
  };

  useEffect(() => {
    setPoints(calcPoints());
  }, [fieldGoalsMade, threePointFieldGoalsMade, freethrowsMade]);

  return (
    <>
      <span
        className="material-symbols-outlined delete"
        onClick={() => setShow(true)}
      >
        edit_note
      </span>

      <Modal
        size="xl"
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Edit Game
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="gamelog-form" onSubmit={onSubmitHandler}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formDate">
                <Form.Label>DATE</Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                  value={moment.utc(game.date).format("YYYY-MM-DD")}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formOpponent">
                <Form.Label>OPP</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setOpponent(e.target.value)}
                  value={opponent}
                  placeholder="Enter Opponent"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formTeamScore">
                <Form.Label>TEAM SCORE</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => {
                    setScore(e.target.value);
                    setResult(determineResult(e.target.value, opponentScore));
                  }}
                  value={score}
                  placeholder="Enter Team Score"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formOpponentScore">
                <Form.Label>OPP SCORE</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => {
                    setOpponentScore(e.target.value);
                    setResult(determineResult(score, e.target.value));
                  }}
                  value={opponentScore}
                  placeholder="Enter Opp Score"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formResult">
                <Form.Label>RESULT</Form.Label>
                <Form.Control type="text" value={result} disabled readOnly />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formFieldGoalsMade">
                <Form.Label>2PM</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => {
                    setFieldGoalsMade(e.target.value);
                    if (fieldGoalsAttempted !== "") {
                      setFieldGoalsPercentage(
                        calcPercentage(e.target.value, fieldGoalsAttempted)
                      );
                    }
                  }}
                  value={fieldGoalsMade}
                  placeholder="Enter 2PM"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formFieldGoalsAttempted">
                <Form.Label>2FGA</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => {
                    setFieldGoalsAttempted(e.target.value);
                    setFieldGoalsPercentage(
                      calcPercentage(fieldGoalsMade, e.target.value)
                    );
                  }}
                  value={fieldGoalsAttempted}
                  placeholder="Enter 2FGA"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formFieldGoalsPercentage">
                <Form.Label>2FG%</Form.Label>
                <Form.Control
                  type="number"
                  value={fieldGoalsPercentage}
                  disabled
                  readOnly
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formThreePointFieldGoalsMade">
                <Form.Label>3PM</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => {
                    setThreePointFieldGoalsMade(e.target.value);
                    if (threePointFieldGoalsAttempted !== "") {
                      setThreePointFieldGoalsPercentage(
                        calcPercentage(
                          e.target.value,
                          threePointFieldGoalsAttempted
                        )
                      );
                    }
                  }}
                  value={threePointFieldGoalsMade}
                  placeholder="Enter 3PM"
                />
              </Form.Group>
              <Form.Group
                as={Col}
                controlId="formThreePointFieldGoalsAttempted"
              >
                <Form.Label>3FGA</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => {
                    setThreePointFieldGoalsAttempted(e.target.value);
                    setThreePointFieldGoalsPercentage(
                      calcPercentage(threePointFieldGoalsMade, e.target.value)
                    );
                  }}
                  value={threePointFieldGoalsAttempted}
                  placeholder="Enter 3FGA"
                />
              </Form.Group>
              <Form.Group
                as={Col}
                controlId="formThreePointFieldGoalsPercentage"
              >
                <Form.Label>3FG%</Form.Label>
                <Form.Control
                  type="number"
                  value={threePointFieldGoalsPercentage}
                  disabled
                  readOnly
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formFreethrowsMade">
                <Form.Label>FTM</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => {
                    setFreethrowsMade(e.target.value);
                    if (freethrowsAttempted !== "") {
                      setFreethrowsPercentage(
                        calcPercentage(e.target.value, freethrowsAttempted)
                      );
                    }
                  }}
                  value={freethrowsMade}
                  placeholder="Enter FTM"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formFreethrowsAttempted">
                <Form.Label>FTA</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => {
                    setFreethrowsAttempted(e.target.value);
                    setFreethrowsPercentage(
                      calcPercentage(freethrowsMade, e.target.value)
                    );
                  }}
                  value={freethrowsAttempted}
                  placeholder="Enter FTA"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formFreethrowsPercentage">
                <Form.Label>FT%</Form.Label>
                <Form.Control
                  type="number"
                  value={freethrowsPercentage}
                  disabled
                  readOnly
                />
              </Form.Group>
              <Form.Group
                as={Col}
                controlId="formThreePointFieldGoalsPercentage"
              >
                <Form.Label>PTS</Form.Label>
                <Form.Control type="number" value={points} disabled readOnly />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formRebounds">
                <Form.Label>REB</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => setRebounds(e.target.value)}
                  value={rebounds}
                  placeholder="Enter REB"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formAssists">
                <Form.Label>AST</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => setAssists(e.target.value)}
                  value={assists}
                  placeholder="Enter AST"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formBlocks">
                <Form.Label>BLK</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => setBlocks(e.target.value)}
                  value={blocks}
                  placeholder="Enter BLK"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formSteals">
                <Form.Label>STL</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => setSteals(e.target.value)}
                  value={steals}
                  placeholder="Enter STL"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formSteals">
                <Form.Label>TOV</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => setTurnovers(e.target.value)}
                  value={turnovers}
                  placeholder="Enter TOV"
                />
              </Form.Group>
            </Row>
            <Button type="submit" className="gamelog-submit-button">
              Save Edits
            </Button>{" "}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {error && <div className="error">{error}</div>}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GamelogUpdateForm;
