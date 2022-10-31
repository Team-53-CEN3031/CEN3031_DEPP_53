import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Post from "./components/Post";


function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="*" element={<h1>404 Not Found</h1>} />
                    <Route path="/post" element = {<Post/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
