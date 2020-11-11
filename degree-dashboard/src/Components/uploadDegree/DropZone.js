import React, { useState, useEffect, useRef } from 'react'
import { useDropzone } from 'react-dropzone'
import styles from "./UploadAudit.module.css"
import LinearProgress from '@material-ui/core/LinearProgress';
import LinearDeterminate from './LinearDeterminate.js'
const axios = require('axios');

function DropZone() {

  const [progress, showProgress] = useState(false);
  const [finished, setfinished] = useState(false);

  const [fileName, setFileName] = useState('');
  
  const uploadFile = ({target: {files} }) => {
    var data = new FormData();
    var file = document.getElementById("audit").files[0];
    setFileName(file.name);
    data.append('email' , "userEmail@umsystm.edu");
    data.append('audit', file)
    handleSubmit(data);
  }

  const handleSubmit = (data) => {
    axios.post('http://localhost:8000/api/uploadAudit', data, {
      onUploadProgress: (progressEvent) => {
        let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`${percentCompleted}`);
        showProgress(true);
      }})
    .then((res) => {
      if (res.status == 200) {
        console.log(res.data)
        setfinished(true);
        showProgress(false);
      } else {
        console.log(res.error);
      }
    })
    .catch(err => {
      console.log(err)
    });
  }

  const {getRootProps, getInputProps} = useDropzone({uploadFile})

  return (
    <div onChange={uploadFile}>
      <div {...getRootProps()} className={styles.dropArea}>
        <input {...getInputProps()} id="audit"  />
        <h2 className={styles.dropText}>CLICK HERE TO <span className={styles.browse}>BROWSE</span></h2>
      </div>
      <div className={styles.fileName}>{fileName}</div>
      <div className={styles.progress}>
        {progress && <LinearProgress />}
        {finished && <LinearDeterminate/>}
      </div>
    </div>
    
  )

}

export default DropZone;