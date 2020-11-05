import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Index from './Components/Index';
import CourseView from './Components/courseView/CourseView.js'
import UploadDegree from './Components/uploadDegree/UploadDegree.js'
import UploadAudit from './Components/uploadDegree/UploadAudit.js'


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

        {
        /* 
          Private Routes
        */
        }

        {/* Main Page */}
        <ProtectedRoute exact path='/' component={Index} />

        {/* Course View */}
        <ProtectedRoute path='/upload-audit-first-time' component={UploadDegree} />

        {/* Course View */}
        <ProtectedRoute path='/upload-audit' component={UploadAudit} />

        {/* Dashboard */}
        <ProtectedRoute path='/dashboard' component={Dashboard} />

        {/* Course View */}
        <ProtectedRoute path='/course-view' component={() => <CourseView 
                                            courseName="CS 1200" 
                                            desc="This is a description" 
                                            pre="These are prerequisites" 
                                            reqFor="These are classes this class is required for"
                                            req="Is this class required for your major" 
                                            class_array={
                                              [
                                                { 
                                                  avail: "MWF 11-2", 
                                                  prof: "Morales"
                                                }, 
                                                { 
                                                  avail: "MWF 2-3", 
                                                  prof: "Price"
                                                },
                                                { 
                                                  avail: "TTH 11-12:30", 
                                                  prof: "Markowski"
                                                },
                                              ]} />} />


      </Switch>

    </Router>
  );
}

export default App;
