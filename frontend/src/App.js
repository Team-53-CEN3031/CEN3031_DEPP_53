import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.css";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Quiz from "./components/Quiz"


function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/quiz" element={<Quiz />} />
                    <Route path="/" element={<Dashboard />} />
                </Routes>
            </BrowserRouter>
        </div>
        
    );
}

export default App;
