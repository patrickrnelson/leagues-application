import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../Header/Header'
import './ClimbingSession.css'

function ClimbingSession() {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(store => store.user)
  const climbs = useSelector(store => store.climbs)

  return (
    <div className="container">
      <Header />
      <h2>Week 1 Climbing Session</h2>
      <h4>Handicap: Determined by this weeks submission</h4>
      <button onClick={() => history.push('/climb/add')}>Add a Climb</button>
      <h4>My Climbs</h4>
      <div className="climbsContainer">
        <table className="climbsTable">
          <thead>
            <tr> 
              <td>Color</td> 
              <td>Location</td>
              <td>Attempts</td> 
              <td>Level</td> 
              <td>Score</td>  
            </tr>
          </thead>
          <tbody>
            {climbs.map((climb) => climb.userId === user.id ? 
              <tr>  
              <td> {climb.color} </td>
              <td> {climb.locationName} </td>
              <td> {climb.attempts} </td>
              <td> {climb.level} </td>
              <td> 1 </td>
            </tr>
            :
            <div></div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClimbingSession;
