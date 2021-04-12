import React from 'react';

import Header from '../Header/Header'

function ClimberProfileEdit() {
  return (
    <div className="container">
      <Header />
      <label for="nameEditInput">Name:</label>
      <input type="text" id="nameEditInput" placeholder="Patrick"></input>
      <label for="emailEditInput">Name:</label>
      <input type="text" id="emailEditInput" placeholder="IClimb@gmail.com"></input>
      <label for="phoneEditInput">Name:</label>
      <input type="text" id="phoneEditInput" placeholder="555-555-5555"></input>
      <button>Save</button>
      <button>Cancel</button>
    </div>
  );
}

export default ClimberProfileEdit;
