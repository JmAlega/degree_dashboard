import React from 'react';
import './CourseInfo.css';

function CourseInfo ({desc, pre, reqFor, req}) {
  return (
    <div className="courseInfoContainer">
      <div className="descriptors">
        <h3 className="descriptorTitle">Description: </h3>
        <section className="descriptorBox">
          <p className="information">{desc}</p>
        </section>
      </div>

      <div className="descriptors">
        <h3 className="descriptorTitle">Prerequisites: </h3>
        <section className="descriptorBox">
          <p className="information">{pre}</p>
        </section>
      </div>

      <div className="descriptors">
        <h3 className="descriptorTitle">Required For: </h3>
        <section className="descriptorBox">
          <p className="information">{reqFor}</p>
        </section>
      </div>

      <div className="descriptors">
        <h3 className="descriptorTitle">Required: </h3>
        <section className="descriptorBox">
          <p className="information">{req}</p>
        </section>
      </div>
    </div>
  )
}

export default CourseInfo