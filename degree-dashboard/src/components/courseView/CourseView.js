import React, { useState } from 'react';
import AvailableClasses from './AvailableClasses'
import CourseInfo from './CourseInfo'
import styles from "./CourseView.module.css"

function CourseView (props) {

  const [classes] = useState(props.class_array);

  return (
    <div className={styles.courseViewPage}>
      <h1 className={styles.title}>{props.courseName}</h1>
    <div className={styles.sections}>

      <section className={styles.info}>

        <CourseInfo desc={props.desc} 
                    pre={props.pre}
                    reqFor={props.reqFor}
                    req={props.req}
        />
      </section>

      <section className={styles.availableClasses}>
        <h2 className={styles.availableClassesTitle}>Available Classes: </h2>

        {classes.map(available_classes => (
          <AvailableClasses prof={available_classes.prof} avail={available_classes.avail}/>
        ))}

      </section>

    </div>
    </div>
  )
}

export default CourseView;