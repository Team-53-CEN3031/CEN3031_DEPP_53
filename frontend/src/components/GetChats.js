import React, {useEffect, useState} from "react"
import {validateJWT} from "../utils/authToken";
import {Box, Button, Container, Link, MenuItem, Paper, TextField, ThemeProvider} from "@mui/material";
import {getTheme} from "../styles/themes/themes";
import {useParams} from "react-router-dom";
import Header from "./Header";
import PortraitIcon from "@mui/icons-material/Portrait";

function printDate(d) {
    if(d == null) {
        return 'Unknown';
    } else {
        //convert date into a readable format in mm/dd hh:mm
        //in local time
        let date = new Date(d);
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let ampm = hour >= 12 ? 'pm' : 'am';
        if(hour < 1) {
            hour = 12;
            ampm = 'am';
        }
        if(hour > 12) {
            hour = hour - 12;
            ampm = 'pm';
        }
        return month + "/" + day + " " + hour + ":" + minute + " " + ampm;
    }
}

function GetChats() {
    const paperStyle = {padding: '50px 20px', width: 600, margin:'20px auto'}
    useEffect(()=>{
        if(!validateJWT()) {
            //if token is not valid, redirect to login page
            window.location.href = "/login";
        }
        const jwt = localStorage.getItem('jwtToken');
        fetch("http://localhost:8080/api/user/chat/get", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(jwt)
        }).then((res)=>{
            res.json().then((result)=>{
                setMessages(result);
                console.log(result);
            })
        })

        if(localStorage.getItem('theme') === null) {
            localStorage.setItem('theme', 'light');
        }

    },[])
    const currTheme = getTheme();
    const [messages, setMessages] = useState([]);
    return (
        <ThemeProvider theme={currTheme} style = {{minHeight: '100vh'}}>
            <Header/>
            <Paper>
                <Container>
                    {/*Paper component is used to style the form  Paper is just a container with a shadow */}
                    <Paper elevation={3} style={paperStyle}>
                        Chat History
                        {messages.map(message=>(
                            <Paper elevation={2} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={message.chatId}>
                                <MenuItem component={Link} href = {"/user/"+message.receiver.id} >
                                    <PortraitIcon/> &nbsp; { message.receiver.name}<br/>
                                </MenuItem>
                                <MenuItem>
                                    Date: {printDate(message.chatTime)} <br/>
                                    Message : {message.chatMessage} <br/>
                                </MenuItem>
                            </Paper>
                        )).reverse()}
                    </Paper>
                </Container>
            </Paper>

        </ThemeProvider>
    )
}

export default (GetChats);
