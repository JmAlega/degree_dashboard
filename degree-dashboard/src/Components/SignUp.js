// THIS COMPONENT IS JUST A PLACEHOLDER! PUT THE ACTUAL SIGNUP COMPONENT HERE
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import miner from './images/miner.png';
import { useHistory } from 'react-router-dom';
const axios = require('axios');


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


export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[firstName, setFirstName] = useState('');
  const[lastName, setLastName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8000/api/createUser',{
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName
    })
    .then((res) =>{
      if (res.status === 200) {
        console.log('User Signed Up Successfully');
        sendEmail(email);
        history.push('/login')
      } else {
        console.log(res.error);
      }
    })
    .catch(err=>{
      console.log(err);
    });
  }

  const sendEmail = (studentEmail) => {
    axios.post('http://localhost:8000/api/sendEmail',{
      email: studentEmail
    })
    .then((res) => {
      if(res.status === 200) {
        console.log('Email sent successfully');
      } else {
        console.log(res.error);
      }
    }) 
    .catch(err =>{
      console.log(err);
    });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
          <img src={miner} style={{width: 60, height:60}}/>
        <Typography component="h1" variant="h5" >
          Sign Up
        </Typography>
        <form className={classes.form} noValidate onSubmit ={handleSubmit} > 
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
            onInput={e => setEmail(e.target.value)}
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
            onInput={e => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="First Name"
            label="First Name"
            name="First Name"
            autoComplete="First Name"
            onInput={e => setFirstName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Last Name"
            label="Last Name"
            name="Last Name"
            type="password"
            autoComplete="Last Name"
            onInput={e => setLastName(e.target.value)}
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
            <center><Link to='/login'> ALREADY HAVE AN ACCOUNT? CLICK HERE TO LOGIN </Link> </center>
          </h6>
        </form>
      </div>
    </Container>
  );
}
