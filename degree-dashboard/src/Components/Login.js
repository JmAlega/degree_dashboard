// THIS COMPONENT IS JUST A PLACEHOLDER! PUT THE ACTUAL LOGIN COMPONENT HERE
import React from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const history = useHistory();
  const loginCorrect = true; 

  const checkCredentials = () => {
    if (loginCorrect == true) {
      sessionStorage.setItem('loggedIn', 'true');
      history.push('/');
    } else {
      console.log('Credentials are false!');
    }
  }

  return (
    <div className="App">
   
        LOGIN
        <button onClick={checkCredentials}> Log In! </button>
      
    </div>
  )
}

export default Login;