import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "https://api.opendota.com/api/";

function TeamDetail(props) {
  const [team, setTeam] = useState(props.team);

  const [teamPlayers, setTeamPlayers] = useState([]);

  const [teamHeroes, setTeamHeroes] = useState([]);

  useEffect(() => {
    console.log("TeamDetail", props);
    clearTeamPlayers();
    clearTeamHeroes();

    fetchTeamHeroes(team.team_id);
    fetchTeamPlayers(team.team_id);
    setTeam(team);
    return () => {};
  }, []);

  const fetchTeamPlayers = teamId => {
    axios
      .get(BASE_URL + "teams/" + teamId + "/players")
      .then(res => {
        console.log("Players", res.data);
        setTeamPlayers(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const fetchTeamHeroes = teamId => {
    axios
      .get(BASE_URL + "teams/" + teamId + "/heroes")
      .then(res => {
        console.log("Heroes", res.data);
        setTeamHeroes(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const clearTeamPlayers = () => {
    setTeamPlayers([]);
  };
  const clearTeamHeroes = () => {
    setTeamHeroes([]);
  };

  return (
    <div>
      <div>
        <div className="overlay" onClick={props.onClose}></div>
        <div className="row team-detail center">
          <div className="card team-detail-box">
            <div className="team-detail-box-image">
              <img
                className="team-detail-image"
                src={team.logo_url}
                alt="team logo"
              />
            </div>
            <h4 className="team-detail-name">{team.name}</h4>
            <div className="row team-detail-info">
              <div className="col m6 row team-stat">
                <h5>Stat</h5>
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
              <div className="col m6 team-detail-players">
                <h5>Players</h5>
                <div className="row team-players">
                  {teamPlayers.map(player => {
                    return (
                      player.name !== null &&
                      player.name !== " " &&
                      player.is_current_team_member && (
                        <div className="col m4 team-player">
                          <h6>{player.name}</h6>
                          <small>{player.games_played} played</small>
                        </div>
                      )
                    );
                  })}
                </div>
              </div>
              <div className="col m12 team-detail-heroes">
                <h5>Heroes</h5>
                <div className="row team-heroes">
                  {teamHeroes.map(hero => (
                    <div className="card">
                      <div className="col m2 team-hero">
                        <h6>{hero.localized_name}</h6>
                        <small>{hero.games_played} played</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamDetail;
