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

function Validate() {

}

export default function Activation() {
  const classes = useStyles();
  const history = useHistory();
  const[code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8000/api/loginUser',{
      code: code,
    })
    .then((res) =>{
      if (res.status === 200) {
        console.log('User Activated Successfully');
        history.push('/')
      } else {
        console.log(res.error);
      }
    })
    .catch(err=>{
      console.log(err);
    });
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
          <img src={miner} style={{width: 60, height:60}}/>
        <Typography component="h1" variant="h5" >
          Enter Activation Code
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit} > 
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="activation"
            label="Activation Code"
            name="activation"
            autoComplete="activation"
            autoFocus
            onInput={e => setCode(e.target.value)}
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
        </form>
      </div>
    </Container>
  );
}
