import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';



function ChooseCourse() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  const [openArrow, setOpenArrow] = React.useState(false);
  const handleClick = () => {
    setOpenArrow(!openArrow);
  };


  return (
    <div>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Choose Courses    
        </Button>
        <Dialog 
        onClose={handleClose} 
        aria-labelledby="customized-dialog-title" 
        open={open}   
        fullWidth={true}
        maxWidth={'md'}
        >
            <DialogTitle id="customized-dialog-title">{"Spring 2022"}</DialogTitle>

            <DialogContent dividers>
                <List >
                    <ListItem button onClick={handleClick}>
                    <ListItemText primary="Humanities" />
                            {openArrow ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openArrow} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem>
                        <Button variant="outlined">
                            <Typography component="div">
                                FR ENG 1100
                            </Typography>
                        </Button>
                        </ListItem>
                    </List>
                    </Collapse>
                </List>
            
             <Divider variant= "middle" style={{ backgroundColor: 'light gray'}}/>

            <List>
                    <ListItem button onClick={handleClick}>
                    <ListItemText primary="Computer Science" />
                            {openArrow ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openArrow} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem>
                        <Button variant="outlined">
                            <Typography component="div">
                                CS 4096
                            </Typography>
                        </Button>
                        </ListItem>
                    </List>
                    </Collapse>
                </List>

                <Divider variant= "middle" style={{ backgroundColor: 'light gray'}}/>

                <List>
                    <ListItem button onClick={handleClick}>
                    <ListItemText primary="Math" />
                            {openArrow ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openArrow} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem>
                        <Button variant="outlined">
                            <Typography component="div">
                                MATH 5107
                            </Typography>
                        </Button>
                        </ListItem>
                    </List>
                    </Collapse>
                </List>

            </DialogContent>

            <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                Save
                </Button>
            </DialogActions>
        </Dialog>
    </div>
  );
}

export default ChooseCourse