import React from 'react';
import './App.css';
import CourseView from './components/courseView/CourseView.js'

function App() {
  return (
    <div className="App">
      <CourseView courseName="CS 1200 Discrete Math for Computer Science" 
                  desc="This is a description" 
                  pre="These are prerequisites" 
                  reqFor="These are classes this course is required for"
                  req="Is this class required for your major"
      />
    </div>
  );
}

export default App;
