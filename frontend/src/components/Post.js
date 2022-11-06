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

function Post() {
    let {id} = useParams();
    const paperStyle = {padding: '50px 20px', width: 600, margin:'20px auto'}
    function getPost() {
        if(post== null) {
            return <div>Loading...</div>
        }
        return (<Paper elevation={2} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={post.postId}>
            <MenuItem component={Link} href = {"/user/"+post.user.id} >
                <PortraitIcon/> &nbsp; {post.user.name}<br/>
            </MenuItem>
            Date: {printDate(post.postTime)} <br/>
            Message : {post.postMessage} <br/>
        </Paper>)
    }
    useEffect(()=>{
        if(isNaN(id)) {
            //User entered non integer value for id
            window.location.href = "/404";
        }
        id = parseInt(id);
        fetch("http://localhost:8080/api/post/getPost/"+id)
            .then(res=>res.json())
            .then((result)=>{
                    setPost(result);
                    if(result.id === -1) {
                        window.location.href = "/404";
                    }
                }
            )
        validateJWT();

        if(localStorage.getItem('theme') === null) {
            localStorage.setItem('theme', 'light');
        }

    },[])
    const[post,setPost] = useState(null);
    const currTheme = getTheme();
    return (
        <ThemeProvider theme={currTheme} style = {{minHeight: '100vh'}}>
            <Header/>
            <Paper>
                <Paper>
                    <Paper elevation={3} style = {paperStyle}>
                        Post
                        {getPost()}
                    </Paper>
                </Paper>
            </Paper>

        </ThemeProvider>
    )
}

export default (Post);
