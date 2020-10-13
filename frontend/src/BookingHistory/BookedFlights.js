import React from 'react';
import {PageStateContext, LoginStateContext} from '../App'
import $ from "jquery"
import {Grid, Typography, Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
export default function NewBooking (props){
    //view used to show the two slides (New booking | Previous bookings)
    const [,setPage] = React.useContext(PageStateContext)
    const [logged, setLogged] = React.useContext(LoginStateContext)

    const makeBooking = (bookingID, index) => {
        var url = "http://"+window.location.hostname+":3001/dateLoc/removeBooking";
        $.post( url ,
            [
              {"name": "booking_id", "value": bookingID}, 
            ],  function(  ) {
                console.log("booking id: ", bookingID)
                $(props.reload())
          });
    }

    const mapFlights = ()=>{
        return props.state.map((row,index)=>{
            var newDate = new Date(row.time.split("Z")[0]+"+12:00")
            console.log("time: ",newDate.toISOString().split("Z")[0])
           return  <Grid container xs={12} style = {{backgroundColor: "#cecece", marginTop: "1%", padding : "2%"}}>
                    <Grid item xs={12} sm = {6}>
                        <Grid item >
                        Start:  {row.start}
                        </Grid>
                        <Grid item >
                        End:  {row.end}
                        </Grid>
                        <Grid item >
                        
                        <TextField
                                id="datetime-local"
                                label="Flight Time"
                                type="datetime-local"
                                value={newDate.toISOString().split("Z")[0]}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm = {6}>
                        <Typography>Cost: ${row.cost}  </Typography>
                        <br/>
                        <Button onClick = {()=>{makeBooking(row.flight_id,index)}}> Make a booking  </Button>
                    </Grid>               

                    
                    </Grid>
        })
    }
    return (
        <Grid container spacing={3} style = {{marginTop:"5%"}}>
            <Grid item xs={12}>
                <Grid item xs={3}> 
                <Typography> {props.children}</Typography>
                </Grid>
            </Grid>
            
            {mapFlights()}


        </Grid>
    )

}