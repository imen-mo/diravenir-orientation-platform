import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './FAQ.css';
import { FaPlus, FaMinus } from 'react-icons/fa';

const QUESTIONS = [
    {
        q: "What is Diravenir?",
        a: "Diravenir is an educational guidance platform that helps students, especially in Morocco, find study opportunities abroad. It offers personalized support in choosing programs, applying to universities, obtaining scholarships, and handling procedures such as visas and accommodation mainly in countries like China and Cyprus."
    },
    {
        q: "In which countries do you assist students?",
        a: "We assist students in exploring academic opportunities in Romania, Cyprus, and China. Whether it's for undergraduate or postgraduate studies, we provide guidance throughout the entire process from choosing the right program to securing a visa and finding accommodation."
    },
    {
        q: "What scholarships are available?",
        a: "We offer a variety of scholarship options to support students on their academic journey. You can access merit-based awards, need-based grants, and destination-specific scholarships for programs in countries like Romania, Cyprus, and China. Each opportunity includes full guidance on eligibility, application requirements, and deadlines."
    },
    {
        q: "What documents are required for registration?",
        a: "The documents required for registration typically include: A valid passport or ID, academic transcripts, proof of language proficiency, recommendation letters, and a completed application form. Other documents may also be required, and the entire Diravenir team will assist you in preparing and submitting all necessary paperwork."
    },
    {
        q: "Do I need to speak English?",
        a: "Speaking English is often required, depending on the program and country. However, some programs may offer support in other languages."
    },
    {
        q: "Do you assist with visa and housing arrangements?",
        a: "Yes, we assist with both visa applications and housing arrangements. Our team guides you through the entire process to ensure a smooth transition to your study destination."
    },
    {
        q: "Have you worked with students before?",
        a: "Yes, we have successfully worked with hundreds of students before and continue to support many throughout their academic journeys."
    },
    {
        q: "How do I start the process?",
        a: "To start the process, you can contact us via WhatsApp or fill out our online registration form. Our team will then guide you step-by-step through the next stages."
    },
    {
        q: "How do I know which study program is right for me?",
        a: "To find the right study program for you, we offer personalized counseling based on your interests, skills, and career goals. Our experts help you explore options and choose the best fit for your future."
    },
    {
        q: "What is the best time to apply?",
        a: "It's best to apply as soon as possible to secure your admission and scholarship. Starting early gives you the best chance to complete all requirements on time."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(0);
    const { pathname } = useLocation();

    const toggle = i => setOpenIndex(openIndex === i ? -1 : i);

    return (
        <div className="faq-page">

            {/* PAGE TITLE */}
            <section className="faq-title">
                <div className="title-container">
                <h1>Frequently Asked Questions</h1>
                    <p>Everything you need to know about studying abroad with Diravenir</p>
                </div>
            </section>

            {/* ACCORDION */}
            <section className="faq-accordion">
                {QUESTIONS.map((item, i) => (
                    <div
                        key={i}
                        className={`faq-item ${openIndex === i ? "open" : ""}`}
                    >
                        <button className="faq-question" onClick={() => toggle(i)}>
                            <div className="question-content">
                                <span className="question-text">{item.q}</span>
                                <div className="icon-container">
                                    {openIndex === i ? <FaMinus /> : <FaPlus />}
                                </div>
                            </div>
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
