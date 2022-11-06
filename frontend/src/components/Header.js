import {useEffect} from "react";
import {validateJWT} from "../utils/authToken";
import "../styles/General.css";
import "../styles/Header.css";
import {Button, Container, Link, MenuItem, Paper, ThemeProvider} from "@mui/material";
import {getTheme} from "../styles/themes/themes";


function Header() {
    useEffect(()=>{
        validateJWT();
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
                              component={Link} href = "/About" >
                        <h2 className="link">About</h2>
                    </MenuItem>
                    <MenuItem className="navContainer"
                        component={Link} href = "/Quiz" >
                        <h2 className="link">Quiz</h2>
                    </MenuItem>
                    <MenuItem className="navContainer"
                              component={Link} href = "/Leaderboard" >
                        <h2 className="link">Leaderboard</h2>
                    </MenuItem>
                    <MenuItem className="navContainer"
                        component={Link} href = "/post" >
                        <h2 className="link">Create Post</h2>
                    </MenuItem>
                    <MenuItem className="navContainer"
                              component={Link} href = "/Settings">
                        <h2 className="link">Settings</h2>
                    </MenuItem>
                    <MenuItem className="navContainer"
                              component={Link} href = "/Login" >
                        <h2 className="link">Login</h2>
                    </MenuItem>
                </Paper>
            </Paper>
        </ThemeProvider>
    );
}

export default Header;
