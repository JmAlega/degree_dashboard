import React from 'react';
import './CourseInfo.css';

function CourseInfo ({desc, pre, reqFor, req}) {
  return (
    <>
      <div className="descriptors">
        <h3>Description: </h3>
        <section className="descriptor_info">
          <p>{desc}</p>
        </section>
      </div>

      <div className="descriptors">
        <h3>Prerequisites: </h3>
        <section className="descriptor_info">
          <p>{pre}</p>
        </section>
      </div>

      <div className="descriptors">
        <h3>Required For: </h3>
        <section className="descriptor_info">
          <p>{reqFor}</p>
        </section>
      </div>

      <div className="descriptors">
        <h3>Required: </h3>
        <section className="descriptor_info">
          <p>{req}</p>
        </section>
      </div>
    </>
  )
}

export default CourseInfo