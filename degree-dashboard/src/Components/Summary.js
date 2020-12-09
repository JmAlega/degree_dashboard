import React from 'react';
import Typography from "@material-ui/core/Typography";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles({
  boldText: {
    fontWeight: "bold"
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
})


export default class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

  }

  render() {
    // const styles = useStyles();
    let bubbleNum = 0;
    return (
      <>
        <Typography variant="body2" style={ { fontWeight: "bold", width: "75%" } }>{ this.props.title }</Typography>
        <div style={{ width: "20%", paddingLeft: "20px" }}>
        {
          
          this.props.subGroups.length > 0 &&
          this.props.subGroups.map((subgroup) => {
            bubbleNum += 1;
            return(
              (subgroup.subGroupStatus.includes('OK') || subgroup.subGroupStatus.includes('IP')) &&
                // <FiberManualRecordIcon className={ styles.greenBubble } /> 
                <FiberManualRecordIcon key={'bubble-'+bubbleNum} style={{ fontSize: 15, color: "rgba(0,133,62,1)" }} /> 
              ||
              subgroup.subGroupStatus.includes('NO') &&
                // <FiberManualRecordIcon className={ styles.redBubble } />
                <FiberManualRecordIcon key={'bubble-'+bubbleNum} style={{ fontSize: 15, color: "rgba(244,67,54,1)" }} />
            )
            
          }) 
        }
        </div>
      </>
    );
  }
}