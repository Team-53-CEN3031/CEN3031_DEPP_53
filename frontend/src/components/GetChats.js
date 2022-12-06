import React, {useEffect, useState} from "react"
import {validateJWT} from "../utils/authToken";
import {Box, Button, Container, Link, MenuItem, Paper, TextField, ThemeProvider} from "@mui/material";
import {getTheme} from "../styles/themes/themes";
import {useParams} from "react-router-dom";
import Header from "./Header";
import PortraitIcon from "@mui/icons-material/Portrait";
import {backendDomain} from "../utils/backendDomain";

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

function checkIfEmpty(messages) {
    if(messages.length === 0) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <h1> No Messages </h1>
            </Box>
        )
    }
}

function GetChats() {

    let {id} = useParams();
    const paperStyle = {padding: '50px 20px', width: 600, margin:'20px auto'}
    useEffect(()=>{
        //check if jwt exists

        if(!validateJWT()) {
            window.location.href = "/login";
            return;
        }
        if(isNaN(id)) {
            //User entered non integer value for id
            window.location.href = "/404";
            return;
        }
        id = parseInt(id);
        const jwt = localStorage.getItem('jwtToken');
        fetch(backendDomain+"/api/user/chat/get/" + id, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(jwt)
        }).then((res)=>{
            res.json().then((result)=>{
                setMessages(result);
            })
        })

        if(localStorage.getItem('theme') === null) {
            localStorage.setItem('theme', 'light');
        }

    },[])
    const currTheme = getTheme();
    const [messages, setMessages] = useState([]);
    const handleClick=(e)=> {
        if(e.target.id === "send_message") {
            e.preventDefault();
            if(localStorage.getItem('jwtToken') == null) {
                return;
            }
            const receiverId = id;
            const userToken = localStorage.getItem('jwtToken');
            const receiverEmail = null;
            let c = {userToken, chatMessage, receiverId, receiverEmail};
            fetch(backendDomain+"/api/user/chat/send", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(c)
            }).then((res)=>{

            })
        } else if(e.target.id === "previous_message") {
            document.getElementById('previous_chats').style.display = 'none';
            document.getElementById('new_chat').style.display = 'block';
        } else if(e.target.id === "new_message") {
            document.getElementById('previous_chats').style.display = 'block';
            document.getElementById('new_chat').style.display = 'none';
        }

    }

    const [chatMessage, setChatMessage] = useState('');

    return (
        <ThemeProvider theme={currTheme} style = {{minHeight: '100vh'}}>
            <Header/>
            <Paper>
                <Container>
                    {/*Paper component is used to style the form  Paper is just a container with a shadow */}
                    <Paper elevation={3} style={paperStyle}>
                        Chat History
                        {checkIfEmpty(messages)}
                        {messages.map(message=>(
                            <Paper elevation={2} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={message.chatId}>
                                <MenuItem component={Link} href = {"/user/"+message.sender.id} >
                                    <PortraitIcon/> &nbsp; { message.sender.name}<br/>
                                </MenuItem>
                                <MenuItem>
                                    Date: {printDate(message.chatTime)} <br/>
                                    Message : {message.chatMessage} <br/>
                                </MenuItem>
                            </Paper>
                        ))}
                        <Button id = "new_message" variant="contained" color = "primary" onClick={handleClick}>New Message</Button>
                        <Box component="form" sx={{'& > :not(style)': { m: 1 },}} noValidate autoComplete="off">
                            <TextField id="outlined-basic" label="Send Message" variant="outlined" fullWidth value = {chatMessage} onChange={(e)=>setChatMessage(e.target.value)}/>
                        </Box>
                        <div className="center">
                            <Button id = "send_message" variant="contained" color = "primary" onClick={handleClick}>SUBMIT</Button>
                        </div>
                    </Paper>
                </Container>
            </Paper>

        </ThemeProvider>
    )
}

export default (GetChats);
