import React from 'react';

import Header from '../Header/Header'

function ReviewSession() {
  return (
    <div className="container">
      <Header />
      <h2>Week 1 Climbing Session</h2>
      <button>Back to Session</button>
      <h4>Choose 3 climbs for 2 team members and 4 for the other</h4>
      <h4>My Climbs</h4>
      <table>
        <thead>
          <tr> Climber </tr>
          <tr> Score </tr>
          <tr> Select </tr>
        </thead>
        <tbody>
          <tr>
            <td> Alvin </td>
            <td> 6 </td>
            <td> Checked </td>
          </tr>
          <tr>
            <td> Patrick </td>
            <td> 6 </td>
            <td> Checked </td>
          </tr>
        </tbody>
      </table>
      <button>Submit for Week 1</button>
    </div>
  );
}

export default ReviewSession;
