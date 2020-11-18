import React, { useState, useEffect } from 'react';
import AvailableClasses from './AvailableClasses'
import CourseInfo from './CourseInfo'
import styles from "./CourseView.module.css"
import { makeStyles, Paper, Typography } from '@material-ui/core';

const axios = require('axios');

const useStyles = makeStyles({
  courseViewPage: {
    position: 'relative',
    fontFamily: 'sans-serif',
    marginTop: '40px',
    background: 'none'
  },
  classTitle: {
    textAlign: 'center',
    fontWeight: "bold",
  },
  sections: {
    display: 'flex',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: '10px',
    paddingTop: '20px',
    fontFamily: 'sans-serif'
  },
  classInfo: {
    backgroundColor: 'white',
    width: '50%',
    marginLeft: '10px',
    marginRight: '40px',
    borderRadius: '4px',
    boxShadow: '1px 2px 5px grey'
  },
  availableClasses: {
    // backgroundColor: 'green',
    width: '50%',
    marginRight: '10px',
    marginLeft: '40px',
    borderRadius: '4px',
    boxShadow: '1px 2px 5px grey'
  },


})

function CourseView (props) {

  console.log(props.subject)
  console.log(props.number)

  const [classes] = useState(props.class_array);

  const styleClasses = useStyles();
  const [subjectId, setSubjectId] = useState('');
  const [courseNum, setCourseNum] = useState('');
  const [prereq, setPreReq] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() =>{
    axios.get("http://localhost:8000/api/getCourse/"+props.subject+"/"+props.number)
    .then(res => {
      console.log(res);
      const preReqString = "prerequisites: ";
      const preReqIndex = res.data.description.toLowerCase().indexOf(preReqString);
      const description = res.data.description.substring(0, preReqIndex);
      const preReq = res.data.description.substring(preReqIndex + preReqString.length);
      setTitle(res.data.title);
      setDesc(description);
      setSubjectId(res.data.subjectId);
      setCourseNum(res.data.number);
      setPreReq(preReq)
    })
    .catch(error => {
      console.log(error);
    });
  }, [props.subject, props.number]);

  return (
    <>
      <div className={styleClasses.courseViewPage}>
        <Typography variant="h4" className={styleClasses.classTitle}>{subjectId + " " + courseNum + " - " + title}</Typography>
        <div className={styleClasses.sections}>

          <Paper className={styleClasses.classInfo}>

            <CourseInfo desc={desc} 
                        pre={prereq}
                        reqFor={"Required For #1"}
                        req={"Required True #1"}
                        
            />
          </Paper>

          <Paper className={styleClasses.availableClasses}>
            <Typography variant="h5" className={styleClasses.classTitle}>Available Classes</Typography>

            {classes.map(available_classes => (
              <AvailableClasses prof={available_classes.prof} avail={available_classes.avail}/>
            ))}

          </Paper>

        </div>
      </div>
    </>
  )
}

export default CourseView;

// 