import React from "react";
//import audit from "./sampleAudit.json";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { makeStyles } from '@material-ui/core';
import Summary from "./Summary.js";
import Details from './Details.js';

const axios = require('axios');

const useStyles = makeStyles({
  greyBackground: {
    backgroundColor: "rgba(243,243,243,1)",
    borderRadius: "4px"
  },
  boldText: {
    fontWeight: "bold"
  }
})

const Accordion = withStyles({
  root: {
    boxShadow: "none",
    border: 0,
    "&:not(:last-child)": {
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
    // marginLeft: -25,
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

const email = 'jda3b5@umsystem.edu';

export default class Requirements extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }
  
  componentDidMount() {
    axios.get('http://localhost:8000/api/getAudit/'+email)
    .then((res) => {
      this.setState({ 
        audit: res.data,
        isLoading: false
      });
    });
  }

  render() {
    // const styles = useStyles();
    //console.log('STATE:' + JSON.stringify(this.state));
    const {isLoading, audit} = this.state;
    
    if(isLoading) {
      return (
        <div style={{ backgroundColor: "rgba(243,243,243,1)", borderRadius: "4px" }}>
          <Typography variant="h6" style={{ fontWeight: "bold", paddingLeft: "16px", paddingTop: "8px" }}>Requirements</Typography>
        </div>
      )
    }

    return(
      // <div className={ styles.greyBackground }>
      <div style={{ backgroundColor: "rgba(243,243,243,1)", borderRadius: "4px" }}>
        <Typography variant="h6" style={{ fontWeight: "bold", paddingLeft: "16px", paddingTop: "8px" }}>Requirements</Typography>
        {
          audit.requirements.map(requirement => {
            return (
              <Accordion key={requirement.title}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{padding: "0px"}}>
                  <Summary title={requirement.title} subGroups={requirement.subGroups}/>
                </AccordionSummary>
                
                <AccordionDetails>
                  <Details title={requirement.title} subGroups={requirement.subGroups} hours={requirement.totalHoursEarned} />
                </AccordionDetails>
              </Accordion>
            )
          })
        }
      </div>
    );
  }
}