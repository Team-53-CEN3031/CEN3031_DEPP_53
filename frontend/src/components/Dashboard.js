import {Box, Button, Container, Paper, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import "../styles/Dashboard.css";
import {useSelector} from "react-redux";
import authToken from "../utils/authToken";
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
function Dashboard() {
    const[username,setUsername] = useState('')

    // paperStyle is used to style the paper component
    const paperStyle = {padding: '50px 20px', width: 600, margin:'20px auto'}

    //users is retrieved from the backend and is used to display the list of users and their registration dates
    const[users,setUsers] = useState([])
    useEffect(()=>{
        /*
        This function is used to retrieve the list of users from the backend
        It is called when the page is loaded
         */
        fetch("http://localhost:8080/api/user/getAll")
            .then(res=>res.json())
            .then((result)=>{
                    setUsers(result);
                }
            )
        if (localStorage.jwtToken) {
            authToken(localStorage.jwtToken);
            //header = Authorization: Bearer ${localStorage.jwtToken}
            fetch("http://localhost:8080/api/auth/validateJWT", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: localStorage.jwtToken
            }).then((res)=>{
                if(res.status === 401) {
                    localStorage.removeItem('jwtToken');
                }
                fetch("http://localhost:8080/api/auth/getUsername", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: localStorage.jwtToken
                }).then((res2)=>{
                    //Open ReadableStream
                    const reader = res2.body.getReader();
                    // Read the data
                    reader.read().then(({done, value}) => {
                        const str = new TextDecoder("utf-8").decode(value);
                        if(str == null) {
                            setUsername('');
                        }
                        setUsername(str);
                    });
                });
            })
        }
    },[])
    return (
        <div className="dashboard">
            <div className="header">
                HELLO {username}
            </div>
            <Container>
                {/*Paper component is used to style the form
                Paper is just a container with a shadow
                */}
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

export default Dashboard;
