import React from 'react';
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';


function AdminTeams() {

  const [value, setValue] = React.useState('')

  const handleChange = (event) => {
    setValue(event.target.value)
  }
  return (
    <Grid
    container
    item
    xs={12}
    direction="column"
    justify="space-around"
    alignItems="center"
  >
    <Grid item xs={6}>
      <h1>Teams</h1>
    </Grid>
    <Grid>
      <FormControl>
        <InputLabel>Team List</InputLabel>
        <Select
          labelId='teams'
          id='teamList'
          value={value}
          onChange={handleChange}
        >
          <MenuItem value={'Team1'}>Team1</MenuItem>
          <MenuItem value={'Team2'}>Team2</MenuItem>
          <MenuItem value={'Team3'}>Team3</MenuItem>
          <MenuItem value={'Team4'}>Team4</MenuItem>
          <MenuItem value={'Team5'}>Team5</MenuItem>
        </Select>
      </FormControl>
      </Grid>
  </Grid>
  );
}


export default AdminTeams;