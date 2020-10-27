import React from 'react';
import './CurrentClasses.css';

function CurrentClasses ({title, semester, description}) {
 
  var buttonDescriptions = new Array(5);
  var i;
  for(i = 0; i < title.length; i++)
  {
	  buttonDescriptions[i] = <div>
								{title[i]}
								<br />
								<br />
								{description[i]}
								</div>
  }
  if(title.length < 5)
  {
	for(i = title.length; i < 5; i++)
		buttonDescriptions[i] = <div>
								Choose Courses
								<br />
								<br />
								Click to view all options
								</div>
  }
  return (
    <div className="classes">
      <section className="buttons">
			<button className="courseButton">{buttonDescriptions[0]}</button>
      </section>
	  <section className="buttons">
			<button className="courseButton">{buttonDescriptions[1]}</button>
      </section>
	  <section className="buttons">
			<button className="courseButton">{buttonDescriptions[2]}</button>
      </section>
	  <section className="buttons">
			<button className="courseButton">{buttonDescriptions[3]}</button>
      </section>
	  <section className="buttons">
			<button className="courseButton">{buttonDescriptions[4]}</button>
      </section>

    </div>
  )
}

export default CurrentClasses;