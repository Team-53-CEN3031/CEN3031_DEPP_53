import {Box, Button, Container, Paper, ThemeProvider} from "@mui/material";
import {useEffect, useState} from "react";
import "../styles/Dashboard.css";
import {useSelector} from "react-redux";
import {validateJWT} from "../utils/authToken";
import Header from "./Header";

const {getTheme} = require("../styles/themes/themes.js");

function combineKey(d,id) {
    return d.toString()+id.toString();
}

function Leaderboard() {

    // paperStyle is used to style the paper component
    const paperStyle = {padding: '50px 20px', width: 600, margin:'20px auto'}
    //quizzes is retrieved from the backend and is used to display the list of quizzes and their registration dates
    const[quizzes,setQuizzes] = useState([])
    const[selectedDate,setSelectedDate] = useState(new Date().toISOString().substring(0,10));
    const currTheme = getTheme();

    useEffect(()=>{
        /*
      This function is used to retrieve the list of quizzes from the backend
      It is called when the page is loaded
       */
        fetch("http://localhost:8080/api/quiz/get/"+selectedDate)
            .then(res=>res.json())
            .then((result)=>{
                    setQuizzes(result);
                }
            )
        validateJWT();

        if(localStorage.getItem('theme') === null) {
            localStorage.setItem('theme', 'light');
        }

    },[])

    async function reloadQuizzes(d) {
        await new Promise(resolve => {
            fetch("http://localhost:8080/api/quiz/get/"+d)
                .then(res=>res.json())
                .then((result)=>{
                        setQuizzes(result);
                    }
                )
            resolve();
        })
    }


    const onChangeDate = e => {
        //set SelectedDate to the value of the date selected
        setSelectedDate(e.target.value);
        //update the list of quizzes
        //and reload the component
        reloadQuizzes(e.target.value)
    };
    //get today in YYYY-MM-DD format
    const today = new Date().toISOString().slice(0,10);
    return (
        <ThemeProvider theme={currTheme}>
            <Paper style = {{minHeight: '100vh', display:'flex', flexDirection:'column'}}>
                <Header/>
                <Paper className="dashboard" style={paperStyle}>
                    <label htmlFor="start">Leaderboard date:</label>
                    <input type="date" id="start" name="trip-start"
                           value={selectedDate}
                           min="2022-01-01" max={today} onChange={onChangeDate}>
                    </input>
                    <div className="userpostcontainer">
                        <Container>
                            <Paper elevation={3} style={paperStyle}>
                                Quizzes
                                {quizzes.map(quiz=>(
                                    <Paper elevation={4} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={combineKey(quiz.totalScore,quiz.quizKey.user.id)}>
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

export default Leaderboard;
