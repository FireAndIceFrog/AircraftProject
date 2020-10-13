import React from 'react';
import { Paper, Grid, TextField, Button, FormControlLabel, Checkbox, Typography } from '@material-ui/core';
import wing from './rightWing.jpg'
import {PageStateContext} from './App'

export default function ClientView (props){
    //view used to show the two slides (New booking | Previous bookings)
    const [,setPage] = React.useContext(PageStateContext)
    return (
        <Grid container spacing={2} alignItems="flex-end" >
            <Grid item xs = {12} sm = {6} onClick = {()=>{setPage("newBooking")}}>
                <div style = {{
                    zIndex: "9",
                    height: "100vh",
                    width: "50vw",
                    position: "absolute",
                    left: "0px",
                    top: "0px",
                    backgroundImage: `url(${wing})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transform: "scaleX(-1)"
                }}/>
                <div style = {{
                    zIndex: "10",
                    height: "100vh",
                    width: "50vw",
                    position: "absolute",
                    left: "0px",
                    top: "0px",
                    backgroundColor: "rgb(256 256 256 / 53%)"
                }}> 
                    <Typography variant = "h3"  style = {{color: "black"  ,marginTop: "50%", userSelect: "none"}}>
                        New Booking
                    </Typography>
                </div>
                

            </Grid>
            <Grid item xs = {12} sm = {6} onClick = {()=>{setPage("oldBooking")}}>
                
                
                
                <div style = {{
                    zIndex: "9",
                    height: "100vh",
                    width: "50vw",
                    position: "absolute",
                    left: "50vw",
                    top: "0px",
                    backgroundImage: `url(${wing})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}/>
                <div style = {{
                    zIndex: "10",
                    height: "100vh",
                    width: "50vw",
                    position: "absolute",
                    left: "50vw",
                    top: "0px",
                    backgroundColor: "rgb(0 0 0 / 60%)"
                }}>
                    <Typography variant = "h3"  style = {{color: "white"  ,marginTop: "50%", userSelect: "none"}}>
                        Booking History
                    </Typography>
                </div>


            </Grid>
        </Grid>
    )
}