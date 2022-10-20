import logo from './logo.svg';
import './App.css';
import {Box, Button, Container, Paper, TextField} from "@mui/material";
import {useEffect, useState} from "react";
/*
    * This function is used to print the date in a readable format
    * @param date (String) - date in ISO format
    * @return (String) - date in readable format
    * Removes the time from the date
 */
function printDate(d) {
    if(d == null) {
        return 'Unknown';
    } else {
        return d.substring(0,10);
    }
}
function App() {
    // paperStyle is used to style the paper component
    const paperStyle = {padding: '50px 20px', width: 600, margin:'20px auto'}

    // name is used to store the name of the user and is sent to the backend to add an entry into the database
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    //users is retrieved from the backend and is used to display the list of users and their registration dates
    const[users,setUsers] = useState([])

    const handleClick=(e)=> {
        /*
        This function is used to send the name to the backend to add an entry into the database
        It is called when the submit button is clicked
        e.preventDefault() is used to prevent the page from reloading
        registrationDate is set to the current date in ISO format
        user is the object that is sent to the backend and is converted to JSON format and sent as a POST request under user/add in the backend
        */
        e.preventDefault();
        let registrationDate = new Date();
        registrationDate = registrationDate.toISOString();
        const user = {name,registrationDate,email,password};
        fetch("http://localhost:8080/user/add", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        }).then(()=>{
            console.log("New user added")
        })
    }
    useEffect(()=>{
        /*
        This function is used to retrieve the list of users from the backend
        It is called when the page is loaded
         */
        fetch("http://localhost:8080/user/getAll")
            .then(res=>res.json())
            .then((result)=>{
                    setUsers(result);
                }
            )
    },[])
    return (
        <div className="App">
            <Container>
                {/*Paper component is used to style the form
                Paper is just a container with a shadow
                */}
                <Paper elevation = {3} style = {paperStyle}>
                    <h1 style = {{color: 'salmon'}}> Add Person</h1>
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
                    <Button variant="contained" color = "secondary" onClick={handleClick}>SUBMIT</Button>
                </Paper>
                <Paper elevation={3} style={paperStyle}>
                    {/*
                    This is used to display the list of users and their registration dates
                    map is used to iterate through the list of users given by the backend
                    */}
                    {users.map(user=>(
                        <Paper elevation={4} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={user.id}>
                            Name: {user.name}<br/>
                            Date: {printDate(user.registrationDate)} <br/>
                            Email : {user.email} <br/>
                            Password : {user.password}
                        </Paper>
                    ))}
                </Paper>
            </Container>
        </div>
    );
}

export default App;
