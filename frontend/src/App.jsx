import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/Signin.jsx";
import SignUp from "./pages/SignUp.jsx";
import Universites from "./Pages/Universites";

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<SignIn />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/universites" element={<Universites />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
