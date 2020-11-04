import React from 'react';
import styles from "./CourseInfo.module.css"

function CourseInfo ({desc, pre, reqFor, req}) {
  return (
    <div className={styles.courseInfoContainer}>
      <div className={styles.descriptors}>
        <h3 className={styles.descriptorTitle}>Description: </h3>
        <section className={styles.descriptorBox}>
          <p className={styles.information}>{desc}</p>
        </section>
      </div>

      <div className={styles.descriptors}>
        <h3 className={styles.descriptorTitle}>Prerequisites: </h3>
        <section className={styles.descriptorBox}>
          <p className={styles.information}>{pre}</p>
        </section>
      </div>

      <div className={styles.descriptors}>
        <h3 className={styles.descriptorTitle}>Required For: </h3>
        <section className={styles.descriptorBox}>
          <p className={styles.information}>{reqFor}</p>
        </section>
      </div>

      <div className={styles.descriptors}>
        <h3 className={styles.descriptorTitle}>Required: </h3>
        <section className={styles.descriptorBox}>
          <p className={styles.information}>{req}</p>
        </section>
      </div>
    </div>
  )
}

export default CourseInfo

// 
// 