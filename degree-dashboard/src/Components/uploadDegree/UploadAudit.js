import React from 'react';
import styles from "./UploadAudit.module.css"
import LinearDeterminate from "./LinearDeterminate.js"
import DropZone from "./DropZone.js"
import Header from "../Header.js"


function UploadAudit () {
  return (
    <div>
      <Header />
      <div className={styles.uploadAuditPage}>
        <div className={styles.box}>
          <h2 className={styles.title}>Upload Audit</h2>
          
          <DropZone/>

          <div className={styles.progress}>
            <LinearDeterminate/>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default UploadAudit;

