import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { Grid } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import Logout from './Logout'
import {PageStateContext} from './App'
import HomeIcon from '@material-ui/icons/Home';
function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={true} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}




HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function MainAppBar(props) {
  const [,setPage] = React.useContext(PageStateContext)
  return (
    <React.Fragment>
        <CssBaseline />
        <HideOnScroll {...props}>
            <AppBar position="fixed" style = {{backgroundColor:"#f1f1f1"}}>
                <Toolbar variant="dense">
                    <Grid container spacing={1} >
                        
                        <Grid item xs={12} sm={10} onClick = {()=>{setPage("home")}} >
                            
                            <Typography variant="h6" style = {{color:"black", userSelect: "none"}} >
                            <HomeIcon style = {{ marginRight: "1vh"}}/>
                                   Matt's Airplanes (17354272)
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Logout/>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </HideOnScroll>
      </React.Fragment>
  );
}