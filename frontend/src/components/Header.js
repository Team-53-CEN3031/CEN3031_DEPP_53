import {useEffect} from "react";
import authToken from "../utils/authToken";
import "../styles/General.css";
import "../styles/Header.css";
import {Container} from "@mui/material";


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
    return (
        <div className="header">
            <div className = "top">
                <h1 className="left">Enviro</h1>
                <div className="middle">
                    <img className = "logo" src={require("../images/enviro2.png")} alt="Enviro Logo"/>
                </div>
                <h1 className="right">How can you beat climate change? </h1>
            </div>
            <div className = "navbar">
                <h2 className="navContainer">
                    <a href = "/" className= "link">Home</a>
                </h2>
                <h2 className="navContainer">
                    <a href = "/Login" className= "link">Login / Sign Up</a>
                </h2>
                <h2 className="navContainer">
                    <a href = "/Quiz" className= "link">Quiz</a>
                </h2>
                <h2 className="navContainer">
                    <a href = "/Post" className= "link">Post</a>
                </h2>
                <h2 className="navContainer">
                    <a href  = "/About" className= "link">About</a>
                </h2>
            </div>
        </div>
    );
}

export default Header;
