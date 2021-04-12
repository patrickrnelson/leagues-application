import React from 'react';

function TeamPage() {
  return (
    <div className="container">
      <h2>Team Cullen</h2>
      <h3>Summer League 2021</h3>
      <div>Drop Down Here</div>
      <table>
        <thead>
          <tr> Climber </tr>
          <tr> Total Score </tr>
        </thead>
        <tbody>
          <tr>
            <td> Patrick </td>
            <td> 45 </td>
            <td> Zach </td>
            <td> 47 </td>
            <td> John </td>
            <td> 44 </td>
            <td> Total </td>
            <td> 136 </td>
          </tr>
        </tbody>
      </table>
      <button>Team Code</button>
    </div>
  );
}

export default TeamPage;
