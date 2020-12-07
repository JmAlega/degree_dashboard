import React, { useState } from 'react';
import { Component } from 'react';
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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
  root: {
	width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
   formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const options = [
  '2016',
  '2017',
  '2018',
  '2019',
  '2020',
  '2021',
  '2022',
  '2023',
  '2024',
  '2025',
  '2026',
  '2027',
  '2028',
  '2029',
  '2030',
];

const ITEM_HEIGHT = 36;



function SemesterPlan (props) {

	this.state = {
	  season: 'Fall'
  };
  this.handleInputChange = this.handleInputChange.bind(this);
  

  const [schedule, setSchedule] = useState(props.schedule_array);
  const classes = useStyles();

  const addSemester = () => {
    setSchedule(oldSchedule => [...oldSchedule, 
      { 
        semester: 'New semester',
        courses: [ {'title': 'Add Course', 'description': ''},]
      }]
    );
  }
  
  function handleInputChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  
  const [seas, setSeason] = useState(props.schedule_array.season);

  const handleChange = (event) => {
    setSeason(event.target.value);
  };
  
  const [year, setYear] = useState(props.schedule_array.year);
  
 const handleChangeYr = (event) => {
    setYear(event.target.value);
  };
  

  
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
              {schedule.map((available_classes, index) => (
                <Box paddingTop={2} paddingBottom={2}>
                  <Accordion defaultExpanded="True" style={{ boxShadow: "1px 2px 5px grey" }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
					 <FormControl className={classes.formControl}>
							<InputLabel id="demo-simple-select-label">Season</InputLabel>
							<Select
							  labelId="demo-simple-select-label"
							  id="demo-simple-select"
							  name="season"
							  value={this.state.season}
							  onChange={this.handleInputChange}
							>
							  <MenuItem value={10}>Spring</MenuItem>
							  <MenuItem value={20}>Summer</MenuItem>
							  <MenuItem value={30}>Fall</MenuItem>
							</Select>
						  </FormControl>
					<FormControl className={classes.formControl}>
							<InputLabel id="demo-simple-select-label">Year</InputLabel>
							<Select
							  labelId="demo-simple-select-label"
							  id="demo-simple-select"
							  value={year}
							  onChange={handleChangeYr}
							>
							  <MenuItem value={10}>2016</MenuItem>
							  <MenuItem value={20}>2017</MenuItem>
							  <MenuItem value={30}>2018</MenuItem>
							</Select>
						  </FormControl>

					  
                    </AccordionSummary>
                    <AccordionDetails overflow="auto">
                      <Box overflow='auto'>
                        <CurrentClasses 
                          courses={available_classes.courses}
                          semester={available_classes.semester}
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