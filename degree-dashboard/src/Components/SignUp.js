// THIS COMPONENT IS JUST A PLACEHOLDER! PUT THE ACTUAL SIGNUP COMPONENT HERE
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import miner from './images/miner.png';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'green',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SendData() {

}

export default function SignUp() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
          <img src={miner} style={{width: 60, height:60}}/>
        <Typography component="h1" variant="h5" >
          Sign Up
        </Typography>
        <form className={classes.form} noValidate > 
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="First Name"
            label="First Name"
            name="First Name"
            autoComplete="First Name"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Last Name"
            label="Last Name"
            name="Last Name"
            autoComplete="Last Name"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="password"
            name="password"
            autoComplete="password"
            autoFocus
          />
          <Link to='/activation'>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            style={{backgroundColor: 'green', color: 'white'}} 
          >
            SUBMIT
          </Button>
          </Link>
          <h6>
            <center><Link to='/login'> ALREADY HAVE AN ACCOUNT? CLICK HERE TO LOGIN </Link> </center>
          </h6>
        </form>
      </div>
    </Container>
  );
}
