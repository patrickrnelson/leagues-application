import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  table: {
    minWidth: 650,
  },
}));

function adminTotal(week, score) {
  return { week, score};
}

const weeks = [
  adminTotal(1, 2, 3, 4, 5, 6, 7)
];

function createData(climber, color, location, difficulty, score, attempts, date) {
  return { climber, color, location, difficulty, score, attempts, date};
}

const rows = [
  createData('Alvin', 'Red', 'Slab', 4, 3, 5, 4),
  createData('John', 'Green', 'Overhang', 5, 6, 7, 4),
  createData('Patrick', 'Blue', 'Left Barrel', 6, 7, 8, 4),
  createData('Zack', 'Yellow', 'Slab', 7, 8, 9, 4),
  createData('Johnny', 'Orange', 'Overhang', 3, 4, 1, 4),
];

function AdminTeams() {
  const classes = useStyles();

  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
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
            labelId="teams"
            id="teamList"
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Week</TableCell>
              <TableCell>1</TableCell>
              <TableCell>2</TableCell>
              <TableCell>3</TableCell>
              <TableCell>4</TableCell>
              <TableCell>5</TableCell>
              <TableCell>6</TableCell>
              <TableCell>7</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Score</TableCell>
              <TableCell>45</TableCell>
              <TableCell>45</TableCell>
              <TableCell>45</TableCell>
              <TableCell>45</TableCell>
              <TableCell>45</TableCell>
              <TableCell>45</TableCell>
              <TableCell>45</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow> */}
              {/* <TableCell></TableCell> */}
              {/* <TableCell align="right">Week</TableCell>
              <TableCell align="right">1</TableCell>
              <TableCell align="right">2</TableCell>
              <TableCell align="right">3</TableCell>
              <TableCell align="right">4</TableCell>
              <TableCell align="right">5</TableCell>
              <TableCell align="right">6</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}> */}
                {/* <TableCell></TableCell> */}
                {/* <TableCell align="right">{row.climber}</TableCell>
                <TableCell align="right">{row.color}</TableCell>
                <TableCell align="right">{row.location}</TableCell>
                <TableCell align="right">{row.difficulty}</TableCell>
                <TableCell align="right">{row.score}</TableCell>
                <TableCell align="right">{row.attempts}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}

      <br></br>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* <TableCell></TableCell> */}
              <TableCell align="right">Climber</TableCell>
              <TableCell align="right">Color</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Difficulty</TableCell>
              <TableCell align="right">Score</TableCell>
              <TableCell align="right">Attempts</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                {/* <TableCell></TableCell> */}
                <TableCell align="right">{row.climber}</TableCell>
                <TableCell align="right">{row.color}</TableCell>
                <TableCell align="right">{row.location}</TableCell>
                <TableCell align="right">{row.difficulty}</TableCell>
                <TableCell align="right">{row.score}</TableCell>
                <TableCell align="right">{row.attempts}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      
    </Grid>
  );
}

export default AdminTeams;
