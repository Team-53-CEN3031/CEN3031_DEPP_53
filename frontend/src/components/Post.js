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

        if(!validateJWT()) {
            fetch("http://localhost:8080/api/post/getCommentsOf/"+id)
                .then(res=>res.json())
                .then((result)=>{
                        setComment(result);
                    }
                )
        } else {
            const jwt = localStorage.getItem('jwtToken');
            fetch("http://localhost:8080/api/post/getCommentsOf/"+id, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(jwt)
            }).then(res=>res.json())
                .then((result)=>{
                        setComment(result);
                    }
                )
        }


        if(localStorage.getItem('theme') === null) {
            localStorage.setItem('theme', 'light');
        }

    },[])
    const[post,setPost] = useState(null);
    const currTheme = getTheme();

    const handleClick=(e)=> {
        if(e.target.id === 'comment'){
            let commenterToken = localStorage.getItem('jwtToken');
            let c = {commentMessage, postId:id, commenterToken};
            //create a variable that is postId cast to a string

            fetch("http://localhost:8080/api/post/postComment/"+id, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(c)
            }).then((res)=>{
                if(res.status === 200) {
                    window.location.reload();
                }
            })
        }
    }

    function getComment() {
        if(comment== null) {
            return <div>Loading...</div>
        }
        return (comment.map(c=>(
            <Paper elevation={0} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={c.commentId}>
                <MenuItem component={Link} href = {"/user/"+c.user.id} >
                    <PortraitIcon/> &nbsp; {c.user.name}<br/>
                </MenuItem>
                Date: {printDate(c.commentTime)} <br/>
                Message : {c.commentMessage} <br/>
            </Paper>
        )))

    }
    const [comment,setComment] = useState(null);
    const [commentMessage, setCommentMessage] = useState('');

    return (
        <ThemeProvider theme={currTheme} style = {{minHeight: '100vh'}}>
            <Header/>
            <Paper>
                <Paper>
                    <Paper elevation={3} style = {paperStyle}>
                        Post
                        {getPost()}
                        {getComment()}
                        <Paper elevation = {0}>
                            <h1 className="center"> Comment </h1>
                            <Box component="form" sx={{'& > :not(style)': { m: 1 },}} noValidate autoComplete="off">
                                <TextField id="outlined-basic" label="Create Comment Message" variant="outlined" fullWidth value = {commentMessage} onChange={(e)=>setCommentMessage(e.target.value)}/>
                            </Box>
                            <div className="center">
                                <Button id = "comment" variant="contained" color = "primary" onClick={handleClick}>SUBMIT</Button>
                            </div>
                        </Paper>
                    </Paper>
                </Paper>
            </Paper>

        </ThemeProvider>
    )
}

export default (Post);
