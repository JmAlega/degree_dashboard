import React from 'react';
import './App.css';
import SemesterPlan from './semesterPlan.js'

function App() {
 // placeholder array showing the format
  const schedule = [
        { 
		  semester: 'Spring 2021',
          title: ['FR ENG 1100', 'CS 1500', 'MATH 1214', 'ENGLISH 1120', 'GEO 1120'],
		  description: ['Study And Careers In Engineering and Computing', 'Computational Problem Solving', 'Calculus For Engineers I', 'Exposition And Argumentation', 'Evolution Of The Earth']
		  
        },
        { 
          semester: 'Fall 2021',
          title: ['CS 1200', 'CS 1570', 'CS 1580', 'MATH 1215'],
		  description: ['Discrete Mathematics for Computer Science', 'Introduction To C++ Programming', 'Introduction To Programming Laboratory ', 'Calculus For Engineers II']
        }]
		

  return (
    <div className="App">
      <SemesterPlan schedule_array={schedule}/>
    </div>
  );
}

export default App;
