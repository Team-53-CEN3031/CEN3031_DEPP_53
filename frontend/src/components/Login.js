import {Box, Button, Container, Paper, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import "../styles/Login.css";
import Header from "./Header";

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
            const user = {nameS,emailS,passwordS};
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

    function LoginSignupDiv() {
        return (
            <div>
                <div id = "signup">
                    <Paper elevation = {3} style = {paperStyle}>
                        <h1 style = {{color: 'salmon'}}> Sign Up</h1>
                        <Box component="form" sx={{ '& > :not(style)': { m: 1 }, }} noValidate autoComplete="off">
                            {errorDiv}
                            <TextField label="Name" variant="outlined" fullWidth value = {nameS} onChange={(e)=>setNameS(e.target.value)}/>
                            <TextField label="Email" variant="outlined" fullWidth value = {emailS} onChange={(e)=>setEmailS(e.target.value)}/>
                            <TextField label="Password" type="password" variant="outlined" fullWidth value = {passwordS} onChange={(e)=>setPasswordS(e.target.value)}/>
                        </Box>
                        {/* Button is used to submit the form When it is clicked, handleClick is called */}
                        <Button id = "signupbutton" variant="contained" color = "secondary" onClick={handleClick}>SUBMIT</Button>
                        <Button id = "swap" variant="contained" color = "secondary" onClick={handleClick}>Already Registered?</Button>
                    </Paper>
                </div>
                <div id = "login">
                    <Paper elevation = {3} style={paperStyle}>
                        <h1 style = {{color: 'salmon'}}> Login</h1>
                        <Box component="form" sx={{ '& > :not(style)': { m: 1 }, }} noValidate autoComplete="off">
                            {/* TextField is used to take input from the user, When it is changed, the name is updated through setName */}
                            <TextField label="Email" variant="outlined" fullWidth value = {emailP} onChange={(e)=>setEmailP(e.target.value)}/>
                            <TextField label="Password" variant="outlined" type="password" fullWidth value = {passwordP} onChange={(e)=>setPasswordP(e.target.value)}/>
                        </Box>
                        {/* Button is used to submit the form When it is clicked, handleClick is called */}
                        <Button id = "loginbutton" variant="contained" color = "secondary" onClick={handleClick}>SUBMIT</Button>
                        <Button id = "swap" variant="contained" color = "secondary" onClick={handleClick}>Create Account</Button>
                    </Paper>
                </div>
            </div>
        )

    }

    return (
        <div className="login">
            <Header/>
            {LoginSignupDiv()}
        </div>
    );
}

export default Login;
