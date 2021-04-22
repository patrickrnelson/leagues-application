import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Header from '../Header/Header';
import boulderOne from '../Images/boulder1.png';
import boulderTwo from '../Images/boulder2.png';

const useStyles = makeStyles({
  btn: {
    height: 30,
    width: 100,
    fontSize: '12px',
  },
  btnCancel: {
    height: 30,
    width: 100,
    fontSize: '12px',
    color: '#ff1744',
  },
  buttons: {
    paddingTop: 30,
    paddingLeft: 35,
    paddingRight: 35,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'inline-flex',
  }
});

function ClimberProfileEdit() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(store => store.user)

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.username)
  const [phone, setPhone] = useState(user.phone)

  const handleProfileEdit = () => {
    if(name !== '' && email !== '' && phone !== '') {
      dispatch({
        type: 'EDIT_USER_PROFILE',
        payload: {
          name: name,
          username: email,
          phone: phone
        }
      })
      history.push('/climberProfile')
    }
    else {
      alert('No Blank Inputs, Please!')
    }
    
  } // end handleProfileEdit


  return (
    <>
    <div className="container-edit">
      <Header />

    <h2>Edit My Profile</h2>

      {/* Name Input */}
      <label for="nameEditInput">Name:</label>
      <TextField 
        type="text" 
        id="nameEditInput"
        minLength="2"
        required 
        value={name}
        inputProps={{min: 0, style: { textAlign: 'center' }}}
        onChange={(event) => setName(event.target.value)}
      />

      <br/>

      {/* Email Input */}
      <label for="emailEditInput">Email:</label>
      <TextField 
        type="email" 
        id="emailEditInput"
        minlength="3"
        maxlength="64"
        required
        value={email}
        inputProps={{min: 0, style: { textAlign: 'center' }}}
        onChange={(event) => setEmail(event.target.value)}
      />

      <br/>

      {/* Phone Input */}
      <label for="phoneEditInput">Phone:</label>
      <TextField 
        type="tel" 
        id="phoneEditInput" 
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        required
        value={phone}
        inputProps={{min: 0, style: { textAlign: 'center' }}}
        onChange={(event) => setPhone(event.target.value)}
      />

      <div className={classes.buttons}>
        <Button
          mt={1}
          variant="outlined"
          color="secondary"
          className={classes.btnCancel}
          style={{ border: '2px solid' }}
          onClick={() => history.push('/climberProfile')}>
          Cancel
        </Button>
      </div>
      <div className={classes.buttons}>
        <Button
          mt={1}
          variant="outlined"
          color="secondary"
          className={classes.btn}
          style={{ border: '2px solid' }}
          onClick={handleProfileEdit}>
          Save
        </Button>
      </div>
      <img className="edit-image-two" src = {boulderTwo} alt="boulder" height="150px"  />
      <img className="edit-image" src = {boulderOne} alt="boulder" height="150px"  />
      </div>
      </>
  );
}

export default ClimberProfileEdit;
