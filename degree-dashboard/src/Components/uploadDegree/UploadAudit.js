import React, {useState, useEffect} from 'react';
import styles from "./UploadAudit.module.css"
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
        </div>
      </div>
    </div>
  )
}

export default UploadAudit;

