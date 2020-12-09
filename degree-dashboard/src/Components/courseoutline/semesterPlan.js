import React, { useState, useEffect } from 'react';
import CurrentClasses from './CurrentClasses';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import Header from '../Header.js';
import Requirements from '../Requirements';

const axios = require('axios');

const useStyles = makeStyles((theme) => ({
  root: {
	width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));



function SemesterPlan (props) {

  const [schedule, setSchedule] = useState(props.schedule_array);
  const [classList, setClassList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();

  const addSemester = () => {
    setSchedule(oldSchedule => [...oldSchedule, 
      { 
        semester: 'New semester',
        courses: [ {'title': 'Add Course', 'description': ''},]
      }]
    );
  }

  const handleAddClass = (course, semester) => {
    console.log('IN SEMESTER PLAN');
    console.log(course);
    console.log(semester);
    let newArr = [...schedule];
    for(let i = 0; i < schedule.length; i++) {
      if(schedule[i].semester === semester) {
        newArr[i].courses.push(course);
        break;
      }
    }
    setSchedule(newArr);
  }

  const handleRemoveClass = (course, semester) => {
    let newArr = [...schedule];
    for(let i = 0; i < newArr.length; i++) {
      if(newArr[i].semester === semester) {
        for(let j = 0; j < newArr[i].courses.length; j++) {
          if(newArr[i].courses[j].title === course.title && newArr[i].courses[j].description === course.description) {
            newArr[i].courses.splice(j, 1);
            break;
          }
        }
        break;
      }
    }
    setSchedule(newArr);
  }

  useEffect(() => {
    axios.get('http://localhost:8000/api/getAllCourses')
    .then(res => {
      //console.log('RESPONSE: ')
      //console.log(res);
      setClassList(res.data.classes);
      setIsLoading(false);
    })
  }, [])

  //console.log(classList);

  if(isLoading) {
    return(
      <div>
        <Header></Header>
        <div className="semesterViewPg" style={{margin: "20px"}}>
          <Container maxWidth="sm" align="center">
            <Typography variant="h5">
              Tentative Course Outline
              <br />
              Note: This is not a guarantee of any enrollment
            </Typography>
          </Container>
        </div>
      </div>
    )
  }
  
  return (
    <div>
      <Header></Header>
      <div className="semesterViewPg" style={{margin: "20px"}}>
        <Container maxWidth="sm" align="center">
          <Typography variant="h5">
            Tentative Course Outline
            <br />
            Note: This is not a guarantee of any enrollment
          </Typography>
        </Container>
        
        <div className="sections">
          <div className="addSem">
            <Button variant="contained" endIcon={<AddIcon/>} onClick={addSemester}>{"Add Semester"} </Button>
          </div>
          <div style={{display: "flex", flexDirection: "row"}}>
            <div style={{display: "flex", flexDirection: "column", width: "60%"}}>
              {schedule.map(available_classes => (
                <Box paddingTop={2} paddingBottom={2}>
                  <Accordion defaultExpanded="True" style={{ boxShadow: "1px 2px 5px grey" }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                    <Typography variant="h5" style={{marginLeft: "5px"}}>{available_classes.semester}</Typography>
                    </AccordionSummary>
                    <AccordionDetails overflow="auto">
                      <Box overflow='auto'>
                        <CurrentClasses 
                          courses={available_classes.courses}
                          semester={available_classes.semester}
                          classList={classList}
                          handleAddClass={handleAddClass}
                          handleRemoveClass={handleRemoveClass}
                        />
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              ))}
            </div>
            <Box style={{width: "40%", position: "relative", marginLeft: "30px", marginTop: "16px"}} >
              <Requirements/>
            </Box>
          </div>
        </div>
      </div>
    </div>
  )  
}
export default SemesterPlan;