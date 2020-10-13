//from https://gist.github.com/EduardoSaverin/04d7d9529dfaf8cc9a404bb458bb8dbb
//Most of the content is from that website however all jquery/ajax/functionality is by me
import React from 'react';
import { Paper, Grid, TextField, Button, FormControlLabel, Checkbox, Typography } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import $ from 'jquery'
import {PageStateContext} from './App'


//converted from oop style to functional style (faster 10x)
function Register (props) {
        const [,setPage] = React.useContext(PageStateContext);
        const styles = {
            //outside style for the object
            outside: {
                position: "absolute",
                left: "35vw",
                top: "20vh",
                width: "30vw",
                height: "60vh",
                padding: "2%"
            },
            

        }
        
        const subimitLogin = (e)=>{
                e.stopPropagation();
                e.preventDefault();
                
                var data = $("form#register").serializeArray();
                // console.log(data)
                var url = "http://"+window.location.hostname+":3001/login/register";
                for(var i = 0 ; i < data.length; ++i){
                   if( data[i].value == "" ) {
                       alert(data[i].name+" cannot be empty!" )
                       return
                   }
                }

                $.post( url ,data,  function( returnable ) {
                    
                    $(setPage(""))
                    
                });
            
        }

        return (
            <Paper style = {styles.outside}>
                <Typography variant = "h4">
                    Register
                </Typography>
                <form id = "register">
                <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Face />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="fname" label="First Name" type="text" name = "First Name" fullWidth autoFocus required />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="lname" label="Last Name" type="text" name = "Last Name" fullWidth autoFocus required />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Face />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="phone" label="phone" type="text" name = "Phone" fullWidth autoFocus required />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Face />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="username" label="Username" type="email" name = "Email" fullWidth autoFocus required />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Fingerprint />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="username" label="Password" type="password" name = "Password" fullWidth required />
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" justify="space-between">
                        <Grid item>
                            <FormControlLabel control={
                                <Checkbox
                                    color="primary"
                                />
                            } label="Remember me" />
                        </Grid>
                    </Grid>
                    <Grid container justify="center" style={{ marginTop: '10px' }}>
                        <Grid item> 
                            <Button variant="outlined" color="primary" style={{ textTransform: "none" }} onClick = {subimitLogin}>Register</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        );
    
}

export default (Register);