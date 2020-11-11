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
  greyBackground: {
    backgroundColor: "rgba(243,243,243,1)"
  },
  boldText: {
    fontWeight: "bold",
    width: "90%"
  },
  strikeThrough: {
    textDecorationLine: 'line-through'
  },
  greenBubble: {
    fontSize: 15,
    color: "rgba(0,133,62,1)"
  },
  yellowBubble: {
    fontSize: 15,
    color: "rgba(255,235,59,1)"
  },
  redBubble: {
    fontSize: 15,
    color: "rgba(244,67,54,1)"
  },
  greyBubble: {
    fontSize: 15,
    color: "rgba(196,196,196,1)"
  },
  listStyle: {
    marginTop: 0,
    marginBottom: 0
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
    <div className={ styles.greyBackground }>
      <Typography variant="h6" className={ styles.boldText }>Requirements</Typography>
      {
        // loop through each requirement in the audit
        audit.requirements.map((requirement) => {
          return <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              {/* requirement title */}
              <Typography className={ styles.boldText }>{ requirement.title }</Typography>
              <div style={{ width: "10%" }}>
              {
                requirement.subGroups.length > 0 &&
                requirement.subGroups.map((subgroup) => {
                  return <> {
                    subgroup.subGroupStatus.includes('OK') &&
                      <FiberManualRecordIcon className={ styles.greenBubble } /> 
                    ||
                    subgroup.subGroupStatus.includes('NO') &&
                      <FiberManualRecordIcon className={ styles.redBubble } />
                  } </>
                })
              }
              </div>
            </AccordionSummary>
            {/* inside the accordion - the courses */}
            <AccordionDetails>
              {
                /* if there are subgroups (courses) */
                requirement.subGroups.length > 0
                  ? <ul className ={ styles.listStyle }>
                    {
                      /* loop through each sub-requirement */
                      requirement.subGroups.map((subgroup) => {
                        return <>
                        {/* display sub-requirement title */}
                        <Typography className={ styles.boldText }>{ subgroup.subGroupTitle }</Typography>
                        <ul className ={ styles.listStyle }>
                        {
                          /* if there are sub-requirements courses to select from, loop through each course and display */
                          subgroup.selectFrom &&
                          subgroup.selectFrom.map((selectCourse) => {
                            return <li><Typography>{ selectCourse.dept + " " + selectCourse.number }</Typography></li>
                          }) 
                        }
                        {
                          /* if there are sub-requirements courses that have been fulfilled, loop through each course and strike it through */
                          subgroup.takenCourses &&
                          subgroup.takenCourses.map((completedCourse) => {
                            return <li><Typography className={ styles.strikeThrough }>{ completedCourse.courseNumber }</Typography></li>
                          }) 
                        }
                        </ul>
                        {
                          /* if there are sub-requirement alternatives to select from, loop through each and display sub-requirement alternative title */
                          subgroup.alternative.length > 0 &&
                          subgroup.alternative.map((alt) => {
                            return <>
                            <Typography className={ styles.boldText }>{ alt.subGroupTitle }</Typography>
                            <ul className ={ styles.listStyle }>
                            {
                              /* if there are sub-requirement alternative courses to select from, loop through each course and display */
                              alt.selectFrom &&
                              alt.selectFrom.map((selectCourse) => {
                                return <li><Typography>{ selectCourse.dept + " " + selectCourse.number }</Typography></li>
                              })
                            }
                            {
                              /* if there are sub-requirement alternative courses that have been fulfilled, loop through each course and strike it through */
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
                  /* if there are no subgroups, display total hours earned for requirement */
                  : <ul className ={ styles.listStyle }>
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