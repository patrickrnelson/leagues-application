import React from 'react';

import Header from '../Header/Header'

function ClimbingSession() {
  return (
    <div className="container">
      <Header />
      <h2>Week 1 Climbing Session</h2>
      <h4>Handicap: Determined by this weeks submission</h4>
      <button>Add a Climb</button>
      <h4>My Climbs</h4>
      <table>
        <thead>
          <tr> Color </tr>
          <tr> Location </tr>
          <tr> Difficulty </tr>
          <tr> Score </tr>
          <tr> Attempts </tr>
        </thead>
        <tbody>
          <tr>
            <td> Red </td>
            <td> Overhang </td>
            <td> V7 </td>
            <td> 5 </td>
            <td> 3 </td>
          </tr>
          <tr>
            <td> Blue </td>
            <td> Slab </td>
            <td> V8 </td>
            <td> 6 </td>
            <td> 2 </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ClimbingSession;
