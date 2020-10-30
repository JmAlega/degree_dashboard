import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Miner from '../images/logo.png';
import { useHistory } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
      contrastText: "#000000"

    },
    primaryText: {
      main: '#FFFFFF',
    },
    secondary: {
      main: green[500],
    },
    text: {
      main: "#000000"
    },
    contrastThreshold: 3,
  },
});

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        marginLeft: theme.spacing(1)
    },
    margin: {
        flexGrow: 2,
        marginRight: 500
    },
    buttonrow: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),

    },
   
    
}));


const Header = ({component: Component, ...rest }) => {
    const classes = useStyles();
    const loggedIn = true;
    const history = useHistory();

    const dash = () => {
      console.log(history.location);
      history.push('/dashboard');
    }
    const schedule = () => {
      history.push('schedule');
    }
    const courseview = () => {
      console.log(history.location);
      history.push('course-view');
    }
    const courses= () => {
      history.push('courses');
    }
    const courseoutline = () => {
      history.push('courseoutline');
    }

    function getVariant(btnType) {
      console.log(history.location.pathname)
      if (history.location.pathname == btnType) {
        console.log("YES")
        return "outlined";
      }
      return "default";
    }
    function getColor(btnType) {
      console.log(history.location.pathname)
      if (history.location.pathname == btnType) {
        console.log("YES")
        return "secondary";
      }
      return "primary";
    }


    return (
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <img src={Miner} style={{ width: 50, height: 50 }} alt=""/>
                    
                    <Typography align="left" variant="h6" className={classes.title}>
                        Degree Dashboard
                    </Typography>
                    <div className={classes.buttonrow}>
                    <div >
                        <Button color={getColor("/dashboard")} variant={getVariant("/dashboard")} onClick={dash}>Dashboard</Button>
                        <Button color={getColor("/schedule")} variant={getVariant("/schedule")} onClick={schedule}>Schedule</Button>
                        <Button color={getColor("/course-view")} variant={getVariant("/course-view")} onClick={courseview}>Course History</Button>
                        <Button color={getColor("/courses")} variant={getVariant("/courses")} onClick={courses}>Courses</Button>
                        <Button color={getColor("/course-outline")} variant={getVariant("/course-outline")} onClick={courseoutline}>Course Outline</Button>
                        {loggedIn ? <IconButton

                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                        >
                        <AccountCircle />
                        </IconButton> :
                        <Button color="inherit">Login</Button>
                        }
                    </div>
                        
                    </div>
                </Toolbar>
            </AppBar>
        </div>
        </ThemeProvider>
    )
}
export default Header;