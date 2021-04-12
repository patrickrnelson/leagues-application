import React from 'react';

import Header from '../Header/Header'

function Leaderboard() {
  return (
    <div className="container">
      <Header />
      <h2>Spring League 2021</h2>
      <h3>Leaderboard</h3>
      <h4>Dropdown</h4>
      <h4>My Climbs</h4>
      <table>
        <thead>
          <tr> Rank </tr>
          <tr> Team </tr>
          <tr> Score </tr>
        </thead>
        <tbody>
          <tr>
            <td> 1 </td>
            <td> Team 2 </td>
            <td> 53 </td>
          </tr>
          <tr>
            <td> 2 </td>
            <td> Team 3 </td>
            <td> 48 </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
