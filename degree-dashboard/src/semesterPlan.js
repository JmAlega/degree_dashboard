import React, { useState } from 'react';
import CurrentClasses from './CurrentClasses';
import './semesterPlan.css';

function SemesterPlan (props) {

  const [schedule] = useState(props.schedule_array);
  
   return (
   <div className="semesterViewPg">
      <h1>{"Tentative Course Outline"}
	  <br />
	  {"Note: This is not a guarantee of any enrollment"}
	  </h1>
	   
    <div className="sections">


	<div className="addSem">
	<button className="addButton">{"Add Semester"}</button>
	</div>

        {schedule.map(available_classes => (
		<section className="currentClasses">
			<h2>{available_classes.semester}</h2>
          <CurrentClasses title={available_classes.title} semester={available_classes.semester} description={available_classes.description}/>
		  </section>
        ))}

    </div>
    </div>
  )
  

  
}
export default SemesterPlan;