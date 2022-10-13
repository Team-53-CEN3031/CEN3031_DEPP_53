import logo from './logo.svg';
import './App.css';
import {Box, Button, Container, Paper, TextField} from "@mui/material";
import {useEffect, useState} from "react";
function printDate(d) {
    if(d == null) {
        return 'Unknown';
    } else {
        return d.substring(0,10);
    }
}
function App() {
    const paperStyle = {padding: '50px 20px', width: 600, margin:'20px auto'}
    const[name, setName] = useState('')
    const[users,setUsers] = useState([])
    const handleClick=(e)=> {
        e.preventDefault();
        let registrationDate = new Date();
        registrationDate = registrationDate.toISOString();
        const user = {name,registrationDate};
        fetch("http://localhost:8080/user/add", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        }).then(()=>{
            console.log("New user added")
        })
    }
    useEffect(()=>{
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
                        <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth value = {name} onChange={(e)=>setName(e.target.value)}/>
                    </Box>
                    <Button variant="contained" color = "secondary" onClick={handleClick}>SUBMIT</Button>
                </Paper>
                <Paper elevation={3} style={paperStyle}>
                    {users.map(user=>(
                        <Paper elevation={4} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={user.id}>
                            Name: {user.name}<br/>
                            Date: {printDate(user.registrationDate)}
                        </Paper>
                    ))}
                </Paper>
            </Container>
        </div>
    );
}

export default App;
