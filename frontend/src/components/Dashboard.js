import {Box, Button, Container, Link, MenuItem, Paper, ThemeProvider} from "@mui/material";
import {useEffect, useState} from "react";
import "../styles/Dashboard.css";
import {useSelector} from "react-redux";
import {validateJWT} from "../utils/authToken";
import Header from "./Header";
import PortraitIcon from '@mui/icons-material/Portrait';

const {getTheme} = require("../styles/themes/themes.js");

function printDate(d) {
    if(d == null) {
        return 'Unknown';
    } else {
        return d.substring(0,10);
    }
}

function Dashboard() {

    // paperStyle is used to style the paper component
    const paperStyle = {padding: '50px 20px', width: 600, margin:'20px auto'}
    const[posts,setPosts] = useState([])

    const currTheme = getTheme();

    useEffect(()=>{
        /*
      This function is used to retrieve the list of users from the backend
      It is called when the page is loaded
       */
        fetch("http://localhost:8080/api/post/getAll")
            .then(res=>res.json())
            .then((result)=>{
                    setPosts(result);
                }
            )
        validateJWT();

    },[])

    return (
        <ThemeProvider theme={currTheme}>
            <Paper style = {{minHeight: '100vh', display:'flex', flexDirection:'column'}}>
                <Header/>
                <div style = {paperStyle}>
                    <Paper className="dashboard" >
                        <div className="userpostcontainer">
                            <Container>
                                {/*Paper component is used to style the form  Paper is just a container with a shadow */}
                                <Paper elevation={3} style={paperStyle}>
                                    Posts
                                    {/* This is used to display the list of users and their registration dates map is used to iterate through the list of users given by the backend */}
                                    {posts.map(post=>(
                                        <Paper elevation={2} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={post.postId}>
                                            <MenuItem component={Link} href = {"/user/"+post.user.id} >
                                                <PortraitIcon/> &nbsp; { post.user.name}<br/>
                                            </MenuItem>
                                            <MenuItem component={Link} href = {"/post/"+post.postId} >
                                                Date: {printDate(post.postTime)} <br/>
                                                Message : {post.postMessage} <br/>
                                            </MenuItem>
                                        </Paper>
                                    )).reverse()}
                                </Paper>
                            </Container>
                        </div>
                    </Paper>
                </div>
            </Paper>
        </ThemeProvider>
    );
}

export default Dashboard;
