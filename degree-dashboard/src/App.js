import React from 'react';
import './App.css';
import CourseView from './components/courseView/CourseView.js'
import UploadDegree from './components/uploadDegree/UploadDegree.js'

function App() {

  // placeholder array showing the format
  const classes = [
        { 
          prof: 'Markowsky', 
          avail: 'MWF 11-2'
        },
        { 
          prof: 'Morales', 
          avail: 'MWF 1-2'
        },
        { 
          prof: 'Price', 
          avail: 'T TH 10-11'
        }]

  return (
    <div className="App">
      {/* <CourseView courseName="CS 1200 Discrete Math for Computer Science" 
                  desc="This is a description" 
                  pre="These are prerequisites" 
                  reqFor="These are classes this course is required for"
                  req="Is this class required for your major"
                  class_array={classes}
      /> */}

      <UploadDegree />
    </div>
  );
}

export default App;
