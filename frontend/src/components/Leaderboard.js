import {Box, Button, Container, Paper, ThemeProvider} from "@mui/material";
import {useEffect, useState} from "react";
import "../styles/Dashboard.css";
import {useSelector} from "react-redux";
import authToken from "../utils/authToken";
import Header from "./Header";

const {getTheme} = require("../styles/themes/themes.js");

function combineKey(d,id) {
    return d.toString()+id.toString();
}

function About() {

    // paperStyle is used to style the paper component
    const paperStyle = {padding: '50px 20px', width: 600, margin:'20px auto'}
    //quizzes is retrieved from the backend and is used to display the list of quizzes and their registration dates
    const[quizzes,setQuizzes] = useState([])

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
      This function is used to retrieve the list of quizzes from the backend
      It is called when the page is loaded
       */
        fetch("http://localhost:8080/api/quiz/getAll")
            .then(res=>res.json())
            .then((result)=>{
                    setQuizzes(result);
                }
            )
        //For some reason, the code doesn't work if it is imported from another file
        //Likely due to async issues
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
                            <Paper elevation={3} style={paperStyle}>
                                Quizzes
                                {quizzes.map(quiz=>(
                                    <Paper elevation={4} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={combineKey(quiz.quizKey.quizDate,quiz.quizKey.user.id)}>
                                        Score : {quiz.totalScore} <br/>
                                        Date : {quiz.quizKey.quizDate.substring(0,10)} <br/>
                                        UserID: {quiz.quizKey.user.id} <br/>
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

export default About;
