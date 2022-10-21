import {Box, Button, Container, Paper, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import "../styles/Dashboard.css";
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
    // paperStyle is used to style the paper component
    const paperStyle = {padding: '50px 20px', width: 600, margin:'20px auto'}

    //users is retrieved from the backend and is used to display the list of users and their registration dates
    const[users,setUsers] = useState([])

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
        <div className="dashboard">
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
