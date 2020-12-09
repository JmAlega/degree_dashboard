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
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const reorder = (list, startIndex, endIndex) => {
  console.log(list);
  console.log(startIndex);
  console.log(endIndex);
  const result = Array.from(list.classes);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'white',
  display: 'flex',
  overflow: 'auto',
});

const move = (source, destination, droppableSource, droppableDestination, sInd, dInd) => {
  console.log("dropsrc");
  console.log(droppableSource);
  console.log("dropDest");
  console.log(droppableDestination);
  console.log('SOURCE')
  console.log(source);
  console.log('DESTINATION')
  console.log(destination);
  const sourceClone = Array.from(source.classes);
  const destClone = Array.from(destination.classes);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[sInd] = sourceClone;
  result[dInd] = destClone;
  console.log(result);
  return result;
};

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
  
  const [schedule, setSchedule] = useState();
  const [classList, setClassList] = useState();
  const [isLoadingClassList, setIsLoadingClassList] = useState(true);
  const [isLoadingSchedule, setIsLoadingSchedule] = useState(true);
  const classes = useStyles();
  const email = sessionStorage.getItem('email');

  useEffect(() => {
    axios.get('http://localhost:8000/api/getSchedules/'+email)
    .then(res => {
      console.log(res.data[0].schedule);
      setSchedule(res.data[0].schedule);
      setIsLoadingSchedule(false);
    })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:8000/api/getAllCourses')
    .then(res => {
      //console.log('RESPONSE: ')
      //console.log(res);
      setClassList(res.data.classes);
      setIsLoadingClassList(false);
    })
  }, [])

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    console.log(schedule);
    const sInd = schedule.findIndex(element => element.semester==source.droppableId);
    console.log("sInd");
    console.log(sInd)
    const dInd = schedule.findIndex(element => element.semester==destination.droppableId);
    console.log(result);
    if (sInd === dInd) {
      const items = reorder(schedule[sInd], source.index, destination.index);
      const newState = [...schedule];
      newState[sInd].classes = items;
      console.log("here");
      setSchedule(newState);
    } else {
      const result = move(schedule[sInd], schedule[dInd], source, destination, sInd, dInd);
      const newState = [...schedule];
      newState[sInd].classes = result[sInd];
      newState[dInd].classes = result[dInd];
      console.log("there");
      console.log(newState);
      setSchedule(newState);
    }
  }

  const addSemester = () => {
    setSchedule(oldSchedule => [...oldSchedule, 
      { 
        semester: 'New semester',
        classes: [ {'title': 'Add Course', 'description': ''},]
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
        newArr[i].classes.push(course);
        break;
      }
    }
    setSchedule(newArr);
  }

  const handleRemoveClass = (course, semester) => {
    let newArr = [...schedule];
    for(let i = 0; i < newArr.length; i++) {
      if(newArr[i].semester === semester) {
        for(let j = 0; j < newArr[i].classes.length; j++) {
          if(newArr[i].classes[j].title === course.title && newArr[i].classes[j].description === course.description) {
            newArr[i].classes.splice(j, 1);
            break;
          }
        }
        break;
      }
    }
    setSchedule(newArr);
  }

  if(isLoadingClassList || isLoadingSchedule) {
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
    <DragDropContext onDragEnd={onDragEnd}>
      {schedule.map((available_classes, i) => (
        
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
                      
                      <Droppable droppableId={available_classes.semester} key={i} direction="horizontal" ignoreContainerClipping={true}>
                      
                        {(provided, snapshot) => (
                          <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} {...provided.droppableProps}>
                            { console.log(available_classes)}
                            
                              <CurrentClasses 
                                courses={available_classes.classes}
                                semester={available_classes.semester}
                                classList={classList}
                                handleAddClass={handleAddClass}
                                handleRemoveClass={handleRemoveClass}
                              />
                            
                      
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </AccordionDetails>
                  </Accordion>
                </Box>
      ))
      }
    
    </DragDropContext>
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