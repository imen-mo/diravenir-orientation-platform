import React from "react";
import logo from "../assets/logo.png";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="nav-links">
            <a href="/">Home</a>
            <a href="/course-selector">Course Selector</a>
            <a href="/courses">Courses</a>
            <a href="/faq">FAQ</a>
            <a href="/contact">Contact</a>
            <a href="/about">About US</a>
        </nav>

    );
}

export default Navbar;
