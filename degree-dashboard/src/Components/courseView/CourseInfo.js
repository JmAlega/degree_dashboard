import React from 'react';
import styles from "./CourseInfo.module.css";
import { makeStyles, Paper, Typography, Card, CardContent } from '@material-ui/core';
import { shadows, typography } from '@material-ui/system';

const useStyles = makeStyles({
  courseInfoContainer: {
    backgroundColor: "white"
  },
  descriptorTitle: {
    padding: "10px",
    backgroundColor: "white"
  },
  information: {
    fontSize: "14px"
  },
  descriptors: {
    display: "flex",
    flexDirection: "row",
    padding: "10px",
    marginTop: "15px",
    backgroundColor: "white",
  },
  descriptorBox: {
    marginLeft: "auto",
    marginRight: "0px",
    width: "70%",
    height: "150px",
    backgroundColor: "white",
    borderRadius: "4px",
    boxShadow: "1px 2px 5px grey",
    overflowY: "auto",
    scrollSnapTyp: "y proximity"
  }
})

function CourseInfo ({desc, pre, reqFor, req}) {
  const styleClasses = useStyles();

  return (
    <div>
      <div className={styleClasses.descriptors}>
        <Typography variant="h6" className={styleClasses.descriptorTitle}>Description: </Typography>
        <Card className={styleClasses.descriptorBox}>
          <CardContent>
            <Typography variant="body1" className={styleClasses.information}>{desc}</Typography>
          </CardContent>
        </Card>
      </div>

      <div className={styleClasses.descriptors}>
        <Typography variant="h6" className={styleClasses.descriptorTitle}>Prerequisites: </Typography>
        <Card className={styleClasses.descriptorBox}>
          <CardContent>
            <Typography variant="body1" className={styleClasses.information}>{pre}</Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CourseInfo