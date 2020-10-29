import React, { useState } from 'react';
import AvailableClasses from './AvailableClasses'
import CourseInfo from './CourseInfo'
import './CourseView.css';

function CourseView (props) {

  const [classes] = useState(props.class_array);

  return (
    <div className="courseViewPage">
      <h1 className="title">{props.courseName}</h1>
    <div className="sections">

      <section className="info">

        <CourseInfo desc={props.desc} 
                    pre={props.pre}
                    reqFor={props.reqFor}
                    req={props.req}
        />
      </section>

      <section className="availableClasses">
        <h2 className="availableClassesTitle">Available Classes: </h2>

        {classes.map(available_classes => (
          <AvailableClasses prof={available_classes.prof} avail={available_classes.avail}/>
        ))}

      </section>

    </div>
    </div>
  )
}

export default CourseView;