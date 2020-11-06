import React from 'react';

import SemesterPlan from './semesterPlan.js'

function App() {
 // placeholder array showing the format
  const schedule = [
        { 
		  semester: 'Spring 2021',
          courses: [ 
        {'title': 'FR ENG 1100', 'description': 'Study And Careers in Engineering and Computing'},
			{'title': 'CS 1500', 'description': 'Computational Problem Solving'},
			{'title': 'MATH 1214', 'description': 'Calculus For Engineers I'},
			{'title': 'ENGLISH 1120', 'description': 'Exposition And Argumentation'},
			{'title': 'GEO 1120', 'description': 'Evolution Of The Earth'},
		  ]
        },
        { 
          semester: 'Fall 2021',
          courses: [ 
        {'title': 'CS 1200', 'description': 'Discrete Mathematics for Computer Science'},
			{'title': 'CS 1570', 'description': 'Introduction To C++ Programming'},
			{'title': 'CS 1580', 'description': 'Introduction To Programming Laboratory'},
			{'title': 'MATH 1215', 'description': 'Calculus For Engineers II'},
		  ]
        },
		{ 
          semester: 'Spring 2022',
          courses: [ ]
        },
		{ 
          semester: 'Fall 2022',
          courses: [ ]
        }]
		//change to course dictionary

  return (
    <div className="App">
      <SemesterPlan schedule_array={schedule}/>
    </div>
  );
}

export default App;
