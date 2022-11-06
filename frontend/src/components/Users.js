import React, {useEffect, useState} from "react"
import {validateJWT} from "../utils/authToken";
import {Link, MenuItem, Paper, ThemeProvider} from "@mui/material";
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

function Users() {
    let {id} = useParams();
    const paperStyle = {padding: '50px 20px', width: 600, margin:'20px auto'}

    const[user,setUser] = useState('')
    useEffect(()=>{
        if(isNaN(id)) {
            //User entered non integer value for id
            window.location.href = "/404";
        }
        id = parseInt(id);
        console.log(id);
        fetch("http://localhost:8080/api/user/get/"+id)
            .then(res=>res.json())
            .then((result)=>{
                    setUser(result);
                    if(result.id === -1) {
                        window.location.href = "/404";
                    }
                }
            )
        fetch("http://localhost:8080/api/post/getPostsFrom/"+id)
            .then(res=>res.json())
            .then((result)=>{
                    setPosts(result);
                }
            )
        validateJWT();

        if(localStorage.getItem('theme') === null) {
            localStorage.setItem('theme', 'light');
        }

    },[])
    const[posts,setPosts] = useState([]);
    const currTheme = getTheme();
    return (
        <ThemeProvider theme={currTheme} style = {{minHeight: '100vh'}}>
            <Header/>
            <Paper>
                <Paper style = {{ display:'flex', flexDirection:'column'}}>
                    <Paper elevation={4} style={{margin:"10px",padding:"15px", textAlign:"left"}} >
                        Name: {user.name}
                    </Paper>
                    <Paper elevation={4} style={{margin:"10px",padding:"15px", textAlign:"left"}} >
                        Email: {user.email}
                    </Paper>
                    <Paper elevation={4} style={{margin:"10px",padding:"15px", textAlign:"left"}} >
                        Registration Date: {printDate(user.registrationDate)}
                    </Paper>
                </Paper>
                <Paper>
                    <Paper elevation={3} style = {paperStyle}>
                        Posts
                        {/* This is used to display the list of users and their registration dates map is used to iterate through the list of users given by the backend */}
                        {posts.map(post=>(
                            <Paper elevation={2} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={post.postId}>
                                <MenuItem component={Link} href = {"/user/"+post.user.id} >
                                    <PortraitIcon/> &nbsp; { post.user.name}<br/>
                                </MenuItem>
                                Date: {printDate(post.postTime)} <br/>
                                Message : {post.postMessage} <br/>
                            </Paper>
                        )).reverse()}
                    </Paper>
                </Paper>
            </Paper>

        </ThemeProvider>
    )
}

export default (Users);
