import React, { useState, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from "./UploadAudit.module.css";
import LinearProgress from '@material-ui/core/LinearProgress';
import LinearDeterminate from './LinearDeterminate.js';
import { makeStyles, Button } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
const axios = require('axios');

const useStyles = makeStyles({
  plan: {
    width: "200px",
    height: "45px",
    margin: "15px",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "large",
    borderRadius: "4px",
    border: "none",
    boxShadow: "1px 2px 5px grey",
    backgroundColor: "rgb(233, 233, 233)",
    "&:hover": {
      // backgroundColor: "lightgray",
      transform: "scale(1.05)",
      cursor: "pointer"
    },
    "&:active, &:focus": {
      outline: "none",
      "&:active": {
        boxShadow: "none",
        border: "none",
      }
    }
  },
})

function DropZone() {
  const styleClasses = useStyles();

  const [progress, showProgress] = useState(false);
  const [finished, setfinished] = useState(false);
  const [navigate, setNavigate] = useState(false);

  const [fileName, setFileName] = useState('');
  
  const uploadFile = ({target: {files} }) => {
    var data = new FormData();
    var file = document.getElementById("audit").files[0];
    setFileName(file.name);
    data.append('email' , "jda3b5@umsystem.edu");
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
        // console.log(res.data.schedule);
        axios.post('http://localhost:8000/api/addSchedule', {
          email: sessionStorage.getItem('email'),
          schedule_name: 'Jda3b5 Schedule',
          schedule: res.data.schedule
        })
        .then((result) => {
          console.log("Finished adding schedule");
        })
        .catch(err => {
          alert("Please try again. Sections of your required for displaying data was missing.");
          setFileName("");
        });
        console.log(res.data)
        setfinished(true);
        showProgress(false);
        handleNavigate();
      } else {
        console.log(res.error);
      }
    })
    .catch(err => {
      console.log(err)
      alert("Please try again. Remember to upload your audit as an HTML form");
      setFileName("");
    });
  }

  const handleNavigate = () => {
    setTimeout(() => setNavigate(true), 2500);
  }

  const {getRootProps, getInputProps} = useDropzone({uploadFile})

  return (
    <>
    <div onChange={uploadFile}>
      <div {...getRootProps()} className={styles.dropArea}>
        <input {...getInputProps()} id="audit"  />
        <h2 className={styles.dropText}>CLICK HERE TO <span className={styles.browse}>BROWSE</span></h2>
      </div>
      <div className={styles.fileName}>{fileName}</div> 
      {
        fileName.length > 0 &&
        <div className={styles.progress}>
          {progress && <LinearProgress />}
          {finished && <LinearDeterminate/>}
        </div>
      }
    </div>
    {navigate && <Redirect to="/courseoutline" />}
    </>
    
  )

}

export default DropZone;