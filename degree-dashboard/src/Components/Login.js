// THIS COMPONENT IS JUST A PLACEHOLDER! PUT THE ACTUAL LOGIN COMPONENT HERE
import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import miner from './images/miner.png';
import { Link } from 'react-router-dom';

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

export default function Login() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
          <img src={miner} style={{width: 60, height:60}}/>
        <Typography component="h1" variant="h5" >
          Login
        </Typography>
        <form className={classes.form} noValidate > 
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            style={{backgroundColor: 'green', color: 'white'}}
          >
            SUBMIT
          </Button>
          <h6>
             <Link to='/sign-up'> DON'T HAVE AN ACCOUNT? CLICK HERE TO SIGN UP </Link>
          </h6>
        </form>
      </div>
    </Container>
  );
}

// const Login = () => {
//   const history = useHistory();
//   const loginCorrect = true; 

//   const checkCredentials = () => {
//     if (loginCorrect == true) {
//       sessionStorage.setItem('loggedIn', 'true');
//       history.push('/');
//     } else {
//       console.log('Credentials are false!');
//     }
//   }

//   return (
//     <div className="App">
//       <header className="App-header">
//         LOGIN
//         <button onClick={checkCredentials}> Log In! </button>
//       </header>
//     </div>
//   )
// }

// export default Login;