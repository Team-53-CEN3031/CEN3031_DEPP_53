import {Box, Button, Container, Paper, ThemeProvider} from "@mui/material";
import {useEffect, useState} from "react";
import "../styles/Dashboard.css";
import {useSelector} from "react-redux";
import authToken from "../utils/authToken";
import Header from "./Header";

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
    //users is retrieved from the backend and is used to display the list of users and their registration dates
    const[users,setUsers] = useState([])
    const[posts,setPosts] = useState([])

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

    const currTheme = getTheme();

    useEffect(()=>{
        /*
      This function is used to retrieve the list of users from the backend
      It is called when the page is loaded
       */
        fetch("http://localhost:8080/api/user/getAll")
            .then(res=>res.json())
            .then((result)=>{
                    setUsers(result);
                }
            )
        fetch("http://localhost:8080/api/post/getAll")
            .then(res=>res.json())
            .then((result)=>{
                    setPosts(result);
                }
            )
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

    return (
        <ThemeProvider theme={currTheme}>
            <Paper style = {{minHeight: '100vh', display:'flex', flexDirection:'column'}}>
                <Header/>
                <Paper className="dashboard" style={paperStyle}>
                    <Paper elevation = {3} className="header">
                        <Button id = "change_theme" variant="contained" color = "primary" style = {{margin:'2%'}}onClick={handleClick}>Change Theme</Button>
                    </Paper>
                    <div className="userpostcontainer">
                        <Container>
                            {/*Paper component is used to style the form Paper is just a container with a shadow */}
                            <Paper elevation={3} style={paperStyle}>
                                Users
                                {/* This is used to display the list of users and their registration dates map is used to iterate through the list of users given by the backend  */}
                                {users.map(user=>(
                                    <Paper elevation={4} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={user.id}>
                                        Name: {user.name}<br/>
                                        Date: {printDate(user.registrationDate)} <br/>
                                        Email : {user.email} <br/>
                                    </Paper>
                                ))}
                            </Paper>
                        </Container>
                        <Container>
                            {/*Paper component is used to style the form
                Paper is just a container with a shadow
                */}
                            <Paper elevation={3} style={paperStyle}>
                                Posts
                                {/*
                    This is used to display the list of users and their registration dates
                    map is used to iterate through the list of users given by the backend
                    */}
                                {posts.map(post=>(
                                    <Paper elevation={4} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={post.postId}>
                                        PostID: {post.postId}<br/>
                                        PosterID: {post.posterId}<br/>
                                        Date: {printDate(post.postTime)} <br/>
                                        Message : {post.postMessage} <br/>
                                    </Paper>
                                ))}
                            </Paper>
                        </Container>
                    </div>
                </Paper>
            </Paper>
        </ThemeProvider>
    );
}

export default Dashboard;
