import React, {useEffect, useState} from "react"
import {validateJWT} from "../utils/authToken";
import {Box, Button, Link, MenuItem, Paper, TextField, ThemeProvider} from "@mui/material";
import {getTheme} from "../styles/themes/themes";
import {useParams} from "react-router-dom";
import Header from "./Header";
import PortraitIcon from "@mui/icons-material/Portrait";

function printDate(d) {
    if(d == null) {
        return 'Unknown';
    } else {
        return d.substring(0,10);
    }
}

function Chat() {
    const paperStyle = {padding: '50px 20px', width: 600, margin:'20px auto'}
    useEffect(()=>{
        if(!validateJWT()) {
            //if token is not valid, redirect to login page
            window.location.href = "/login";
        }


        if(localStorage.getItem('theme') === null) {
            localStorage.setItem('theme', 'light');
        }

    },[])
    const currTheme = getTheme();

    const handleClick=(e)=> {
        if(e.target.id === "send_message") {
            e.preventDefault();
            if(localStorage.getItem('jwtToken') == null) {
                return;
            }
            const receiverId = 19;
            const userToken = localStorage.getItem('jwtToken');
            let c = {userToken, chatMessage, receiverId};
            fetch("http://localhost:8080/api/user/chat/send", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(c)
            }).then((res)=>{
                console.log(res);

            })
        }
    }

    const [chatMessage, setChatMessage] = useState('');

    return (
        <ThemeProvider theme={currTheme} style = {{minHeight: '100vh'}}>
            <Header/>
            <Paper>
                <Box component="form" sx={{'& > :not(style)': { m: 1 },}} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Send Message" variant="outlined" fullWidth value = {chatMessage} onChange={(e)=>setChatMessage(e.target.value)}/>
                </Box>
                <div className="center">
                    <Button id = "send_message" variant="contained" color = "primary" onClick={handleClick}>SUBMIT</Button>
                </div>
            </Paper>

        </ThemeProvider>
    )
}

export default (Chat);
