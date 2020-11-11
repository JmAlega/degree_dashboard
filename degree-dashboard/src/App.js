import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Index from './Components/Index';
import Activation from './Components/Activation';
import CourseView from './Components/courseView/CourseView.js'
import UploadDegree from './Components/uploadDegree/UploadDegree.js'
import UploadAudit from './Components/uploadDegree/UploadAudit.js'
import SemesterPlan from './Components/courseoutline/semesterPlan.js'
import ChooseCourse from './Components/courseoutline/ChooseCourse';

function App() {
  if (sessionStorage.getItem('loggedIn') == null) {
    sessionStorage.setItem('loggedIn', 'false');
  }

	const schedule = [
    { 
		  semester: 'Spring 2021',
      courses: [ 
        {'title': 'FR ENG 1100', 'description': 'Study And Careers in Engineering and Computing'},
        {'title': 'CS 1500', 'description': 'Computational Problem Solving'},
        {'title': 'MATH 1214', 'description': 'Calculus For Engineers I'},
        {'title': 'ENGLISH 1120', 'description': 'Exposition And Argumentation'},
        {'title': 'GEO 1120', 'description': 'Evolution Of The Earth'},
        {'title': 'Add Course', 'description': ''},
      ]
    },
    { 
      semester: 'Fall 2021',
      courses: [ 
        {'title': 'CS 1200', 'description': 'Discrete Mathematics for Computer Science'},
        {'title': 'CS 1570', 'description': 'Introduction To C++ Programming'},
        {'title': 'CS 1580', 'description': 'Introduction To Programming Laboratory'},
        {'title': 'MATH 1215', 'description': 'Calculus For Engineers II'},
        {'title': 'Add Course', 'description': ''},
		  ]
    },
		{ 
      semester: 'Spring 2022',
      courses: [ {'title': 'Add Course', 'description': ''},]
    },
    { 
      semester: 'Fall 2022',
      courses: [ {'title': 'Add Course', 'description': ''},]
    }]

  
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

        {/* Course View */}
        <ProtectedRoute path='/upload-audit-first-time' component={UploadAudit} />

        {/* Course View */}
        <ProtectedRoute path='/upload-audit' component={UploadDegree} />

        {/* Dashboard */}
        <ProtectedRoute path='/dashboard' component={Dashboard} />

        {/* Course View */}
        <ProtectedRoute path='/course-view' component={() => 
          <CourseView 
            subject="COMP SCI"
            number="4610" 
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
              ]} 
            />}
          />
		
        <ProtectedRoute path='/courseoutline' component={() =>
          <SemesterPlan
            schedule_array={schedule}
          />}
        />


    {/* Choose Course */}
    <ProtectedRoute path='/choose-course' component={() => <ChooseCourse/>} />

      </Switch>

    </Router>
  );
}

export default App;
