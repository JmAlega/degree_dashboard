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


  const useStyles = makeStyles((theme) => ({
  root: {
    width: 325,
	height: 150,
  },

}));

function CurrentClasses ({semester, courses}) {
 
  var buttonDescriptions = new Array(5);
  var i;

  if(courses.length < 5)
  {
	for(i = courses.length; i < 5; i++)
		buttonDescriptions[i] = <div>
								Choose Courses
								<br />
								<br />
								Click to view all options
								</div>
  }
  
  const classes = useStyles();

  return (
    <div style={{
		display: 'flex',
		alignItems: 'center'
	}}>


	{courses.map(course => 
	<Box paddingRight={2} paddingBottom={2}>
	<Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <CloseIcon />
          </IconButton>
        }
        title={course.title}
      />
	  <CardContent>
        <Typography variant="body2" color="textSecondary">
		{course.description}
        </Typography>
      </CardContent>
	</Card>
	</Box>)
	}

    </div>
  )
}

export default CurrentClasses;