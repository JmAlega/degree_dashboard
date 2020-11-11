import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import CourseCard from './CourseCard';
import Box from '@material-ui/core/Box';



function CourseCategory(props) {
    var header = Object.keys(props.category)[0];
    var courses = props.category[header];
    console.log(header);

    return (
        <Accordion overflow='hidden'>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">{header}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box overflow='auto' display='flex'>
                    {courses.map(course => <CourseCard course={course}/>)}
                </Box>
            </AccordionDetails>
        </Accordion>
    );

}

export default CourseCategory;