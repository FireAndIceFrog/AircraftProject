import React from 'react';
import {PageStateContext, LoginStateContext} from '../App'
import {Grid} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
export default function LocPicker (props){
    //view used to show the two slides (New booking | Previous bookings)
    const [,setPage] = React.useContext(PageStateContext)
    const [logged, setLogged] = React.useContext(LoginStateContext)
    //props.state is an array of two variables:
    // {name: "location", value:"val"} _
    // {name: "date", value:"val"}     _ \_>so that the state can be sent to the server easily.
    
    const selectedDate = props.state[1].value
    const handleDateChange = (event)=>{
        var state = [...props.state]
        state[1].value = event.target.value
        console.log("new State: ", state)
        props.setState(state)
    }
    const handleLocChange = (event)=>{
        var state = [...props.state]
        state[0].value = event.target.value
        console.log("new State: ", state)
        props.setState(state)
    }

    const generateLocationOptions = ()=>{
        var usedCodes = []
        return props.locationState.map((row, index)=>{
            var n = usedCodes.includes( (props.start)? row.startCode : row.endCode)
            if (n) return null;
            usedCodes.push((props.start)? row.startCode : row.endCode)
            return (props.start)? <option value={ row.startCode}>{row.startAirport}</option> : <option value={ row.endCode}>{row.endAirport}</option>
        })
    }
    console.log("New Location: ",props.start," ",props.locationState)

    return (
    <Grid>
        <Grid>{props.children}</Grid>
        <Grid container justify="space-around">
            <TextField
            id="date"
            label="Date"
            type="date"
            // defaultValue="2017-05-24"
            value = {selectedDate}
            onChange = {handleDateChange}
            InputLabelProps={{
            shrink: true,
            }}
        />
        <Select
            native
            value={props.state[0].value}
            onChange={handleLocChange}
            inputProps={{
                name: 'location',
                id: 'loc-native-simple',
            }}
            >
            <option value={ "%"}></option>
            {generateLocationOptions()}
            </Select>   

        </Grid>
    </Grid>)

}