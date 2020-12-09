import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CourseCategory from './choosecoursemodal/CourseCategory';

const axios = require('axios');

const sampleData = [
    {"Humanities": [
        {"number": "ENGLISH 1120", "title": "Exposition and Argumentation"}, 
        {"number": "ENGLISH 1160", "title": "Writing and Research"},
        {"number": "ENGLISH 1211", "title": "British Literature I"}
    ]},
    {"Comp Sci": [
        {"number": "Comp Sci 1570", "title": "Intro to Programming C++"}, 
        {"number": "Comp Sci 1580", "title": "Intro to Programming C++ Lab"}
    ]},
    {"Math": [
        {"number": "Math 5107", "title": "Combinatorics and Graph Theory"}, 
        {"number": "Math 4211", "title": "Advanced Calculus I"}
    ]},
]

function ChooseCourse(props) {
    //console.log(props);
    return (
        <div>
            <Dialog 
                open={props.open}
                onClose={() => props.handleClose(false)} 
                onBackdropClick={() => props.handleClose(false)}
                aria-labelledby="customized-dialog-title" 
                fullWidth={true}
                maxWidth={'md'}
            >
                <DialogTitle id="customized-dialog-title">{props.semester}</DialogTitle>
                <DialogContent dividers>
                    {props.classList.map(category => <CourseCategory handleAddClass={props.handleAddClass} category={category}/>) }
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ChooseCourse;