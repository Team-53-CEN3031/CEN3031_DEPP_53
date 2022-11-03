import "./AddQuiz.css";

import {Box, Button, Container, Icon, Paper, TextField, ThemeProvider} from "@mui/material";
import React, {useState} from "react"
import {AddQuestions } from "../components/QuestionBank.js";
import {getTheme} from "../styles/themes/themes";
import Header from "./Header";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import HomeIcon from "@mui/icons-material/Home";

function AddQuiz(){
//use state to keep the current question and the score of the user
    const paperStyle = {padding: '50px 20px', width: 600, margin:'20px auto'}
    const [currQuestion, setCurrQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [results,setResults] = useState(false);

//Responses will be tracked with use state.


    const handleSubmit = (event) => {

    }

    const optionChoosen = (right) =>
    {
        if( right == 1) // one for true bc 'true' gave issues
        {
            setScore(score+1);
        }

        if((currQuestion + 1) < AddQuestions.length)
        nextQuestion();
        else
        {
            //add a redirect link to whatever and end game
        }

    }

    const nextQuestion = () => {
        setCurrQuestion(currQuestion + 1);
    }
    const redirectHomePage = () =>
    {
        window.location.replace("http://localhost:3000/quiz");
    };

    const restart = () =>
    {
        window.location.replace("http://localhost:3000/addquiz");
    };

    const currTheme = getTheme();

    return (
        <ThemeProvider theme={currTheme}>
            <Paper style = {{minHeight: '100vh'}}>
                <Header/>
                <Paper elevation = {3} style={paperStyle}>
        <div className="AddQuiz">
            <h1>Do You Recycle Properly?</h1>
            <h2>Take the quiz now to find out..</h2>

            <div className="ShowResults">
                <p>Your questions right: <var>{score}</var> / <var>{AddQuestions.length}</var></p>
            </div>

            <div className = "QuizQuestions">
                <h3>{AddQuestions[currQuestion].text}</h3>
                <ul>
                    {AddQuestions[currQuestion].options.map((option) => {
                        return (
                            <li
                                key={option.id}
                                onClick={() => optionChoosen(option.isCorrect)}
                            >
                                {option.text}
                            </li>
                        );
                    })}
                </ul>
            </div>
                <button
                        onClick={restart}
                        className="redirect"
                    >
                    <h2><RestartAltIcon/>restart</h2>
                </button>

        </div>
                </Paper>
            </Paper>
        </ThemeProvider>

    )
}

export default AddQuiz;
