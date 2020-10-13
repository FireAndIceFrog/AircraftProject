import React from 'react';
import {PageStateContext, LoginStateContext} from '../App'
import LocPicker from './LocPicker'
import $ from "jquery"
import Flights from "./Flights"

export default function NewBooking (props){
    //view used to show the two slides (New booking | Previous bookings)
    const [,setPage] = React.useContext(PageStateContext)
    const [logged, setLogged] = React.useContext(LoginStateContext)
    const [state, setState] = React.useState({
      "to":   [      {"name": "locationID", "value": "%"}, {"name":"Date", "value": "00-00-00"}      ],
      "from": [      {"name": "locationID", "value": "%"}, {"name":"Date", "value": "00-00-00"}      ],
      "Locs": [],
      "toFlights": [],
      "fromFlights" : [],
      reload : 0
    })

    const [to, setTo] = React.useState([      {"name": "locationID", "value": "%"}, {"name":"Date", "value": "00-00-00"}      ])
    const [toFlights, setToFlights] = React.useState([])
    const [from, setFrom] = React.useState([      {"name": "locationID", "value": "%"}, {"name":"Date", "value": "00-00-00"}      ])
    const [fromFlights, setfromFlights] = React.useState([])

    const style = {
        main:{
          position: "absolute",
          left: "0px",
          top: "0vh",
          minHeight: "100vh",
          width: "100vw",
          backgroundColor: "#282c34"
        },
        secondary:{
          paddingTop:"3%",
          paddingBottom: "3%",
          backgroundColor: "#f1f1f1",
          marginTop:"8%",
          position:"relative",
          width:"80%",
          marginLeft: "10%"
        }
    }

    React.useEffect(()=>{
      
      var url = "http://"+window.location.hostname+":3001/dateLoc";
      $.post( url ,[{"name": "startLoc", "value": to[0].value}, {"name": "endloc", "value": from[0].value} ],  function( returnable ) {
        console.log("Updated locations: ", returnable)
        $(setState({...state, Locs: returnable}))
      });
    }, [to[0].value, from[0].value])

    React.useEffect(()=>{
      var url = "http://"+window.location.hostname+":3001/dateLoc/getAvailableFlights";
      // console.log(data)
      if(to[0].value == "%" || from[0] == "%") {
        // $(setState({...state, toFlights: [], fromFlights : []}))
        return
      } else {
        
        $.post( url ,
          [
              {"name": "user_id", "value": logged[1]}, 
              {"name": "start", "value": to[0].value}, 
              {"name": "end", "value": from[0].value}, 
              {"name": "Date", "value": to[1].value} 
          ],  function( toReturnable ) {
              $(setToFlights(toReturnable))
        });
      }
      
    }, [to[1].value,  from[1].value, to[0].value,  from[0].value, state.reload])
    //set the from array
    React.useEffect(()=>{
      var url = "http://"+window.location.hostname+":3001/dateLoc/getAvailableFlights";
      // console.log(data)
      if(to[0].value == "%" || from[0] == "%") {
        // $(setState({...state, toFlights: [], fromFlights : []}))
        return
      } else {
        
       
        $.post( url ,
          [
            {"name": "user_id", "value": logged[1]}, 
            {"name": "start", "value": from[0].value}, 
            {"name": "end", "value": to[0].value}, 
            {"name": "Date", "value": from[1].value} 
          ],  function( fromReturnable ) {
          $(setfromFlights(fromReturnable))
        });
      }
      
    }, [to[1].value,  from[1].value,, to[0].value,  from[0].value, state.reload])


    console.log(toFlights)




    return (
      <div style = {style.main}>
        <div style = {style.secondary}>
          <LocPicker start = {true} locationState = {state.Locs}  state = {to}  setState = {(newState)=>{setTo(newState)} } >
              Start Location
          </LocPicker>
          <br/>
          <LocPicker start = {false} locationState = {state.Locs}  state = {from} setState = {(newState)=>{setFrom(newState)} }   >
              End Location
          </LocPicker>
          <Flights  state = {toFlights} reload = {()=>{setState({...state, reload: state.reload+1})}}  >
              To Flights:
          </Flights>
          <Flights  state = {fromFlights} reload = {()=>{setState({...state, reload: state.reload+1})}} >
              From Flights
          </Flights>


        </div>

      </div>
    )
}