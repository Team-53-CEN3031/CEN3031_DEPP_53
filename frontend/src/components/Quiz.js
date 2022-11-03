import {Box, Button, Container, Icon, Paper, TextField, ThemeProvider} from "@mui/material";
import React, {useState} from "react"
import { Questions } from "../components/QuestionBank.js";
import HomeIcon from '@mui/icons-material/Home';
import FlightIcon from '@mui/icons-material/Flight';
import DeleteIcon from '@mui/icons-material/Delete';
import {getTheme} from "../styles/themes/themes";
import Header from "./Header";


function Quiz(){
    const paperStyle = {padding: '50px 20px', width: 600, margin:'20px auto'}
    const [score, setScore] = useState(0);

//Responses will be tracked with use state.
//initial state will be an object with 8 different values, one for each question
    const [responses, setResponses] = useState({
        question0: 0,
        question1: 0,
        question2: 0,
        question3: 0,
        question4: 0,
        question5: 0,
        question6: true,
        question7: true,
    })

//This handleQChange functions, are made to change the specified property of the responses useState, while preserving the other properties (...responses).
    const handleQ0Change = (event) => { setResponses({...responses, question0: event.target.value})}
    const handleQ1Change = (event) => { setResponses({...responses, question1: event.target.value})}
    const handleQ2Change = (event) => { setResponses({...responses, question2: event.target.value})}
    const handleQ3Change = (event) => { setResponses({...responses, question3: event.target.value})}
    const handleQ4Change = (event) => { setResponses({...responses, question4: event.target.value})}
    const handleQ5Change = (event) => { setResponses({...responses, question5: event.target.value})}
    const handleQ6True = (event) => { setResponses({...responses, question6: true})}
    const handleQ6False = (event) => { setResponses({...responses, question6: false})}
    const handleQ7True = (event) => { setResponses({...responses, question7: true})}
    const handleQ7False = (event) => { setResponses({...responses, question7: false})}

//called on submit button onClick.
//calculates carbon emission and stores updates score useState with the user's carbon emission result
    const handleSubmit = (event) => {
        let score = 0;
        score+= Number(responses.question0) * 105;
        score+= Number(responses.question1) * 105;
        score+= Number(responses.question2) * 113;
        score+= Number(responses.question3) * .79;
        score+= Number(responses.question4) * 1100;
        score+= Number(responses.question5) * 4400;
        if (responses.question6 == false) {
            score+= 184
        }
        if (responses.question7 == false) {
            score+= 166
        }
        setScore(score);
    }

    const currTheme = getTheme();

    return (
        <ThemeProvider theme={currTheme}>
            <Paper style = {{minHeight: '100vh'}}>
                <Header/>
                <Paper elevation = {3} style={paperStyle}>
                    <h1>Enviro Quiz</h1>
                    <h2>Take the quiz now to find out your carbon footprint!</h2>
                    <div>
                        <h2><HomeIcon/> Home</h2>
                        <h3>{Questions[0]}</h3>
                        <TextField id="answer0" type="number" label="$" variant="outlined" fullWidth value = {responses.question0} onChange={handleQ0Change}/>
                        <h3>{Questions[1]}</h3>
                        <TextField id="answer1" type="number" label="$" variant="outlined" fullWidth value = {responses.question1} onChange={handleQ1Change}/>
                        <h3>{Questions[2]}</h3>
                        <TextField id="answer2" type="number" label="$" variant="outlined" fullWidth value = {responses.question2} onChange={handleQ2Change}/>

                        <h2><FlightIcon/> Transportation</h2>
                        <h3>{Questions[3]}</h3>
                        <TextField id="answer3" type="text" label="miles" variant="outlined" fullWidth value = {responses.question3} onChange={handleQ3Change}/>
                        <h3>{Questions[4]}</h3>
                        <TextField id="answer4" type="text" label="flights" variant="outlined" fullWidth value = {responses.question4} onChange={handleQ4Change}/>
                        <h3>{Questions[5]}</h3>
                        <TextField id="answer5" type="text" label="flights" variant="outlined" fullWidth value = {responses.question5} onChange={handleQ5Change}/>

                        <h2><DeleteIcon/> Recycling</h2>
                        <h3>{Questions[6]}</h3>
                        <button onClick={handleQ6True}> Yes </button>
                        <button onClick={handleQ6False}>No</button>
                        <h3>{Questions[7]}</h3>
                        <button onClick={handleQ7True}>Yes</button>
                        <button onClick={handleQ7False}>No</button>

                        <h3>Thanks for taking the Enviro quiz</h3>
                        <button onClick={handleSubmit}>Submit Quiz</button>
                        <h2>Your carbon emission footprint is:</h2>
                        <h2>{score}</h2>

                        <h3>Are you recycling properly? Find out now</h3>
                        <button onClick={redirectAddQuiz}>Take Quiz</button>
                    </div>
                </Paper>
            </Paper>
        </ThemeProvider>
    )
}

export default Quiz;
