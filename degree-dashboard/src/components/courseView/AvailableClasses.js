import React from 'react';
import './AvailableClasses.css';
// import { Link } from 'react-router-dom'

function AvailableClasses ({prof, avail}) {
  return (
    <div className="classes">
      <section className="profInfo">
        <h3 className="professorName">{prof}</h3>
        <p className="classAvailability">{avail}</p>
      </section>

      <section className="buttons">
        {/* <Link to=""> */}
          <button className="reviewButton">Teacher Reviews</button>
        {/* </Link> */}

        {/* <Link to=""> */}
          <button className="addButton">Add to Schedule</button>
        {/* </Link> */}
      </section>
    </div>
  )
}

export default AvailableClasses;