import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/Signin.jsx";
import SignUp from "./pages/SignUp.jsx";
import Universites from "./pages/Universites.jsx";
import HomePage from "./pages/HomePage.jsx";
import About from "./Pages/About.jsx";
import China from "./pages/China.jsx";
import Cyprus from "./pages/Cyprus.jsx";
import Romania from "./pages/Romania.jsx";

// Placeholders pour les pages manquantes
const Orientation = () => <div style={{padding:40}}><h2>Orientation Page</h2></div>;
const Programs = () => <div style={{padding:40}}><h2>Programs Page</h2></div>;

const FAQ = () => <div style={{padding:40}}><h2>FAQ Page</h2></div>;
import Contact from "./Pages/Contact";
const ProgramSelector = () => <div style={{padding:40}}><h2>AI Program Selector</h2></div>;
const Scenarios = () => <div style={{padding:40}}><h2>AI Scenarios</h2></div>;
const Quizzes = () => <div style={{padding:40}}><h2>AI Quizzes/Tests</h2></div>;
const Goals = () => <div style={{padding:40}}><h2>AI Goals</h2></div>;
const Opportunities = () => <div style={{padding:40}}><h2>All Opportunities</h2></div>;

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/universites" element={<Universites />} />
                    <Route path="/orientation" element={<Orientation />} />
                    <Route path="/programs" element={<Programs />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/program-selector" element={<ProgramSelector />} />
                    <Route path="/scenarios" element={<Scenarios />} />
                    <Route path="/quizzes" element={<Quizzes />} />
                    <Route path="/goals" element={<Goals />} />
                    <Route path="/opportunities" element={<Opportunities />} />
                    <Route path="/destinations/china" element={<China />} />
                    <Route path="/destinations/cyprus" element={<Cyprus />} />
                    <Route path="/destinations/romania" element={<Romania />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
