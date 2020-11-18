import {React, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card  from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import CourseView from '../../courseView/CourseView.js'
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      minWidth: 300,
    },
  }));

function CourseCard(props) {

    function addCourseToSchedule() {
        // TODO: Call backend function to add course to schedule.
        console.log("Adding course to schedule: " + props.course.number);

    }

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const classes = useStyles();
    return (
        <Box paddingBottom={2} paddingRight={2}>
            <Card className={classes.root}> 
              <CardHeader
                  action={<IconButton onClick={addCourseToSchedule}> <AddIcon /> </IconButton>}
                  title={props.course.number}
                  titleTypographyProps={{"variant": "h6"}}
              />
              <CardContent>
                  <Typography color="textSecondary">
                      {props.course.title}
                  </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={handleClickOpen}>Class Information</Button>
                <Dialog 
                  open={open}
                  keepMounted
                  onClose={handleClose}
                  maxWidth="lg"
                  fullWidth="true"
                >
                  <DialogContent>
                    <CourseView
                      subject={props.course.title}
                      number={props.course.number}
                      class_array={
                        [
                          { 
                            avail: "MWF 11-2", 
                            prof: "Morales"
                          }, 
                          { 
                            avail: "MWF 2-3", 
                            prof: "Price"
                          },
                          { 
                            avail: "TTH 11-12:30", 
                            prof: "Markowski"
                          },
                        ]} 
                    />
                  </DialogContent>
                </Dialog>

              </CardActions>
            </Card>
        </Box>
    );
}

export default CourseCard;