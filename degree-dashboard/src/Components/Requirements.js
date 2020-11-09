import React from "react";
import audit from "./sampleAudit.json";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  boldText: {
    fontWeight: "bold"
  },
  strikeThrough: {
    textDecorationLine: 'line-through'
  }
})

const Accordion = withStyles({
  root: {
    boxShadow: "none",
    border: 0,
    "&:not(:last-child)": {
      /*borderBottom: 0,*/
    },
    "&:before": {
      display: "none"
    },
    "&$expanded": {
      margin: "auto"
    }
  },
  expanded: {}
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(243,243,243,1)",
    marginBottom: -1,
    marginLeft: -25,
    minHeight: 40,
    position: "relative",
    "&$expanded": {
      minHeight: 40
    }
  },
  content: {
    margin: "12px 5px",
    "&$expanded": {
      margin: "12px 5px"
    }
  },
  expanded: {},
  expandIcon: {
    order: -1
  }
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: "rgba(243,243,243,1)"
  },
}))(MuiAccordionDetails);

export default function Requirements() {
  const styles=useStyles();
  return (
    <div
      style={{
        backgroundColor: "rgba(243,243,243,1)"
      }}
    >
      <Typography variant="h6" className={ styles.boldText }>Requirements</Typography>
      {
        audit.requirements.map((requirement) => {
          return <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={ styles.boldText }>{ requirement.title }</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {
                requirement.subGroups.length > 0
                  ? <ul style={{ marginTop: 0, marginBottom: 0 }}>
                    { 
                      requirement.subGroups.map((subgroup) => {
                        return <> 
                        <Typography className={ styles.boldText }>{ subgroup.subGroupTitle }</Typography>
                        <ul style={{ marginTop: 0, marginBottom: 0 }}>
                        {
                          subgroup.selectFrom &&
                          subgroup.selectFrom.map((selectCourse) => {
                            return <li><Typography>{ selectCourse.dept + " " + selectCourse.number }</Typography></li>
                          }) 
                        }
                        {
                          subgroup.takenCourses &&
                          subgroup.takenCourses.map((completedCourse) => {
                            return <li><Typography className={ styles.strikeThrough }>{ completedCourse.courseNumber }</Typography></li>
                          }) 
                        }
                        </ul>
                        {
                          subgroup.alternative.length > 0 &&
                          subgroup.alternative.map((alt) => {
                            return <>
                            <Typography className={ styles.boldText }>{ alt.subGroupTitle }</Typography>
                            <ul style={{ marginTop: 0, marginBottom: 0 }}>
                            {
                              alt.selectFrom &&
                              alt.selectFrom.map((selectCourse) => {
                                return <li><Typography>{ selectCourse.dept + " " + selectCourse.number }</Typography></li>
                              })
                            }
                            {
                              alt.takenCourses &&
                              alt.takenCourses.map((completedCourse) => {
                                return <li><Typography className={ styles.strikeThrough }>{ completedCourse.courseNumber }</Typography></li>
                              })
                            }
                            </ul>
                            </>
                          }) 
                        }
                        </>
                      })
                    }
                    </ul>
                  : <ul style={{ marginTop: 0, marginBottom: 0 }}>
                      <Typography>{ "Total Hours Earned: " + requirement.totalHoursEarned + " Hours" }</Typography>
                    </ul>
              }
            </AccordionDetails>
          </Accordion>
        })
      }
      {/*<Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <Typography>Pre-selected CS</Typography>
          <div style={{ position: "absolute", marginLeft: "50%" }}>
            <FiberManualRecordIcon
              style={{
                fontSize: 15,
                position: "relative",
                color: "rgba(0,133,62,1)"
              }}
            />
            <FiberManualRecordIcon
              style={{
                fontSize: 15,
                position: "relative",
                color: "rgba(255,235,59,1)"
              }}
            />
            <FiberManualRecordIcon
              style={{
                fontSize: 15,
                position: "relative",
                color: "rgba(196,196,196,1)"
              }}
            />
            <FiberManualRecordIcon
              style={{
                fontSize: 15,
                position: "relative",
                color: "rgba(244,67,54,1)"
              }}
            />
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <ul style={{ marginTop: 0, marginBottom: 0 }}>
            <li>
              <Typography>Class #1</Typography>
            </li>
            <li>
              <Typography>Class #2</Typography>
            </li>
            <li>
              <Typography>Class #3</Typography>
            </li>
          </ul>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2d-content"
          id="panel2d-header"
        >
          <Typography>Elective CS</Typography>
          <div style={{ position: "absolute", marginLeft: "50%" }}>
            <FiberManualRecordIcon
              style={{
                fontSize: 15,
                position: "relative",
                color: "rgba(0,133,62,1)"
              }}
            />
            <FiberManualRecordIcon
              style={{
                fontSize: 15,
                position: "relative",
                color: "rgba(255,235,59,1)"
              }}
            />
            <FiberManualRecordIcon
              style={{
                fontSize: 15,
                position: "relative",
                color: "rgba(196,196,196,1)"
              }}
            />
            <FiberManualRecordIcon
              style={{
                fontSize: 15,
                position: "relative",
                color: "rgba(244,67,54,1)"
              }}
            />
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <ul style={{ marginTop: 0, marginBottom: 0 }}>
            <li>
              <Typography>Class #1</Typography>
            </li>
            <li>
              <Typography>Class #2</Typography>
            </li>
            <li>
              <Typography>Class #3</Typography>
            </li>
          </ul>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3d-content"
          id="panel3d-header"
        >
          <Typography>Humanities</Typography>
          <div style={{ position: "absolute", marginLeft: "50%" }}>
            <FiberManualRecordIcon
              style={{
                fontSize: 15,
                position: "relative",
                color: "rgba(0,133,62,1)"
              }}
            />
            <FiberManualRecordIcon
              style={{
                fontSize: 15,
                position: "relative",
                color: "rgba(255,235,59,1)"
              }}
            />
            <FiberManualRecordIcon
              style={{
                fontSize: 15,
                position: "relative",
                color: "rgba(196,196,196,1)"
              }}
            />
            <FiberManualRecordIcon
              style={{
                fontSize: 15,
                position: "relative",
                color: "rgba(244,67,54,1)"
              }}
            />
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <ul style={{ marginTop: 0, marginBottom: 0 }}>
            <li>
              <Typography>Class #1</Typography>
            </li>
            <li>
              <Typography>Class #2</Typography>
            </li>
            <li>
              <Typography>Class #3</Typography>
            </li>
          </ul>
        </AccordionDetails>
      </Accordion>*/}
    </div>
  );
}