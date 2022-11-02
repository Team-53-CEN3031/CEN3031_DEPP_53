import {Box, Button, Container, Paper, TextField, ThemeProvider} from "@mui/material";
import {useEffect, useState} from "react";
import "../styles/Login.css";
import Header from "./Header";
const {getTheme} = require("../styles/themes/themes.js");

function Login() {
    // paperStyle is used to style the paper component
    const paperStyle = {padding: '50px 20px', width: 600, margin:'20px auto'}

    const[emailS, setEmailS] = useState('');
    const[passwordS, setPasswordS] = useState('');
    const[nameS, setNameS] = useState('');
    const[emailP, setEmailP] = useState('');
    const[passwordP, setPasswordP] = useState('');
    const[errorDiv, setErrorDiv] = useState(<div/>);
    let signup = false;

    function login(user) {
        console.log(user);
        fetch("http://localhost:8080/api/auth/getJWT", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        }).then((res2)=>{
            //Open ReadableStream
            const reader = res2.body.getReader();
            // Read the data
            reader.read().then(({value}) => {
                const str = new TextDecoder("utf-8").decode(value);
                if(str == null) {
                    return;
                }
                localStorage.setItem('jwtToken', str);
            });
        })
    }
    useEffect(()=>{
        document.getElementById('login').style.display = 'block';
        document.getElementById('signup').style.display = 'none';
    },[])
    const handleClick=(e)=> {
        /*
        This function is used to send the name to the backend to add an entry into the database
        It is called when the submit button is clicked
        e.preventDefault() is used to prevent the page from reloading
        registrationDate is set to the current date in ISO format
        user is the object that is sent to the backend and is converted to JSON format and sent as a POST request under user/add in the backend
        */
        // Check source of event
        if(e.target.id === 'loginbutton') {
            e.preventDefault();
            if(!validEmail(emailP)) {
                return;
            }
            const name = null;
            const user = {name,email: emailP,password: passwordP};
            console.log(user);
            fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(user)
            }).then((res)=>{
                if(res.status === 200) {
                    login(user);
                }
            })
        }
        if (e.target.id === 'signupbutton') {
            e.preventDefault();
            if(!validPassword(passwordS)) {
                return;
            }
            if(!validEmail(emailS)) {
                return;
            }
            const user = {name: nameS,email: emailS,password: passwordS};
            fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(user)
            }).then((res)=>{
                if(res.status < 300 && res.status >= 200) {
                    //Upon successful registration, redirect to login page
                    window.location.href = "/login";
                } else if(res.status === 400) {
                    //Else, display error message
                    setErrorDiv(<div className="error">Error Registering, Code {res.status}</div>)
                }
            })
        }
        if (e.target.id === 'swap') {
            e.preventDefault();
            if(signup === true) {
                document.getElementById('login').style.display = 'block';
                document.getElementById('signup').style.display = 'none';
                signup = false;
            } else {
                document.getElementById('login').style.display = 'none';
                document.getElementById('signup').style.display = 'block';
                signup = true;
            }
        }
    }

    const currTheme = getTheme();

    function validEmail(email) {
        //Check if email is valid
        return email.match(/^\S+@\S+\.\S+$/)
    }

    function validPassword(pass) {
        return pass.length >= 8;
    }

    function passwordHelper(pass) {
        if(validPassword(pass)) {
            return "";
        }
        if(pass.length < 8) {
            return "Password must be at least 8 characters";
        }
    }
    function LoginSignupDiv() {
        return (<div>
                <Box className="center">
                    <div id = "signup">
                        <Paper elevation = {3} className="paper_container">
                            <h1 color = "primary" className="center"> Sign Up</h1>
                            <Box component="form" sx={{ '& > :not(style)': { m: 1 }, }} noValidate autoComplete="off">
                                <TextField label="Name" variant="outlined" fullWidth value = {nameS} onChange={(e)=>setNameS(e.target.value)}/>
                                <TextField label="Email" variant="outlined" fullWidth value = {emailS} error={!validEmail(emailP)} helperText={!validEmail(emailP) ? "Invalid email" : ""} onChange={(e)=>setEmailS(e.target.value)}/>
                                <TextField label="Password" type="password" variant="outlined" fullWidth value = {passwordS} error={!validPassword(passwordS)} helperText={passwordHelper(passwordS)} onChange={(e)=>setPasswordS(e.target.value)}/>
                            </Box>
                            {/* Button is used to submit the form When it is clicked, handleClick is called */}
                            <div className="center">
                                <Button id = "signupbutton" variant="contained" color = "primary" style = {{margin:'2%'}}onClick={handleClick}>Sign Up</Button>
                                <Button id = "swap" color = "primary" onClick={handleClick}>Already Registered?</Button>
                            </div>
                            {errorDiv}
                        </Paper>
                    </div>
                    <div id = "login">
                        <Paper elevation = {3}  className="paper_container">
                            <h1 color = "primary" className="center"> Login</h1>
                            <Box component="form" sx={{ '& > :not(style)': { m: 1 }, }} noValidate autoComplete="off">
                                {/* TextField is used to take input from the user, When it is changed, the name is updated through setName */}
                                <TextField label="Email" variant="outlined" fullWidth value = {emailP} error={!validEmail(emailP)} helperText={!validEmail(emailP) ? "Invalid email" : ""} onChange={(e)=>setEmailP(e.target.value)}/>
                                <TextField label="Password" variant="outlined" type="password" fullWidth value = {passwordP} onChange={(e)=>setPasswordP(e.target.value)}/>
                            </Box>
                            {/* Button is used to submit the form When it is clicked, handleClick is called */}
                            <div className="center">
                                <Button id = "loginbutton" variant="contained" color = "primary" style = {{margin:'2%'}}onClick={handleClick}>Log In</Button>
                                <Button id = "swap" color = "primary"  onClick={handleClick}>Don't have an account?</Button>
                            </div>
                            {errorDiv}
                        </Paper>
                    </div>
                </Box>
            </div>

        )
    }

    return (
        <ThemeProvider theme={currTheme}>
            <Paper style={{height: "100vh"}}>
                <Header/>
                {LoginSignupDiv()}
            </Paper>
        </ThemeProvider>
    );
}

export default Login;
