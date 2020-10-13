import React from 'react';
import {Button} from '@material-ui/core';
import $ from 'jquery'
import {LoginStateContext} from './App'


export default  function Logout (props) {
    const [logged,setlogged] = React.useContext(LoginStateContext);
    const submit = (e)=>{
        e.stopPropagation();
        e.preventDefault();
        var url = "http://"+window.location.hostname+":3001/login/logout";
        $.post( url ,  ()=>{} )
        setlogged(0)

    }
    return (
        <div>
            {typeof(logged) != "undefined" ?    (logged[0]>0) ? <Button onClick = {submit}>Logout</Button> : null:null}
        </div>)

}