import React from 'react';

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



  const useStyles = makeStyles((theme) => ({
  root: {
    width: 175,
    height: 125,
    boxShadow: "1px 2px 5px grey",
    margin: "5px"
  },

}));

function CurrentClasses ({semester, courses}) {

  var buttonDescriptions = new Array(6);
  var i;
  
  const classes = useStyles();

  return (
    <div style={{display: "flex", flexDirection: "row"}}>
      {courses.map(course => 
        <Box paddingRight={2} paddingBottom={2}>
          <Card className={classes.root}>
            <CardHeader
              action={
                course.title !== "Add Course" && 
                <IconButton aria-label="settings">
                  <CloseIcon />
                </IconButton>
              }
              title={course.title}
              titleTypographyProps={{variant: "body1"}}
              style={{ paddingBottom: "0px"}}
              />
            <CardContent style={{paddingBottom: "0px", paddingTop: "0px"}}>
              {
                course.title === "Add Course" ?
                <ChooseCourse open={true}/> :
                <Typography variant="caption" color="textSecondary">{course.description}</Typography>
              }

            </CardContent>
          </Card>
        </Box>
      )}
    </div>
  )
}

export default CurrentClasses;