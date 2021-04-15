import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Header from '../Header/Header'

import './AddClimb.css'

function AddClimb() {
  const history = useHistory();
  const dispatch = useDispatch();
  
  const [color, setColor] = useState('')
  const [location, setLocation] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [attempts, setAttempts] = useState(0)

  let colors = ['Black', 'Blue', 'Green', 'Red', 'White', 'Yellow']
  let locations = ['Left Barrel', 'Overhang', 'Right Barrel', 'Slab', 'Slight Overhang'] // can change this to live in the store eventually
  let difficulties = ['V0', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', 'V10', 'V11', 'V12']

  const handleAddClimb = () => {
    if(color !== '' && location !== '' && difficulty !== '' && attempts !== 0) {
      console.log(color, location, Number(difficulty.substring(1)), attempts);
      dispatch ({
        type: 'ADD_NEW_CLIMB',
        payload: {
          color: color,
          location: location,
          difficulty: difficulty.substring(1), // Removes the 'V' so we send only a number to the DB
          attempts: attempts
        },
        // onComplete: () => {
        //   history.push('/climb/session')
        // }
      })
      history.push('/climb/session')
    }
    else {
      alert('Please select all inputs')
    }
  }

  return (
    <div className="container">
      <Header />
      <h2>Week 1</h2>
      <h3>Add a Climb</h3>

      {/* Color Dropdown */}
      <h4>Color:</h4>
      <select onChange={(event) => setColor(event.target.value)}>
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
