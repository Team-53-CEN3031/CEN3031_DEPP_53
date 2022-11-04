import React, {useEffect, useState} from "react"
import authToken from "../utils/authToken";
import {Paper, ThemeProvider} from "@mui/material";
import {getTheme} from "../styles/themes/themes";
import {useParams} from "react-router-dom";

function printDate(d) {
    if(d == null) {
        return 'Unknown';
    } else {
        return d.substring(0,10);
    }
}

function Users(props) {
    const {id} = useParams();
    const[user,setUser] = useState('')
    useEffect(()=>{
        fetch("http://localhost:8080/api/user/get/"+id)
            .then(res=>res.json())
            .then((result)=>{
                    setUser(result);
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
            })
        }

        if(localStorage.getItem('theme') === null) {
            localStorage.setItem('theme', 'light');
        }

    },[])

    const currTheme = getTheme();
    return (
        <ThemeProvider theme={currTheme}>
            <Paper style = {{minHeight: '100vh', display:'flex', flexDirection:'column'}}>
                <Paper elevation={4} style={{margin:"10px",padding:"15px", textAlign:"left"}} >
                    Name: {user.name}
                </Paper>
                <Paper elevation={4} style={{margin:"10px",padding:"15px", textAlign:"left"}} >
                    Email: {user.email}
                </Paper>
                <Paper elevation={4} style={{margin:"10px",padding:"15px", textAlign:"left"}} >
                    Registration Date: {printDate(user.registrationDate)}
                </Paper>
            </Paper>
        </ThemeProvider>
    )
}

export default (Users);
