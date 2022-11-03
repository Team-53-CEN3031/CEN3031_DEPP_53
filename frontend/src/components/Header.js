import {useEffect} from "react";
import authToken from "../utils/authToken";
import "../styles/General.css";
import "../styles/Header.css";
import {Button, Container, Link, MenuItem, Paper, ThemeProvider} from "@mui/material";
import {getTheme} from "../styles/themes/themes";


function Header() {
    useEffect(()=>{
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
    },[])

    const currTheme = getTheme();
    return (
        <ThemeProvider theme={currTheme}>
            <Paper className="header">
                <Paper  className = "top">
                    <h1 className="left">Enviro</h1>
                    <div className="middle">
                        <img className = "logo" src={require("../images/enviro2.png")} alt="Enviro Logo"/>
                    </div>
                    <h1 className="right">How can you beat climate change? </h1>
                </Paper>
                <Paper className = "navbar">
                    <MenuItem className="navContainer"
                        component={Link} href = "/">
                        <h2 className="link">Home</h2>
                    </MenuItem>
                    <MenuItem className="navContainer"
                        component={Link} href = "/Login" >
                        <h2 className="link">Login</h2>
                    </MenuItem>
                    <MenuItem className="navContainer"
                        component={Link} href = "/Quiz" >
                        <h2 className="link">Quiz</h2>
                    </MenuItem>
                    <MenuItem className="navContainer"
                        component={Link} href = "/Post" >
                        <h2 className="link">Post</h2>
                    </MenuItem>
                    <MenuItem className="navContainer"
                        component={Link} href = "/About" >
                        <h2 className="link">About</h2>
                    </MenuItem>
                </Paper>
            </Paper>
        </ThemeProvider>
    );
}

export default Header;
