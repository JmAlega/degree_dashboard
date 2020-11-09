import React from 'react';
import styles from "./UploadDegree.module.css"
import { Link } from 'react-router-dom'
import Header from "../Header.js"
import { makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles({
  // body: {
  //   margin: "0",
  //   padding: "0",
  // },

  uploadPage: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    height: "85vh",
    alignItems: "center",
    justifyContent: "center",
  },
  
  upload: {
    width: "200px",
    height: "45px",
    marginBottom: "30px",
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "rgb(0, 153, 0)",
    fontSize: "large",
    borderRadius: "4px",
    border: "none",
    boxShadow: "1px 2px 5px grey",
    "&:hover": {
      backgroundColor: "rgb(0, 153, 0)",
      transform: "scale(1.05)",
      cursor: "pointer",
    },
    "&:active, &:focus": {
      outline: "none",
      "&:active": {
        boxShadow: "none",
        border: "none",
      }
    }
  },
  
  plan: {
    width: "200px",
    height: "45px",
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

function UploadDegree () {
  const styleClasses = useStyles();

  return (
    <div>
      <Header />
      <div className={styleClasses.uploadPage}>
        <Link to='/upload-audit-first-time'>
          <Button className={styleClasses.upload}>Upload Audit</Button>
        </Link>

        <Link to="/dashboard">
          <Button className={styleClasses.plan}>Plan Degree</Button>
        </Link>
      </div>
    </div>
  )
}

export default UploadDegree;