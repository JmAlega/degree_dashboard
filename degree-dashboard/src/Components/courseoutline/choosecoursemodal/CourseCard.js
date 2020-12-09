import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card  from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      minWidth: 300,
    },
  }));

function CourseCard(props) {

    function addCourseToSchedule(title, number) {
        // TODO: Call backend function to add course to schedule.
        console.log(title + number);
        props.handleAddClass(number, title)
    }

    const classes = useStyles();
    return (
        <Box paddingBottom={2} paddingRight={2}>
            <Card className={classes.root}> 
                <CardHeader
                    action={<IconButton onClick={() => addCourseToSchedule(props.course.title, props.course.number)}><AddIcon /></IconButton>}
                    title={props.course.number}
                    titleTypographyProps={{"variant": "h6"}}
                />
                <CardContent>
                    <Typography color="textSecondary">
                        {props.course.title}
                    </Typography>
                </CardContent>
            
            </Card>
        </Box>
    );
}

export default CourseCard;