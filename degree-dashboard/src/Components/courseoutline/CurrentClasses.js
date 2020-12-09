import React, { useState } from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';
import ChooseCourse from './ChooseCourse';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';



  const useStyles = makeStyles((theme) => ({
  root: {
    width: 175,
    height: 125,
    boxShadow: "1px 2px 5px grey",
    margin: "5px"
  },

}));

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',

  // styles we need to apply on draggables
  ...draggableStyle,
});

function CurrentClasses (props) {

  var buttonDescriptions = new Array(6);
  var i;
  
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);

  const handleOpenPopup = () => {
    console.log('OPENING DIALOG');
    setOpenPopup(true);
  }

  const handleAddClass = (number, title) => {
    console.log('IN CURRENT CLASSES: ' + number + title);
    props.handleAddClass({title: number, description: title}, props.semester)
  }
  
  const handleRemoveClass = (number, title) => {
    console.log(number + title);
    props.handleRemoveClass({title: number, description: title}, props.semester)
  }

  return (
    <div style={{display: "flex", flexDirection: "row"}}>
      <div style={{display: "flex", flexDirection: "row"}}>
        {props.courses.map((course, index) => 
           <Draggable draggableId={course.title} key={course.title} index={index}>
           {(provided, snapshot) => (
             <div
               ref={provided.innerRef}
               {...provided.draggableProps}
               {...provided.dragHandleProps}
               style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style
              )}
             >
               <Box paddingRight={2} paddingBottom={2}>
            <Card className={classes.root} onClick={course.title === 'Add Course' ? handleOpenPopup : null}>
              <CardHeader
                action={
                  course.title !== "Add Course" && 
                  <IconButton aria-label="settings" onClick={() => handleRemoveClass(course.title, course.description)}>
                    <CloseIcon />
                  </IconButton>
                }
                title={course.title}
                titleTypographyProps={{variant: "body1"}}
                style={{ paddingBottom: "0px"}}
                />
              <CardContent style={{paddingBottom: "0px", paddingTop: "0px"}}>
                <Typography variant="caption" color="textSecondary">{course.description}</Typography>
              </CardContent>
            </Card>
          </Box>
             </div>
           )}
         </Draggable>
        )}
      </div>
      <ChooseCourse open={openPopup} handleClose={setOpenPopup} handleAddClass={handleAddClass} semester={props.semester} classList={props.classList}/>
    </div>
  )
}

export default CurrentClasses;