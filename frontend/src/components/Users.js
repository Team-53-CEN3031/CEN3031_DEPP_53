import React, {useEffect, useState} from "react"
import {validateJWT} from "../utils/authToken";
import {Paper, ThemeProvider} from "@mui/material";
import {getTheme} from "../styles/themes/themes";
import {useParams} from "react-router-dom";
import Header from "./Header";

function printDate(d) {
    if(d == null) {
        return 'Unknown';
    } else {
        return d.substring(0,10);
    }
}

function Users(props) {
    let {id} = useParams();
    const[user,setUser] = useState('')
    useEffect(()=>{
        if(isNaN(id)) {
            //User entered non integer value for id
            window.location.href = "/404";
        }
        id = parseInt(id);
        console.log(id);
        fetch("http://localhost:8080/api/user/get/"+id)
            .then(res=>res.json())
            .then((result)=>{
                    setUser(result);
                    if(result.id === -1) {
                        window.location.href = "/404";
                    }
                }
            )
        validateJWT();

        if(localStorage.getItem('theme') === null) {
            localStorage.setItem('theme', 'light');
        }

    },[])

    const currTheme = getTheme();
    return (
        <ThemeProvider theme={currTheme} style = {{height: '100vh'}}>
            <Header/>
            <Paper style = {{ display:'flex', flexDirection:'column'}}>
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
