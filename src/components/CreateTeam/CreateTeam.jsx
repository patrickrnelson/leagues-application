import React from 'react';

import Header from '../Header/Header'

function CreateTeam() {
  return (
    <div className="container">
      <Header />
      <h2>Create Team</h2>
      <input type="text" placeholder="Team Name"></input>
      <button>Create Team</button>
    </div>
  );
}

export default CreateTeam;
