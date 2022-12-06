import {Button, Paper, TextField, ThemeProvider} from "@mui/material";
import React, {useEffect, useState} from "react"
import {Questions} from "../components/QuestionBank.js";
import HomeIcon from '@mui/icons-material/Home';
import FlightIcon from '@mui/icons-material/Flight';
import DeleteIcon from '@mui/icons-material/Delete';
import {getTheme} from "../styles/themes/themes";
import Header from "./Header";
import {validateJWT} from "../utils/authToken";
import GreatScore from "../images/greatScore.jpeg";
import GoodScore from "../images/goodScore.jpeg";
import OkayScore from "../images/okayScore.jpeg";
import PoorScore from "../images/poorScore.jpeg";
import {backendDomain} from "../utils/backendDomain";


function Quiz(){

    useEffect(()=>{
        if(!validateJWT()) {
            window.location.href = "/login";
        }
    },[])
    const paperStyle = {padding: '50px 20px', width: 600, margin:'20px auto'}
    const [score, setScore] = useState(0);
    const [quizFinished, SetQuizFinished] = useState(false);

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

    const[invalidQ0, setInvalidQ0]= useState(false);
    const[invalidQ1, setInvalidQ1]= useState(false);
    const[invalidQ2, setInvalidQ2]= useState(false);
    const[invalidQ3, setInvalidQ3]= useState(false);
    const[invalidQ4, setInvalidQ4]= useState(false);
    const[invalidQ5, setInvalidQ5]= useState(false);


//This handleQChange functions, are made to change the specified property of the responses useState, while preserving the other properties (...responses).
    const handleQ0Change = (event) => {
        setResponses({...responses, question0: event.target.value})
        if (Number(responses.question0) < 300 && Number(responses.question0) > -1){
            setInvalidQ0(false);
        }
        else{
            setInvalidQ0(true);
        }
    }
    const handleQ1Change = (event) => {
        setResponses({...responses, question1: event.target.value})
        if (Number(responses.question1) < 500 && Number(responses.question1) > -1){
            setInvalidQ1(false);
        }
        else{
            setInvalidQ1(true);
        }
    }
    const handleQ2Change = (event) => {
        setResponses({...responses, question2: event.target.value})
        if (Number(responses.question2) < 300 && Number(responses.question2) > -1){
            setInvalidQ2(false);
        }
        else{
            setInvalidQ2(true);
        }
    }
    const handleQ3Change = (event) => {
        setResponses({...responses, question3: event.target.value})
        if (Number(responses.question0) < 1000000 && Number(responses.question0) > -1){
            setInvalidQ3(false);
        }
        else{
            setInvalidQ3(true);
        }
    }
    const handleQ4Change = (event) => {
        setResponses({...responses, question4: event.target.value})
        if (Number(responses.question4) < 1000 && Number(responses.question4) > -1){
            setInvalidQ4(false);
        }
        else{
            setInvalidQ4(true);
        }
    }
    const handleQ5Change = (event) => {
        setResponses({...responses, question5: event.target.value})
        if (Number(responses.question5) < 100 && Number(responses.question5) > -1){
            setInvalidQ5(false);
        }
        else{
            setInvalidQ5(true);
        }
    }
    const handleQ6True = (event) => { setResponses({...responses, question6: true})}
    const handleQ6False = (event) => { setResponses({...responses, question6: false})}
    const handleQ7True = (event) => { setResponses({...responses, question7: true})}
    const handleQ7False = (event) => { setResponses({...responses, question7: false})}

    const validateInputs = (event) => {
        //check to see if any of the inputs are invalid.
    }
//called on submit button onClick.
//calculates carbon emission and stores updates score useState with the user's carbon emission result
    const handleSubmit = (event) => {
        SetQuizFinished(true);
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
        let quizRes = {
            userToken: localStorage.getItem("jwtToken"),
            electricityScore: responses.question0,
            gasScore: responses.question1,
            oilScore: responses.question2,
            milesDriven: responses.question3,
            shortFlights: responses.question4,
            longFlights: responses.question5,
            recyclePaper: responses.question6,
            recycleMetal: responses.question7,
        }
        fetch(backendDomain +"/api/quiz/add", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(quizRes)
        }).then((res)=>{
            //The quiz score is being sent to API
        })
    }

    const handleRetake = (event) =>
    {
        SetQuizFinished(false);
        //reset answers
        setResponses({
            question0: 0,
            question1: 0,
            question2: 0,
            question3: 0,
            question4: 0,
            question5: 0,
            question6: true,
            question7: true,
        })
    }

    const currTheme = getTheme();
    const redirectAddQuiz = () =>
    {
        window.location.href = "/addquiz";

    };
    return (
        <ThemeProvider theme={currTheme}>
            <Paper style = {{minHeight: '100vh'}}>
                <Header/>
                <Paper elevation = {3} style={paperStyle}>
                    <h1 style={{textAlign: "center", color:"green", fontWeight: "bold"}}>Enviro Quiz</h1>
                    {
                        //if quiz is not finished --> display the questions
                        (quizFinished == false) ?
                        <>
                        <div>
                            <h2>Take the quiz now to find out your carbon footprint!</h2>
                            <h2 style={{textAlign: "center"}}><HomeIcon/> Home</h2>
                            <h3>{Questions[0]}</h3>
                            <TextField id="answer0" type="number" label="$" variant="outlined" fullWidth value = {responses.question0} onChange={handleQ0Change}/>
                            {invalidQ0? <label style={{color: "red"}}>Invalid input.</label>: ""}
                            <h3>{Questions[1]}</h3>
                            <TextField id="answer1" type="number" label="$" variant="outlined" fullWidth value = {responses.question1} onChange={handleQ1Change}/>
                            {invalidQ1? <label style={{color: "red"}}>Invalid input.</label>: ""}
                            <h3>{Questions[2]}</h3>
                            <TextField id="answer2" type="number" label="$" variant="outlined" fullWidth value = {responses.question2} onChange={handleQ2Change}/>
                            {invalidQ2? <label style={{color: "red"}}>Invalid input.</label>: ""}

                            <h2 style={{textAlign: "center"}}><FlightIcon/> Transportation</h2>
                            <h3>{Questions[3]}</h3>
                            <TextField id="answer3" type="number" label="miles" variant="outlined" fullWidth value = {responses.question3} onChange={handleQ3Change}/>
                            {invalidQ3? <label style={{color: "red"}}>Invalid input.</label>: ""}
                            <h3>{Questions[4]}</h3>
                            <TextField id="answer4" type="number" label="flights" variant="outlined" fullWidth value = {responses.question4} onChange={handleQ4Change}/>
                            {invalidQ4? <label style={{color: "red"}}>Invalid input.</label>: ""}
                            <h3>{Questions[5]}</h3>
                            <TextField id="answer5" type="number" label="flights" variant="outlined" fullWidth value = {responses.question5} onChange={handleQ5Change}/>
                            {invalidQ5? <label style={{color: "red"}}>Invalid input.</label>: ""}

                            <h2 style={{textAlign: "center"}}><DeleteIcon/> Recycling</h2>
                            <h3>{Questions[6]}</h3>
                            <Button id = "Q6true" variant="contained" color = "primary" style = {{margin:'2%'}}onClick={handleQ6True}>Yes</Button>
                            <Button id = "Q6true" variant="contained" color = "primary" style = {{margin:'2%'}}onClick={handleQ6False}>No</Button>
                            <h3>{Questions[7]}</h3>
                            <Button id = "Q7true" variant="contained" color = "primary" style = {{margin:'2%'}}onClick={handleQ7True}>Yes</Button>
                            <Button id = "Q7false" variant="contained" color = "primary" style = {{margin:'2%'}}onClick={handleQ7False}>No</Button>
                            <br></br>
                            <h2 style={{textAlign: "left"}}>Thanks for taking the Enviro quiz</h2>
                            <Button id = "submitButton" variant="contained" color = "primary" style = {{margin:'2%'}}onClick={handleSubmit}>Submit Quiz</Button>
                        </div>
                        </>
                        ://if quiz is finished --> show the results
                        <>
                        <div>
                            <h1 style={{textAlign: "center"}}>Thanks for taking the Enviro quiz</h1>
                            <h2 style={{textAlign: "center"}}>Your carbon emission footprint is:</h2>
                            <h2 style={{textAlign: "center"}}>{score} pounds of CO2/year</h2>

                            {//display different graphic based on results
                            (score < 6000) ?
                            <>
                            <img style={{ alignItem: "center", width: 600, height: 600 }} src={GreatScore} />
                            <h3>Share your results with your friends!</h3>
                            <a href={require("../images/greatScore.jpeg")} download="EnviroScore">Download</a>
                            <br></br>
                            </>
                            :(score < 16000) ?
                            <>
                            <img style={{ alignItem: "center", width: 600, height: 600 }} src={GoodScore} />
                            <h3>Share your results with your friends!</h3>
                            <a href={require("../images/goodScore.jpeg")} download="EnviroScore">Download</a>
                            <br></br>
                            </>
                            :(score < 22000) ?
                            <>
                            <img style={{ alignItem: "center", width: 600, height: 600 }} src={OkayScore} />
                            <h3>Share your results with your friends!</h3>
                            <a href={require("../images/okayScore.jpeg")} download="EnviroScore">Download</a>
                            <br></br>
                            </>
                            : (score > 22000) ?
                            <>
                            <img style={{ alignItem: "center", width: 600, height: 600 }} src={PoorScore} />
                            <h3>Share your results with your friends!</h3>
                            <a href={require("../images/poorScore.jpeg")} download="EnviroScore">Download</a>
                            <br></br>
                            </>
                            : "no score"
                            }

                            {// if score is bad -> display tips on how to improve carbon footprint
                            (score > 16000) ?
                            <>
                            <h3>Here are some easy ways you can improve your carbon footprint: </h3>
                            <p>
                                Use public transport <br></br>
                                Keep room temperature moderate<br></br>
                                Take shorter showers<br></br>
                                Cut out plastics<br></br>
                                Minimize food waste<br></br>
                                Buy local<br></br>
                            </p>
                            </>
                            :""
                            }
                            <Button id = "submitButton" variant="contained" color = "primary" style = {{margin:'2%'}}onClick={handleRetake}>Retake Quiz</Button>
                        </div>
                            <h2 style={{textAlign: "center"}}>Are you recycling properly? Find out now</h2>
                            <Button id = "submitButton" variant="contained" color = "primary" style = {{margin:'2%'}}onClick={redirectAddQuiz}>Take Another Quiz</Button>
                        </>
                    }
                </Paper>
            </Paper>
        </ThemeProvider>
    )
}

export default Quiz;
