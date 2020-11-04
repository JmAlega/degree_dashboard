import React from 'react';
import styles from "./UploadDegree.module.css"
import { Link } from 'react-router-dom'

function UploadDegree () {
  return (
    <div className={styles.uploadPage}>
      <Link to='/upload-audit'>
        <button className={styles.upload}>Upload Audit</button>
      </Link>

      {/* <Link to=""> */}
        <button className={styles.plan}>Plan Degree</button>
      {/* </Link> */}
    </div>
  )
}

export default UploadDegree;