import React, {useState, useEffect} from 'react';
import styles from "./UploadAudit.module.css"
import LinearDeterminate from "./LinearDeterminate.js"
import DropZone from "./DropZone.js"
import Header from "../Header.js"
const axios = require('axios');


function UploadAudit () {

  

  return (
    <div>
      <Header />
      <div className={styles.uploadAuditPage}>
        <div className={styles.box}>
          <h2 className={styles.title}>Upload Audit</h2>

          {/* <input type="file" id="audit" onChange={uploadFile} /> */}
          
          <DropZone/>

          <div className={styles.progress}>
            {/* <LinearDeterminate percent={percent}/> */}
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default UploadAudit;

