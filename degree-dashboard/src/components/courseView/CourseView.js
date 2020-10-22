import React from 'react';
import AvailableClasses from './AvailableClasses'
import CourseInfo from './CourseInfo'
import './CourseView.css';

function CourseView (props) {
  return (
    <div className="courseViewPage">
      <h1>{props.courseName}</h1>
    <div className="sections">

      <section className="info">

        <CourseInfo desc={props.desc} 
                    pre={props.pre}
                    reqFor={props.reqFor}
                    req={props.req}
        />
      </section>

      <section className="availableClasses">
        <h2>Available Classes: </h2>

        <AvailableClasses prof="Markowski" avail="MWF 11-12"/>
        <AvailableClasses prof="Morales" avail="MWF 2-3"/>
        <AvailableClasses prof="Price" avail="MWF 8-9"/>

      </section>

    </div>
    </div>
  )
}

export default CourseView;