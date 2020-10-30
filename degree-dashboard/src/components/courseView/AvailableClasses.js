import React from 'react';
import styles from "./AvailableClasses.module.css"
// import { Link } from 'react-router-dom'

function AvailableClasses ({prof, avail}) {
  return (
    <div className={styles.classes}>
      <section className={styles.profInfo}>
        <h3 className={styles.professorName}>{prof}</h3>
        <p className={styles.classAvailability}>{avail}</p>
      </section>

      <section className={styles.buttons}>
        {/* <Link to=""> */}
          <button className={styles.reviewButton}>Teacher Reviews</button>
        {/* </Link> */}

        {/* <Link to=""> */}
          <button className={styles.addButton}>Add to Schedule</button>
        {/* </Link> */}
      </section>
    </div>
  )
}

export default AvailableClasses;