import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "https://api.opendota.com/api/";

function Team() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios
      .get(BASE_URL + "teams")
      .then(res => {
        console.log(res.data);
        setTeams(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    return () => {
      //cleanup some stuff
    };
  }, []);

  return (
    <div>
      <div className="row">
        {teams.map(team => (
          <div className="col s12 m3" key={team.team_id}>
            <div className="card">
              <div className="card-image">
                <img className="image" src={team.logo_url} alt="team logo" />
              </div>
              <div className="card-content">
                <h1 className="team-title">
                  <span>{team.name}</span>
                </h1>
                <div className="row team-stat">
                  <div className="col m3 blue-text text-darken-2">
                    <p>{team.wins + team.losses}</p>
                    <p>P</p>
                  </div>

                  <div className="col m3 green-text text-darken-2">
                    <p>{team.wins}</p>
                    <p>W</p>
                  </div>
                  <div className="col m3 red-text text-darken-2">
                    <p>{team.losses}</p>
                    <p>L</p>
                  </div>
                  <div className="col m3 orange-text text-darken-2">
                    <p>{team.rating}</p>
                    <p>R</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;
