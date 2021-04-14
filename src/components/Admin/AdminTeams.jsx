import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
// });


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  },
  table: {
    minWidth: 650,
  }
}))

function AdminTeams() {

  const classes = useStyles()

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
      <FormControl className={classes.formControl}>
        <InputLabel>Team List</InputLabel>
        <Select
          labelId='teams'
          id='teamList'
          value={value}
          onChange={handleChange}
        >
          <MenuItem value={'League1'}>Fall League 2020</MenuItem>
          <MenuItem value={'League2'}>Spring League 2021</MenuItem>
          <MenuItem value={'League3'}>Fall League 2021</MenuItem>
          <MenuItem value={'Team4'}>Team4</MenuItem>
          <MenuItem value={'Team5'}>Team5</MenuItem>
        </Select>
      </FormControl>
      </Grid>
      {/* <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow></TableRow>
        </TableHead>
      </Table>
      </TableContainer> */}
      <table>
  <tr>
    <th>Climber</th>
    <th>Color</th>
    <th>Location</th>
    <th>Difficulty</th>
    <th>Score</th>
    <th>Attempts</th>
    <th>Dates</th>
  </tr>
  <tr>
    <td>Jill</td>
    <td>Red</td>
    <td>Slab</td>
    <td>V6</td>
    <td>8</td>
    <td>2</td>
    <td>4/14/2021</td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  
</table>
      
  </Grid>
 
  );
}


export default AdminTeams;