import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';

import Dashboard from './Components/Dashboard';
import CourseView from './Components/CourseView';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Index from './Components/Index';
import Activation from './Components/Activation';


function App() {
  if (sessionStorage.getItem('loggedIn') == null) {
    sessionStorage.setItem('loggedIn', 'false');
  }

  
  return (
    <Router>
      <Switch>
        {
        /*
          Public Routes
        */
        }

        <Route path='/login' component={Login} />
        <Route path='/sign-up' component={SignUp} />
        <Route path='/activation' component={Activation} />
        {
        /* 
          Private Routes
        */
        }

        {/* Main Page */}
        <ProtectedRoute exact path='/' component={Index} />

        {/* Dashboard */}
        <ProtectedRoute path='/dashboard' component={Dashboard} />

        {/* Course View */}
        <ProtectedRoute path='/course-view' component={CourseView} />
      </Switch>

    </Router>
  );
}

export default App;
