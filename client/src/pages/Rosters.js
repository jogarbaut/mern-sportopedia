import axios from "axios";

import { useEffect, useState } from "react";
import AthleteForm from "../components/AthleteForm";
import AthleteList from "../components/AthleteList";
import AthleteDetail from "../components/AthleteDetail";

import { useAthleteContext } from "../hooks/useAthleteContext";
import { useAuthContext } from "../hooks/useAuthContext";

// Components
import GamelogList from "../components/GamelogList";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Divider from "../components/Divider";

const Rosters = () => {
  // Context
  const { athletes, dispatch } = useAthleteContext();
  const { user } = useAuthContext();

  // Team
  const [selectedTeam, setSelectedTeam] = useState("7U");
  const [selectedTeamRoster, setSelectedTeamRoster] = useState([]);

  // Athlete and gamelog
  const [athlete, setAthlete] = useState("");
  const [athleteId, setAthleteId] = useState("");
  const [gamelog, setGamelog] = useState([]);

  // Toggle edit athlete form state
  const [editAthleteModalToggle, setEditAthleteModalToggle] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/athlete")
      .then((res) => {
        dispatch({ type: "SET_ATHLETES", payload: res.data });
      })
      .catch((err) => console.log(err));
  }, []);

  // Set roster data based on selectedTeam
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/${selectedTeam}`)
      .then((res) => {
        // setAthlete("");
        setSelectedTeamRoster(res.data);
      })
      .catch((err) => console.log(err));
  }, [athletes, selectedTeam, dispatch]);

  // Set athlete data and gamelog data based on athleteId
  useEffect(() => {
    if (athleteId) {
      axios
        .get(`http://localhost:8000/api/athlete/${athleteId}`)
        .then((res) => {
          setAthlete(res.data);
          setGamelog(res.data.gamelog);
        })
        .catch((err) => console.log(err));
    }
  }, [athleteId, dispatch, athletes]);

  return (
    <>
      <Row>
        <div className="page-title">Rosters</div>
      </Row>
      <Container className="btn-group-container">
        <Row>
          <ButtonGroup className="btn-group" size="sm">
            <Button className={selectedTeam === "7U" ? "team-btn-active" : "team-btn"} onClick={() => setSelectedTeam("7U")} >
              7U
            </Button>
            <Button className={selectedTeam === "8U" ? "team-btn-active" : "team-btn"} onClick={() => setSelectedTeam("8U")}>
              8U
            </Button>
            <Button className={selectedTeam === "9U" ? "team-btn-active" : "team-btn"} onClick={() => setSelectedTeam("9U")}>
              9U
            </Button>
            <Button className={selectedTeam === "10U" ? "team-btn-active" : "team-btn"} onClick={() => setSelectedTeam("10U")}>
              10U
            </Button>
            <Button className={selectedTeam === "11U" ? "team-btn-active" : "team-btn"} onClick={() => setSelectedTeam("11U")}>
              11U
            </Button>
            <Button className={selectedTeam === "12U" ? "team-btn-active" : "team-btn"} onClick={() => setSelectedTeam("12U")}>
              12U
            </Button>
          </ButtonGroup>
          <ButtonGroup className="btn-group" size="sm">
            <Button className={selectedTeam === "13U" ? "team-btn-active" : "team-btn"} onClick={() => setSelectedTeam("13U")}>
              13U
            </Button>
            <Button className={selectedTeam === "14U" ? "team-btn-active" : "team-btn"} onClick={() => setSelectedTeam("14U")}>
              14U
            </Button>
            <Button className={selectedTeam === "15U" ? "team-btn-active" : "team-btn"} onClick={() => setSelectedTeam("15U")}>
              15U
            </Button>
            <Button className={selectedTeam === "16U" ? "team-btn-active" : "team-btn"} onClick={() => setSelectedTeam("16U")}>
              16U
            </Button>
            <Button className={selectedTeam === "17U" ? "team-btn-active" : "team-btn"} onClick={() => setSelectedTeam("17U")}>
              17U
            </Button>
            {user ? (
              <>
                {" "}
                <AthleteForm />
              </>
            ) : (
              <></>
            )}
          </ButtonGroup>
        </Row>
      </Container>
      <Divider />
      <Container>
        <Row>
          <Col lg={3}>
            <AthleteList
              selectedTeam={selectedTeam}
              selectedTeamRoster={selectedTeamRoster}
              setAthleteId={setAthleteId}
              setEditAthleteModalToggle={setEditAthleteModalToggle}
            />
          </Col>
          <Col lg={9}>
            <Row>
              {athlete ? (
                <AthleteDetail
                  athlete={athlete}
                  gamelog={gamelog}
                  setGamelog={setGamelog}
                />
              ) : (
                <></>
              )}
            </Row>
            <Row>
              {athlete ? (
                <GamelogList
                  athleteId={athleteId}
                  gamelog={gamelog}
                  setGamelog={setGamelog}
                />
              ) : (
                <></>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Rosters;
