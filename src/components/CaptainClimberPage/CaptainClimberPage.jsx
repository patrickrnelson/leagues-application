import React from 'react';

import Header from '../Header/Header'

function CaptainClimberPage() {
  return (
    <div className="container">
      <Header />
      <h2>Patrick</h2>
      <button>Patrick's Info</button>
      <button>Remove team member</button>
      <table>
        <thead>
          <tr> Total Score </tr>
          <tr> 207 </tr>
        </thead>
        <tbody>
          <tr>
            <td> Average Score </td>
            <td> 5.3 </td>
            <td> Last Week </td>
            <td> 16 </td>
            <td> Handicap </td>
            <td> 1 </td>
          </tr>
        </tbody>
      </table>
      <button>Back toTeam </button>
    </div>
  );
}

export default CaptainClimberPage;
