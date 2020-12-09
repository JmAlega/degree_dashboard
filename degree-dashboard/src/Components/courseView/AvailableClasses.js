import React from 'react';
import styles from "./AvailableClasses.module.css"
import { makeStyles, Paper, Card, CardContent, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
// import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  button: {
    backgroundColor: "white",
    borderRadius: "4px",
    border: "none",
    boxShadow: "1px 2px 3px grey",
    margin: "10px",
    textAlign: "left",
    height: "40px",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "lightgray",
      cursor: "pointer"
    },
    "&:active, &:focus": {
      outline: "none",
      "&:active": {
        boxShadow: "none",
        border: "none"
      }
    }
  },
  
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    width: "35%",
    boxShadow: "none",
    backgroundColor: "white",
  },
  
  classes: {
    display: "flex",
    flexDirection: "row",
    margin: "10px",
  },
  
  classAvailability: {
    paddingTop: "10px",
  },
  
  profInfo: {
    width: "60%",
    display: "flex",
    flexDirection: "column",
    margin: "20px",
    border: "none",
  },
  
  professorName: {
    fontWeight: "bold"
  }
})

function AvailableClasses ({prof, avail}) {
  const styleClasses = useStyles();
  return (
    <Paper className={styleClasses.classes}>
      <div className={styleClasses.profInfo}>
        <Typography variant="h5" className={styleClasses.professorName}>{prof}</Typography>
        <Typography variant="body2" className={styleClasses.classAvailability}>{avail}</Typography>
      </div>
      <section className={styleClasses.buttonContainer}>
          {/* <Link to=""> */}
            <Button className={styleClasses.button}>Teacher Reviews</Button>
          {/* </Link> */}

          {/* <Link to=""> */}
            <Button className={styleClasses.button}>Add to Schedule</Button>
          {/* </Link> */}
        </section> 
    </Paper>
  )
}
export default AvailableClasses;