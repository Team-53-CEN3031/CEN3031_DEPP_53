import {Box, Button, Paper, TextField, ThemeProvider} from "@mui/material";
import {useEffect, useState} from "react";
import "../styles/Post.css";
import Header from "./Header";
import {getTheme} from "../styles/themes/themes";
import {validateJWT} from "../utils/authToken";
import {backendDomain} from "../utils/backendDomain";


function CreatePost() {
    // paperStyle is used to style the paper component
    const paperStyle = {padding: '50px 20px', width: 600, margin:'20px auto'}

    const[postMessage, setPostMessage] = useState('');



    useEffect(()=>{
        if (!validateJWT()) {
            window.location.href = "/login";
        }
    },[])

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
            fetch(backendDomain+"/api/post/add", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(p)
            }).then((res)=>{
                if(res.status === 200) {
                    window.location.href = "/dashboard";
                }
            })
        }
    }

    const currTheme = getTheme();

    return (
        <ThemeProvider theme={currTheme}>
            <Paper style = {{height: '100vh'}}>
                <Header/>
                <Paper elevation = {3} style={paperStyle}>
                    <h1 className="center"> Create Post</h1>
                    <Box component="form" sx={{'& > :not(style)': { m: 1 },}} noValidate autoComplete="off">
                        <TextField id="outlined-basic" label="Create Post Message" variant="outlined" fullWidth value = {postMessage} onChange={(e)=>setPostMessage(e.target.value)}/>
                    </Box>
                    <div className="center">
                        <Button id = "post" variant="contained" color = "primary" onClick={handleClick}>SUBMIT</Button>
                    </div>
                </Paper>
            </Paper>
        </ThemeProvider>
    );
}

export default CreatePost;
