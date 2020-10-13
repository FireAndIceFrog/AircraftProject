import React from 'react';
import './App.css';
import {PageStateContext, LoginStateContext} from './App'
import ToFrom from './ToFrom'


export default function NewBooking (props){
    //view used to show the two slides (New booking | Previous bookings)
    const [,setPage] = React.useContext(PageStateContext)
    const [logged, setLogged] = React.useContext(LoginStateContext)

    return <ToFrom/>
}