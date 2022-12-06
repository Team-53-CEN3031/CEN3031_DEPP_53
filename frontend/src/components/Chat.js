import React, {useEffect, useState} from "react"
import {validateJWT} from "../utils/authToken";
import {Box, Button, Link, MenuItem, Paper, TextField, ThemeProvider} from "@mui/material";
import {getTheme} from "../styles/themes/themes";
import Header from "./Header";
import PortraitIcon from "@mui/icons-material/Portrait";
import {backendDomain} from "../utils/backendDomain";

function printDate(d) {
    if(d == null) {
        return 'Unknown';
    } else {
        return d.substring(0,10);
    }
}


function Chat() {
    const [currUserId, setCurrUserId] = useState(-1);
    useEffect(()=>{
        if(!validateJWT()) {
            //if token is not valid, redirect to login page
            window.location.href = "/login";
        }
        const jwt = localStorage.getItem('jwtToken');
        fetch(backendDomain + "/api/auth/getIdFromToken", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(jwt)
        }).then((res)=>{
            res.json().then((data)=>{

                setCurrUserId(data);
            })
        })
        fetch(backendDomain + "/api/user/chat/get/" , {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(jwt)
        }).then((res)=>{
            res.json().then((result)=>{
                setAllMessages(result);
            })
        })

        if(localStorage.getItem('theme') === null) {
            localStorage.setItem('theme', 'light');
        }
        document.getElementById('previous_chats').style.display = 'block';
        document.getElementById('new_chat').style.display = 'none';

    },[])
    const currTheme = getTheme();
    function printPreviousMessages(messages,currUserId) {
        console.log(messages);
        //iterate over previous messages and show the latest one per user
        let prevMessages = [];
        let users = [];
        for(let i = 0; i < messages.length; i++) {
            const personOne = messages[i].sender.id;
            const personTwo = messages[i].receiver.id;
            //check to see if the user is already in the list
            let notCurrUser;
            if(personOne === currUserId) {
                notCurrUser = personTwo;
            } else {
                notCurrUser = personOne;
            }
            //check to see if the user is already in the list
            if(users.includes(notCurrUser)) {
                //if the user is already in the list, check to see if the message is newer
                let index = users.indexOf(notCurrUser);
                let currMessage = prevMessages[index];
                if(currMessage.chatTime < messages[i].chatTime) {
                    prevMessages[index] = messages[i];
                }
            } else {
                //if the user is not in the list, add them
                users.push(notCurrUser);
                prevMessages.push(messages[i]);

            }
        }
        return prevMessages;
    }

    const handleClick=(e)=> {
        if(e.target.id === "send_message") {
            e.preventDefault();
            if(localStorage.getItem('jwtToken') == null) {
                return;
            }
            const receiverId = 16;
            const userToken = localStorage.getItem('jwtToken');
            let c = {userToken, chatMessage, receiverId};
            fetch(backendDomain + "/api/user/chat/send", {
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
    const [allMessages, setAllMessages] = useState([]);
    const [chatMessage, setChatMessage] = useState('');
    const [receiverEmail, setReceiverEmail] = useState('');
    function linkToChat(message) {
        let id;

        if(message.sender.id === currUserId) {
            id = message.receiver.id;
        } else {
            id = message.sender.id;
        }
        return "/chat/" + id;
    }

    function getLatestMessage(){
        if(allMessages.length === 0) {
            return <MenuItem> No Previous Messages </MenuItem>
        } else {
            let prevMessages = printPreviousMessages(allMessages,currUserId);
            return (prevMessages.map(message=>(
                <Paper elevation={2} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={message.chatId}>
                    <MenuItem component={Link} href = {"/user/"+message.sender.id} >
                        <PortraitIcon/> &nbsp; { message.sender.name}<br/>
                    </MenuItem>
                    <MenuItem component={Link} href = {linkToChat(message)}>
                        Date: {printDate(message.chatTime)} <br/>
                        Message : {message.chatMessage} <br/>
                    </MenuItem>
                </Paper>
            )))
        }

    }
    return (
        <ThemeProvider theme={currTheme} style = {{minHeight: '100vh'}}>
            <Header/>
            <Paper>
                <div id="new_chat">
                    <Button id = "new_message" variant="contained" color = "primary" onClick={handleClick}>New Message</Button>
                    <Box component="form" sx={{'& > :not(style)': { m: 1 },}} noValidate autoComplete="off">
                        <TextField id="outlined-basic" label="Email of recipient" variant="outlined" fullWidth value = {receiverEmail} onChange={(e)=>setReceiverEmail(e.target.value)}/>
                    </Box>
                    <Box component="form" sx={{'& > :not(style)': { m: 1 },}} noValidate autoComplete="off">
                        <TextField id="outlined-basic" label="Send Message" variant="outlined" fullWidth value = {chatMessage} onChange={(e)=>setChatMessage(e.target.value)}/>
                    </Box>
                    <div className="center">
                        <Button id = "send_message" variant="contained" color = "primary" onClick={handleClick}>SUBMIT</Button>
                    </div>
                </div>
                <div id="previous_chats">
                    <Button id = "previous_message" variant="contained" color = "primary" onClick={handleClick}>Chat Logs</Button>
                    {getLatestMessage()}
                </div>
            </Paper>

        </ThemeProvider>
    )
}

export default (Chat);
