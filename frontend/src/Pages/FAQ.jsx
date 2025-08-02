import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './FAQ.css';
import logo from '../assets/logo.png';
import { FaPlus, FaMinus } from 'react-icons/fa';

const QUESTIONS = [
    {
        q: "Who is eligible for orientation ?",
        a: "Our orientation is open to students, career changers, and educational institutions. It's designed to support anyone seeking academic or professional guidance."
    },
    { q: "What is Diravenir?", a: "Diravenir is a web platform that supports students…" },
    { q: "In which countries do you assist students?", a: "We operate in Morocco, France, Canada…" },
    { q: "What scholarships are available?", a: "We provide information on merit-based, need-based…" },
    { q: "What documents are required for registration?", a: "You'll need transcripts, proof of language proficiency…" },
    { q: "Do I need to speak English?", a: "English is recommended but not always mandatory…" },
    { q: "Do you assist with visa and housing arrangements?", a: "Yes, we guide you through visa applications…" },
    { q: "Have you worked with students before?", a: "Since 2018, we've helped 1,000+ students…" },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(0);
    const { pathname } = useLocation();

    const toggle = i => setOpenIndex(openIndex === i ? -1 : i);

    return (
        <div className="faq-page">
            {/* HEADER */}
            <header className="faq-header">
                <div className="faq-header-inner">
                    <Link to="/"><img src={logo} alt="Diravenir" className="faq-logo"/></Link>
                    <nav className="faq-nav">
                        {["/", "/orientation", "/programs", "/about", "/faq", "/contact"].map((to,i) => (
                            <Link
                                key={to}
                                to={to}
                                className={pathname===to ? "active" : ""}
                            >
                                {["Home","Orientation","Programs","About US","FAQ","Contact US"][i]}
                            </Link>
                        ))}
                    </nav>
                    <div className="faq-actions">
                        <Link to="/signin" className="btn-outline">Log in</Link>
                        <Link to="/signup" className="btn-solid">Create Account</Link>
                    </div>
                </div>
            </header>

            {/* PAGE TITLE */}
            <section className="faq-title">
                <h1>Frequently Asked Questions</h1>
            </section>

            {/* ACCORDION */}
            <section className="faq-accordion">
                {QUESTIONS.map((item,i) => (
                    <div
                        key={i}
                        className={`faq-item ${openIndex===i ? "open" : ""}`}
                    >
                        <button className="faq-question" onClick={() => toggle(i)}>
                            {openIndex===i ? <FaMinus/> : <FaPlus/>}
                            <span>{item.q}</span>
                        </button>
                        <div className="faq-answer">
                            <p>{item.a}</p>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}
