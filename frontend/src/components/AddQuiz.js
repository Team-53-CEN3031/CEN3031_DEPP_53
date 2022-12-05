import "./AddQuiz.css";

import {Box, Button, Container, Icon, Paper, TextField, ThemeProvider} from "@mui/material";
import React, {useState} from "react"
import {AddQuestions } from "../components/QuestionBank.js";
import {getTheme} from "../styles/themes/themes";
import Header from "./Header";
import RestartAltIcon from '@mui/icons-material/RestartAlt';

function AddQuiz(){
//use state to keep the current question and the score of the user
    const paperStyle = {padding: '50px 20px', width: 600, margin:'20px auto'}
    const [currQuestion, setCurrQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [final,setFinal] = useState(false); // this is the state to end the game instead of redirecting a new link

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

            let postMessage = "I scored a " + score + " on the recycling quiz!, can you beat me?";
            let p = {postMessage, posterToken};
            fetch("http://localhost:8080/api/post/add", {
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
            redirectFinalPage();
        }

    }

    const nextQuestion = () => {
        setCurrQuestion(currQuestion + 1);
    }
    const redirectFinalPage= () =>
    {
       setFinal(true);
    };

    const restart = () =>
    {
        setScore(0);
        setFinal(false);
        window.location.replace("http://localhost:3000/addquiz");
    };

    function resultsGradeResponse(num){

        if(num == 100)
            return "The most effective way to recycle, is your way";
        else
            return "Nobody's perfect but with an helping hand, you can further benefit the environment by reattempting the quiz!";

    }

    const currTheme = getTheme();

    return (
        <ThemeProvider theme={currTheme}>
            <Paper style = {{minHeight: '100vh'}}>
                <Header/>
                <Paper elevation = {3} style={paperStyle}>

                    {final ? (
                        <div className="Final">
                            <img className = "Recycle" src={require("../images/recycle.png")} alt="recycleLogo"/>}))
                            <h2> Congratulations! You've made it to the end! </h2>
                            <h2> Your Final score: ({(score / AddQuestions.length) * 100}%)</h2>
                            <h4> Always, always  remember to follow your nearby recycling center's protocols on recycling items not listed in our quiz.
                                It is vital for everyone to recycle properly as there are many benefits to our environment.
                            </h4>
                            <h4> Properly recycling would assist
                                our planet to conserve water/timber, reduce waste in our landfills, prevent pollution and saving energy. For more information
                                on recycling, please visit the United States Environment Protection Agency's (EPA) website.</h4>
                            <Button id = "post" variant="contained" color = "primary" onClick={handleClick}>SUBMIT</Button>
                        </div>


                     ):(
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
                        </div>
                        )}
                    <button
                        onClick={restart}
                        className="redirect"
                    >
                        <h2><RestartAltIcon/>restart</h2>
                    </button>
                </Paper>
            </Paper>
        </ThemeProvider>

    );
}


export default AddQuiz;
