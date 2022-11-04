import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Post from "./components/Post";
import Quiz from "./components/Quiz"
import Leaderboard from "./components/Leaderboard";


function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/quiz" element={<Quiz />} />
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/post" element = {<Post/>}/>
                    <Route path="/about" element={<h1>Not made yet</h1>}/>
                    <Route path="/leaderboard" element={<Leaderboard/>}/>
                    <Route path="*" element={<h1>404 Not Found</h1>} />
                </Routes>
            </BrowserRouter>
        </div>

    );
}

export default App;
