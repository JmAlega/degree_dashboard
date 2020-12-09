import React from 'react';
import Typography from "@material-ui/core/Typography";
import { makeStyles, MenuItem, withStyles } from '@material-ui/core';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles({
  boldText: {
    fontWeight: "bold"
  },
  strikeThrough: {
    textDecorationLine: 'line-through'
  },
  listStyle: {
    marginTop: 0,
    marginBottom: 0
  }
})

const StyledSelect = withStyles({
  root: {
    whiteSpace: "unset",
    fontSize: '.8rem'
  }
})(Select);

const StyledMenuItem = withStyles({
    root: {
      whiteSpace: "unset",
      wordBreak: "break-all",
      fontSize: '.75rem' 
    }
})(MenuItem);

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.initializeState();

    this.handleChange = this.handleChange.bind(this);
    this.initializeState = this.initializeState.bind(this);
  }

  handleChange(event) {
    var selectorTitle = event.target.name;
    var value = event.target.value
    console.log(selectorTitle);
    console.log(value);
    console.log(this.state[value]);
    this.setState({
      [selectorTitle]: value
    });
  }

  initializeState() {
    this.props.subGroups.map(subGroup => {
      let classList = [[], []];
      if(subGroup.selectFrom) {
        subGroup.selectFrom.map(selectFromClass => {
          classList[0].push(selectFromClass.dept+' '+selectFromClass.number);
        });
      }

      if(subGroup.takenCourses) {
        subGroup.takenCourses.map(takenCourse => {
          let dept = takenCourse.courseNumber.substring(0, takenCourse.courseNumber.search(/\d/));
          let number = takenCourse.courseNumber.substring(takenCourse.courseNumber.search(/\d/));
          classList[1].push(dept+' '+number);
        });
      }

      if(subGroup.subGroupTitle !== "") {
        // this.setState({
        //   [subGroup.subGroupTitle]: classList,
        // })
        this.state[subGroup.subGroupTitle] = classList;
      } else {
        // this.setState({
        //   [this.props.title]: classList,
        // })
        this.state[this.props.title] = classList;
      }

      let alt = subGroup.alternative;
      if(alt){
        if(alt.length === 1) {
          alt = alt[0];
          let altClassList = [[], []];
          
          if(alt.selectFrom) {
            alt.selectFrom.map(selectFromClass => {
              altClassList[0].push(selectFromClass.dept+' '+selectFromClass.number);
            })
          }
          if(alt.takenCourses) {
            alt.takenCourses.map(takenCourse => {
              let dept = takenCourse.courseNumber.substring(0, takenCourse.courseNumber.search(/\d/));
              let number = takenCourse.courseNumber.substring(takenCourse.courseNumber.search(/\d/));
              altClassList[1].push(dept+' '+number);
            })
          }
  
          // this.setState({
          //   [alt.subGroupTitle]: altClassList,
          //   ['selected-'+subGroup.subGroupTitle]: subGroup.subGroupTitle
          // })
          
          //change how subgroups are named (if the same name or lacking a name)

          this.state[alt.subGroupTitle] = altClassList;
          this.state['selected-'+subGroup.subGroupTitle] = subGroup.subGroupTitle;
        } else if(alt.length > 1){
        alert("TOO MANY ALTERNATIVES");
        }
      }
    });
  }

  render() {
    //const styles = useStyles();
    return (
      <>
      {
        this.props.subGroups.length > 0
        ?
        <ul style={{ marginTop: 0, marginBottom: 0 }}>
        {
          this.props.subGroups.map(subGroup => {
            let subGroupTitle = subGroup.subGroupTitle;
            if(subGroupTitle === "") {
              subGroupTitle = this.props.title;
            }
            let contentTitle = subGroup.alternative.length > 0 ? this.state['selected-'+subGroupTitle] : subGroupTitle;
            let needMoreCourses = parseInt(subGroup.subGroupTotal, 10) - (subGroup.subGroupEarned*3) > 0 ? true : false;
            //console.log(this.state);
            return(
              <div key={this.props.title+'-'+subGroupTitle}>
                {
                  subGroup.alternative.length > 0
                  ?
                    <StyledSelect disableUnderline value={this.state['selected-'+subGroupTitle]} name={'selected-'+subGroupTitle} onChange={this.handleChange} style={{ fontWeight: 'bold' }}>
                      <StyledMenuItem key={subGroupTitle} value={subGroupTitle} >{ subGroupTitle }</StyledMenuItem>
                      {
                        subGroup.alternative.map(alt => {
                          return(
                            <StyledMenuItem key={alt.subGroupTitle} value={alt.subGroupTitle}>{ alt.subGroupTitle }</StyledMenuItem>
                          )
                        })
                      }
                    </StyledSelect>
                  :
                    // <Typography className={ styles.boldText }>{ subGroup.subGroupTitle }</Typography>
                    <Typography style={{ fontSize: '.8rem', fontWeight: 'bold' }}>{ subGroupTitle }</Typography>
                }
                {
                  needMoreCourses ?
                    <li><Typography variant='body2'>Need {parseInt(subGroup.subGroupTotal, 10) - (subGroup.subGroupEarned*3)} more hours</Typography></li>
                   :
                    this.state[contentTitle][0].map(selectCourse => {
                      return(
                        <li key={selectCourse}><Typography variant='body2'>{selectCourse}</Typography></li>
                      )
                    })
                }
                
                {
                  this.state[contentTitle][1].map(takenCourse => {
                    return(
                      // <li><Typography className={ styles.strikeThrough }>{takenCourse}</Typography></li>
                      <li key={takenCourse}><Typography variant='body2' style={{ textDecorationLine: 'line-through' }}>{takenCourse}</Typography></li>
                    )
                  })
                }
              </div>
            )
          })  
        }
        </ul>
        :
        // <ul className ={ styles.listStyle }>
        <ul style={{ marginTop: 0, marginBottom: 0 }}>
          <Typography variant='body1'>{ "Total Hours Earned: " + this.props.hours + " Hours" }</Typography>
        </ul>
      }
      </>
    );
  }
}