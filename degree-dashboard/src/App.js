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

  const scheduleJA = [
    {
      semester: 'Fall 2017',
      courses: [
        {'title': 'CHEM 110', 'description': 'Intro/Lab Safety&Haz Mtr'},
        {'title': 'COMP SCI 1010', 'description': 'Intro / Computer Science'},
        {'title': 'COMP SCI 1570', 'description': 'Intro To Programming'},
        {'title': 'COMP SCI 1580', 'description': 'Intro To Programming Lab'},
        {'title': 'ECON 1200', 'description': 'Prin Of Macroeconomics'},
        {'title': 'HISTORY 1200', 'description': 'Mod Western Civilization'},
        {'title': 'MATH 1215', 'description': 'Calc For Engrs II'},
      ]
    }, 
    {
      semester: 'Spring 2018',
      courses: [
        {'title': 'COMP SCI 1200', 'description': 'Discrete Math For Cmp Sc'},
        {'title': 'COMP SCI 1575', 'description': 'Data Structures'},
        {'title': 'COMP SCI 1585', 'description': 'Data Structures Lab'},
        {'title': 'ENGLISH 1160', 'description': 'Writing And Research'},
        {'title': 'MATH 2222', 'description': 'Calc with Analy Geom III'},
        {'title': 'SP&M S 1185', 'description': 'Principles Of Speech'},
      ]
    },
    {
      semester: 'Fall 2018',
      courses: [
        {'title': 'COMP SCI 2200', 'description': 'Theory of Computer Science'},
        {'title': 'COMP SCI 2500', 'description': 'Algorithms'},
        {'title': 'MATH 3304', 'description': 'Elem Differen Equations'},
        {'title': 'MUSIC 1150', 'description': 'Mus Undrstandng & Apprec'},
        {'title': 'PHYSICS 1135', 'description': 'Engineering Physics I'},
      ]
    },
    {
      semester: 'Spring 2019',
      courses: [
        {'title': 'COMP SCI 2300', 'description': 'File Struc Intro Databas'},
        {'title': 'COMP SCI 3500', 'description': 'Prog Lang & Translators'},
        {'title': 'ENGLISH 1222', 'description': 'Amer Lit: 1865 To Pres'},
        {'title': 'MATH 3108', 'description': 'Linear Algebra I'},
        {'title': 'PHILOS 3235', 'description': 'Business Ethics'},
      ]
    },
    {
      semester: 'Fall 2019',
      courses: [
        {'title': 'COMP ENG 2210', 'description': 'Intro to Digital Logic'},
        {'title': 'COMP SCI 3100', 'description': 'Software Engineering I'},
        {'title': 'COMP SCI 5001', 'description': 'Special Topics'},
        {'title': 'COMP SCI 5400', 'description': 'Introduction to Artificial In'},
        {'title': 'PHYSICS 2135', 'description': 'Classical Physics II'},
      ]
    },
    {
      semester: 'Spring 2020',
      courses: [
        {'title': 'COMP ENG 3150', 'description': 'Intro Micro Embed Design'},
        {'title': 'COMP SCI 4610', 'description': 'Intro Computer Security'},
        {'title': 'MATH 5107', 'description': 'Combinatorics&Graph Thry'},
        {'title': 'PHYSICS 1505', 'description': 'Introductory Astronomy'},
        {'title': 'PHYSICS 1509', 'description': 'Astronomy Laboratory'},
      ]
    },
    {
      semester: 'Fall 2020',
      courses: [
        {'title': 'COMP SCI 3800', 'description': 'Intro To Operating Syst'},
        {'title': 'COMP SCI 4096', 'description': 'Software Syst Developmnt'},
        {'title': 'COMP SCI 5300', 'description': 'Database Systems'},
        {'title': 'STAT 3113', 'description': 'Applied Engineering Stat'},
      ]
    },
    {
      semester: 'Spring 2021',
      courses: [{'title': 'Add Course', 'description': ''},]
    },
    {
      semester: 'Fall 2021',
      courses: [{'title': 'Add Course', 'description': ''},]
    }

  ]

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

        {/* Course View
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
          /> */}
		
        <ProtectedRoute path='/courseoutline' component={() =>
          <SemesterPlan
            schedule_array={scheduleJA}
          />}
        />


      {/* Choose Course */}
      <ProtectedRoute path='/choose-course' component={() => <ChooseCourse/>} />

      </Switch>
      

    </Router>
  );
}

export default App;
