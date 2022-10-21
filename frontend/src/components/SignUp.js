import {Box, Button, Container, Paper, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import "../styles/SignUp.css";

function SignUp() {
    // paperStyle is used to style the paper component
    const paperStyle = {padding: '50px 20px', width: 600, margin:'20px auto'}

    // name is used to store the name of the user and is sent to the backend to add an entry into the database
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const handleClick=(e)=> {
        /*
        This function is used to send the name to the backend to add an entry into the database
        It is called when the submit button is clicked
        e.preventDefault() is used to prevent the page from reloading
        registrationDate is set to the current date in ISO format
        user is the object that is sent to the backend and is converted to JSON format and sent as a POST request under user/add in the backend
        */
        // Check source of event
        if (e.target.id === 'signup') {
            e.preventDefault();
            let registrationDate = new Date();
            registrationDate = registrationDate.toISOString();
            const user = {name,registrationDate,email,password};
            fetch("http://localhost:8080/api/user/add", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(user)
            }).then(()=>{
                console.log("New user added")
            })
        }
    }
    return (
        <div className="signup">
            <Container>
                {/*Paper component is used to style the form
                Paper is just a container with a shadow
                */}
                <Paper elevation = {3} style = {paperStyle}>
                    <h1 style = {{color: 'salmon'}}> Sign Up</h1>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1 },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        {/*
                        TextField is used to take input from the user
                        When it is changed, the name is updated through setName
                        */}
                        <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth value = {name} onChange={(e)=>setName(e.target.value)}/>
                        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth value = {email} onChange={(e)=>setEmail(e.target.value)}/>
                        <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth value = {password} onChange={(e)=>setPassword(e.target.value)}/>
                    </Box>
                    {/*
                    Button is used to submit the form
                    When it is clicked, handleClick is called
                    */}
                    <Button id = "signup" variant="contained" color = "secondary" onClick={handleClick}>SUBMIT</Button>
                </Paper>
            </Container>
        </div>
    );
}

export default SignUp;
