import React from 'react';

function ClimberPage() {
  return (
    <div className="container">
      <h2>Patrick</h2>
      <button>Patrick's Info</button>
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

export default ClimberPage;
