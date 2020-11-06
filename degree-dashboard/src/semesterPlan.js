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

  const [schedule] = useState(props.schedule_array);
  
  const classes = useStyles();
  
   return (
   <div className="semesterViewPg">
   <Container maxWidth="sm" align="center">
   <Typography variant="h5">
	Tentative Course Outline
	<br />
	Note: This is not a guarantee of any enrollment
   </Typography>
   </Container>
	   
    <div className="sections">


	<div className="addSem">
	<Button variant="contained" endIcon={<AddIcon/>}>{"Add Semester"}</Button>
	</div>

        {schedule.map(available_classes => (
		<Box paddingTop={2} paddingBottom={2}>
		<Accordion defaultExpanded="True">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
		<Typography variant="h5">{available_classes.semester}</Typography>
        </AccordionSummary>
		<AccordionDetails overflow="auto">
          <Box overflow='auto'>
            <CurrentClasses courses={available_classes.courses} semester={available_classes.semester}/>
          </Box>
        </AccordionDetails>
      </Accordion>
	  </Box>
        ))}

    </div>
    </div>
  )
  

  
}
export default SemesterPlan;