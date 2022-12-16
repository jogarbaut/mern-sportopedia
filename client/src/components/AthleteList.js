import { useAuthContext } from "../hooks/useAuthContext";
import { useAthleteContext } from "../hooks/useAthleteContext";

import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";

import AthleteUpdateForm from "./AthleteUpdateForm";

const AthleteList = ({ selectedTeam, selectedTeamRoster, setAthleteId }) => {
  const { user } = useAuthContext();
  const { dispatch } = useAthleteContext();

  const deleteAthlete = (athleteId) => {
    axios
      .delete(`http://localhost:8000/api/athlete/${athleteId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        dispatch({ type: "DELETE_ATHLETE", payload: res.data });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <ListGroup>
        <ListGroup.Item className="athlete-list-title">
          Team {selectedTeam}
        </ListGroup.Item>
        {selectedTeamRoster.map((athlete, index) => {
          return (
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-center"
              key={athlete._id}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">#{athlete.jerseyNumber}</div>
                <div>{athlete.firstName} {athlete.lastName}</div>
              </div>
              <span
                className="material-symbols-outlined athlete-list-btn"
                onClick={() => setAthleteId(athlete._id)}
              >
                scoreboard
              </span>
              {user ? (
                <>
                  <AthleteUpdateForm athlete={athlete} />
                  <span
                    className="material-symbols-outlined athlete-list-btn"
                    onClick={() => deleteAthlete(athlete._id)}
                  >
                    delete
                  </span>
                </>
              ) : (
                <></>
              )}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </>
  );
};

export default AthleteList;
