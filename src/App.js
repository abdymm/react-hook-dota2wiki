import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Team from "./component/Team";

function App() {
  return (
    <div className="App">
      <div>
        <h3 className="center">DOTA 2 PRO TEAM</h3>
        
        <div>
          <Team />
        </div>
      </div>
    </div>
  );
}

export default App;
