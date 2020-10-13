import React from 'react';
import {PageStateContext, LoginStateContext} from '../App'
import $ from "jquery"
import BookedFlights from "./BookedFlights"

export default function BookingHistory (props){
    //view used to show the two slides (New booking | Previous bookings)
    const [,setPage] = React.useContext(PageStateContext)
    const [logged, setLogged] = React.useContext(LoginStateContext)
    const [state, setState] = React.useState({
        reloadUpcoming : 0,
        reloadHistoric :0,
        historicFlights : [],
    })
    const [upcomingFlights, setUpcomingFlights] = React.useState([])
    const [historicFlights, setHistoricFlights] = React.useState([])

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
      
      var url = "http://"+window.location.hostname+":3001/dateLoc/getUpcomingFlights";
      $.post( url ,[{"name": "user_id", "value": logged[1]}],  function( returnable ) {
        console.log("Updated locations: ", returnable)
        $(setUpcomingFlights(returnable))
      });
    }, [logged[1], state.reloadUpcoming])
    React.useEffect(()=>{
      
        var url = "http://"+window.location.hostname+":3001/dateLoc/getHistoricFlights";
        $.post( url ,[{"name": "user_id", "value": logged[1]}],  function( returnable ) {
          console.log("Updated locations: ", returnable)
          $(setHistoricFlights(returnable))
        });
      }, [logged[1], state.reloadUpcoming])



    return (
      <div style = {style.main}>
        <div style = {style.secondary}>
            <BookedFlights state = {upcomingFlights} reload = {()=>{setState({...state, reloadUpcoming: state.reloadUpcoming+1})}} historic = {false}>
                Upcoming flights: 
            </BookedFlights>
            <BookedFlights state = {historicFlights} reload = {()=>{setState({...state, reloadHistoric: state.reloadHistoric+1})}}  historic = {true}>
                Historic flights: 
            </BookedFlights>
          


        </div>

      </div>
    )
}