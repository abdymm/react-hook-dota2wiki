import React, { useState, useEffect } from "react";
import axios from "axios";

import TeamDetail from "./TeamDetail";

const BASE_URL = "https://api.opendota.com/api/";

function Team() {
  const initialTeam = {
    name: "",
    team_id: 0
  };
  const [teams, setTeams] = useState([]);
  const [team, setTeam] = useState(initialTeam);

  useEffect(() => {
    axios
      .get(BASE_URL + "teams")
      .then(res => {
        console.log("Team", res.data);
        setTeams(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    return () => {};
  }, []);

  const onTeamDetail = team => {
    setTeam(team);
  };

  const hideTeamDetail = () => {
    setTeam(initialTeam);
  };

  return (
    <div>
      {team.name !== "" && <TeamDetail team={team} onClose={hideTeamDetail} />}
      <div className="row team-list">
        {teams.map(team => (
          <div>
            {team.name !== "" && (
              <div
                className="col s12 m2 team-box"
                key={team.team_id}
                onClick={() => onTeamDetail(team)}
              >
                <div className="card">
                  <div className="card-image">
                    <img
                      className="image"
                      src={team.logo_url}
                      alt="team logo"
                    />
                  </div>
                  <div className="card-content">
                    <h1 className="team-title">
                      <span>{team.name}</span>
                    </h1>
                    <div className="row team-stat">
                      <div className="col m6 blue-text text-darken-2">
                        <p>{team.wins + team.losses}</p>
                        <p>P</p>
                      </div>

                      <div className="col m6 green-text text-darken-2">
                        <p>{team.wins}</p>
                        <p>W</p>
                      </div>
                      <div className="col m6 red-text text-darken-2">
                        <p>{team.losses}</p>
                        <p>L</p>
                      </div>
                      <div className="col m6 orange-text text-darken-2">
                        <p>{team.rating}</p>
                        <p>R</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;
