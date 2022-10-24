import "../styles/SignUp.css";
import {Box, Button, Container, Paper, TextField} from "@mui/material";
import React, {useState} from "react"
import { Questions } from "../components/QuestionBank.js";

function Quiz(){
//use state to keep the current question and the score of the user
const [currQuestion, setCurrQuestion] = useState(0);
const [score, setScore] = useState(0);

//Responses will be tracked with use state.
//initial state will be an object with 8 different values, one for each question
const [responses, setResponses] = useState({
    question1: 0,
    question2: 0,
    question3: 0,
    question4: 0,
    question5: 0,
    question6: 0,
    question7: false,
    question8: false,
})

const handleSubmit = (event) => {
    
}

const nextQuestion = () => {
    setCurrQuestion(currQuestion + 1);
}
const previousQuestion = () =>
{
    if (currQuestion != 0)
        setCurrQuestion(currQuestion - 1)
};
    return (
        <div className="Quiz">
            <h1>Enviro Quiz</h1>
            <h2>Take the quiz now to find out your carbon footprint</h2>
            <div>
                <h3>{Questions[currQuestion]}</h3>
                <div className = "answerForm">
                    <form >
                        <input
                            id= "answer"
                            class= "form-field"
                            type = "number"
                        />
                    </form>
                </div> 

                <button onClick={previousQuestion}>
                Previous Question
                </button>
                {currQuestion == Questions.length-1 ? (
                <button> Finish Quiz</button>
                ) : (
                <button onClick={nextQuestion}> Next Question </button>
                )}
            </div>

        </div>
    )
}

export default Quiz;