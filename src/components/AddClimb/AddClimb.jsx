import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Header from '../Header/Header'

import './AddClimb.css'
import { useRadioGroup } from '@material-ui/core';

function AddClimb() {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);
  const teams = useSelector(store => store.teams);
  
  // local state to store climb info from inputs 
  const [climber, setClimber] = useState(user.name)
  const [climberId, setClimberId] = useState(user.id)
  const [color, setColor] = useState('')
  const [location, setLocation] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [attempts, setAttempts] = useState(0)

  let colors = ['Black', 'Blue', 'Green', 'Red', 'White', 'Yellow']
  let locations = ['Left Barrel', 'Overhang', 'Right Barrel', 'Slab', 'Slight Overhang'] // can change this to live in the store eventually
  let difficulties = ['V0', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', 'V10', 'V11', 'V12']

  const handleAddClimb = () => {
    // make sure each input is selected
    if(color !== '' && location !== '' && difficulty !== '' && attempts !== 0) {
      // send new climb to climbs saga which sends to climb reducer to store in database
      dispatch ({
        type: 'ADD_NEW_CLIMB',
        payload: {
          climberId: climberId,
          color: color,
          location: location,
          difficulty: difficulty.substring(1), // Removes the 'V' so we send only a number to the DB
          attempts: attempts
        },

      })
      history.push('/climb/session')
    }
    else {
      alert('Please select all inputs')
    }
  }

  // Used to find climberID since we can't pass it in the 'select' onChange
  // This will set both the climber and climberId state when the climber 'select' is changed
  const findClimberId = (event) => {
    setClimber(event.target.value)
    for(let team of teams) {
      if(team.captainId === user.id) {
        if(team.username === event.target.value) {
          setClimberId(team.userId)
        }
      }
    }
  }

  return (
    <div className="container">
      <Header />
      <h2>Week 1</h2>
      <h3>Add a Climb</h3>

      {/* Captain Only - Select Climber */}
      <h4>Climber:</h4>
      <select value={climber} onChange={(event) => findClimberId(event)}>
      {teams.map((team) => (
        user.id === team.captainId ?
          <option>
            {team.username}
          </option>
      : null
      ))}
      </select>

      {/* Color Dropdown */}
      <h4>Color:</h4>
      <select  onChange={(event) => setColor(event.target.value)}>
        <option value="starter" selected>--Select a Color--</option>
        {colors.map(color => <option>{color}</option>)}
      </select>

      {/* Location in gym Dropdown */}
      <h4>Location:</h4>
      <select onChange={(event) => setLocation(event.target.value)}>
        <option value="starter" selected>--Select a Location--</option>
        {locations.map(location => <option>{location}</option>)}
      </select>

      {/* Difficulty Dropdown */}
      <h4>Difficulty:</h4>
      <select onChange={(event) => setDifficulty(event.target.value)}>
        <option value="starter" selected>--Select a Difficulty--</option>
        {difficulties.map(difficulty => <option>{difficulty}</option>)}
      </select>

      {/* Attempts clicker */}
      <h4>Attempts</h4>
      <div className="attemptsPicker">
        <RemoveIcon onClick={() => attempts > 0 ? setAttempts(attempts - 1) : setAttempts(attempts)}/>
        <p>{attempts}</p>
        <AddIcon onClick={() => setAttempts(attempts + 1)}/>
      </div>

      {/* Submit or Cancel */}
      <button onClick={handleAddClimb}>Submit!</button>
      <button onClick={() => history.push('/climb/session')}>Cancel</button>
    </div>
  );
}

export default AddClimb;
