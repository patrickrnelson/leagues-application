import React from 'react';

import Header from '../Header/Header'

function TeamPage() {
  return (
    <div className="container">
      <Header />
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
          </tr>
          <tr>
            <td> Zach </td>
            <td> 47 </td>
          </tr>
            <td> John </td>
            <td> 44 </td>
          <tr>
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
