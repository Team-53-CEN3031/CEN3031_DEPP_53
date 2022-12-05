import {BrowserRouter, Route, Routes, useParams} from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import CreatePost from "./components/CreatePost";
import Quiz from "./components/Quiz"
import Leaderboard from "./components/Leaderboard";
import Users from "./components/Users";
import Settings from "./components/Settings";
import About from "./components/About";
import Post from "./components/Post";
import AddQuiz from "./components/AddQuiz"
import Chat from "./components/Chat";
import GetChats from "./components/GetChats";

function App() {

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/quiz" element={<Quiz />} />
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/post" element = {<CreatePost/>}/>
                    <Route path="/post/:id" element={<Post/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/leaderboard" element={<Leaderboard/>}/>
                    <Route path="/user/:id" element={<Users/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                    <Route path="*" element={<h1>404 Not Found</h1>} />
                    <Route path="/addquiz" element={<AddQuiz />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/getchat" element={<GetChats/>} />
                    <Route path="/chat/:id" element={<GetChats/>} />
                </Routes>
            </BrowserRouter>
        </div>

    );
}

export default App;
