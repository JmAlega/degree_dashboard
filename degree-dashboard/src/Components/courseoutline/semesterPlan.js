import React, { useState } from 'react';
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
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'white',
  display: 'flex',
  overflow: 'auto',
});

const move = (source, destination, droppableSource, droppableDestination) => {
  console.log("dropsrc");
  console.log(droppableSource);
  console.log("dropDest");
  console.log(droppableDestination);
  console.log(source);
  console.log(destination);
  const sourceClone = Array.from(source.courses);
  const destClone = Array.from(destination.courses);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  console.log(result);
  return result;
};

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
  const classes = useStyles();



  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(schedule[sInd], source.index, destination.index);
      const newState = [...schedule];
      newState[sInd].courses = items;
      console.log("here");
      setSchedule(newState);
    } else {
      const result = move(schedule[sInd], schedule[dInd], source, destination);
      const newState = [...schedule];
      newState[sInd].courses = result[sInd];
      newState[dInd].courses = result[dInd];
      console.log("there");
      setSchedule(newState);
    }
  }

  

  const addSemester = () => {
    setSchedule(oldSchedule => [...oldSchedule, 
      { 
        semester: 'New semester',
        courses: [ {'title': 'Add Course', 'description': ''},]
      }]
    );
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
                      <Droppable droppableId={i} direction="horizontal">
                        {(provided, snapshot) => (
                          <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} {...provided.droppableProps}>
                            
                      <Box overflow='auto'>
                        <CurrentClasses 
                          courses={available_classes.courses}
                          semester={available_classes.semester}
                        />
                      </Box>
                      
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