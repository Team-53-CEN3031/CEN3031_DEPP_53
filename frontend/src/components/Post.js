import {Box, Button, Container, Paper, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import "../styles/Login.css";

function Post() {
    // paperStyle is used to style the paper component
    const paperStyle = {padding: '50px 20px', width: 600, margin:'20px auto'}

    const[postMessage, setPostMessage] = useState('');

    function post(postMessage) {

    }

    const handleClick=(e)=> {
        // Check source of event
        if(e.target.id === 'post') {
            e.preventDefault();
            //Validate JWT
            const posterToken = localStorage.getItem('jwtToken');
            if(posterToken == null) {
                //User tried to post without being logged in
                return;
            }
            let p = {postMessage, posterToken};
            fetch("http://localhost:8080/api/post/add", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(p)
            }).then((res)=>{
                if(res.status === 200) {
                    post(postMessage);
                }
            })
        }
    }
    return (
        <div className="login">
            <div className="header">
                <Paper elevation = {3} style={paperStyle}>
                    <h1 style = {{color: 'salmon'}}> Post</h1>
                    <Box component="form" sx={{'& > :not(style)': { m: 1 },}} noValidate autoComplete="off">
                        <TextField id="outlined-basic" label="PostMessage" variant="outlined" fullWidth value = {postMessage} onChange={(e)=>setPostMessage(e.target.value)}/>
                    </Box>
                    <Button id = "post" variant="contained" color = "secondary" onClick={handleClick}>SUBMIT</Button>
                </Paper>
            </div>
        </div>
    );
}

export default Post;
