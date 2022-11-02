import "./AddQuiz.css";

import {Box, Button, Container, Paper, TextField} from "@mui/material";
import React, {useState} from "react"
import {AddQuestions } from "../components/QuestionBank.js";

function AddQuiz(){
//use state to keep the current question and the score of the user
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

    return (
        <div className="AddQuiz">
            <h1>Do You Recycle Properly? Quiz</h1>
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

            <div className="redirect">

                <button onClick={restart}>
                    Restart
                </button>
                &nbsp;

                <button  onClick={redirectHomePage}>
                    Homepage
                </button>

            </div>

        </div>

    )
}

export default AddQuiz;
