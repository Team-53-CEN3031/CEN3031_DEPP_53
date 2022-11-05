import React, {useEffect, useState} from "react"
import authToken from "../utils/authToken";
import {Button, Container, Paper, ThemeProvider} from "@mui/material";
import {getTheme} from "../styles/themes/themes";
import Header from "./Header";


function Settings() {
    useEffect(()=>{
        if (localStorage.jwtToken) {
            authToken(localStorage.jwtToken);
            //header = Authorization: Bearer ${localStorage.jwtToken}
            fetch("http://localhost:8080/api/auth/validateJWT", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: localStorage.jwtToken
            }).then((res)=>{
                if(res.status === 401) {
                    localStorage.removeItem('jwtToken');
                }
            })
        }

        if(localStorage.getItem('theme') === null) {
            localStorage.setItem('theme', 'light');
        }

    },[])

    const handleClick=(e)=> {
        if(e.target.id === 'change_theme') {
            e.preventDefault();
            if(localStorage.getItem('theme') === 'light') {
                localStorage.setItem('theme', 'dark');
            } else if (localStorage.getItem('theme') === 'dark') {
                localStorage.setItem('theme', 'light');
            } else {
                localStorage.setItem('theme', 'dark');
            }
            window.location.reload();
        }
    }
    const paperStyle = {padding: '50px 20px', width: 600, margin:'20px auto'}

    const currTheme = getTheme();
    return (
        <ThemeProvider theme={currTheme}>
            <Paper style = {{minHeight: '100vh', display:'flex', flexDirection:'column'}}>
                <Header/>
                <Paper className="settings" style={paperStyle}>
                    <Container style={{display:'flex', flexDirection:'column'}}>
                        <div style={{display:'flex', alignItems:'center',justifyContent:'center'}}>
                            <h2 style={{width:'70%'}}>Change Theme</h2>
                            <Button style={{width:'30%'}} id="change_theme" onClick={handleClick} variant="contained" color="primary">Change</Button>
                        </div>
                    </Container>
                </Paper>
            </Paper>
        </ThemeProvider>
    )
}

export default (Settings);
