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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
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
    input: {
        color: "white"
    }
    
}));



export default function Header() {
    const [value, setValue] = React.useState(0);
    const classes = useStyles();
    const loggedIn = true;
    
    const changePage = (x) => {
      let history = useHistory();
      if (x == 0) {
        history.push("/dashboard")
      } else if (x == 1) {
        history.push("/schedule")
      } else if (x == 2) {
        history.push("/schedule")
      } else if (x == 3) {
        history.push("/schedule")
      } else if (x == 4) {
        history.push("/schedule")
      }
    
    }
    
   



    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <img src={Miner} style={{ width: 50, height: 50 }} alt=""/>
                    
                    <Typography align="left" variant="h6" className={classes.title}>
                        Degree Dashboard
                    </Typography>
                    <div className={classes.buttonrow}>
                    <Tabs value={value} aria-label="simple tabs example">
                        <Tab label="Dashboard" {...changePage(0)} />
                        <Tab label="Schedule" {...changePage(1)} />
                        <Tab label="Course History" {...changePage(2)} />
                        <Tab label="Courses" {...changePage(3)} />
                        <Tab label="Course Outline" {...changePage(4)} />
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
                    </Tabs>
                        
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}