import React from 'react';
import styles from "./UploadDegree.module.css"
import { Link } from 'react-router-dom'
import Header from "../Header.js"

function UploadDegree () {
  return (
    <div>
      <Header />
      <div className={styles.uploadPage}>
        <Link to='/upload-audit'>
          <button className={styles.upload}>Upload Audit</button>
        </Link>

        {/* <Link to=""> */}
          <button className={styles.plan}>Plan Degree</button>
        {/* </Link> */}
      </div>
    </div>
  )
}

export default UploadDegree;