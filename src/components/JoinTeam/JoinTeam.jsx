import React from 'react';

import Header from '../Header/Header'

function CreateTeam() {
  return (
    <div className="container">
      <Header />
      <h2>Join Team</h2>
      <label for="teamCodeInput">Enter Team Code from Captain</label>
      <input type="text" id="teamCodeInput" placeholder="Team Code"></input>
      <button>Join Team</button>
    </div>
  );
}

export default CreateTeam;
