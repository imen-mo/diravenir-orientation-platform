import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './FAQ.css';
import '../Pages/SignUp.css';
import logo from '../assets/logo.png';
import { FaPlus, FaMinus, FaGraduationCap, FaGlobe, FaScholarship, FaFileAlt, FaLanguage, FaPassport, FaUsers, FaPlay, FaSearch, FaClock } from 'react-icons/fa';
import GlobalNavbar from '../components/GlobalNavbar';

const QUESTIONS = [
    {
        q: "What is Diravenir?",
        a: "Diravenir is an educational guidance platform that helps students, especially in Morocco, find study opportunities abroad. It offers personalized support in choosing programs, applying to universities, obtaining scholarships, and handling procedures such as visas and accommodation mainly in countries like China and Cyprus.",
        icon: FaGraduationCap,
        category: "about"
    },
    {
        q: "In which countries do you assist students?",
        a: "We assist students in exploring academic opportunities in Romania, Cyprus, and China. Whether it's for undergraduate or postgraduate studies, we provide guidance throughout the entire process from choosing the right program to securing a visa and finding accommodation.",
        icon: FaGlobe,
        category: "destinations"
    },
    {
        q: "What scholarships are available?",
        a: "We offer a variety of scholarship options to support students on their academic journey. You can access merit-based awards, need-based grants, and destination-specific scholarships for programs in countries like Romania, Cyprus, and China. Each opportunity includes full guidance on eligibility, application requirements, and deadlines.",
        icon: FaScholarship,
        category: "financial"
    },
    {
        q: "What documents are required for registration?",
        a: "The documents required for registration typically include: A valid passport or ID, academic transcripts, proof of language proficiency, recommendation letters, and a completed application form. Other documents may also be required, and the entire Diravenir team will assist you in preparing and submitting all necessary paperwork.",
        icon: FaFileAlt,
        category: "requirements"
    },
    {
        q: "Do I need to speak English?",
        a: "Speaking English is often required, depending on the program and country. However, some programs may offer support in other languages.",
        icon: FaLanguage,
        category: "requirements"
    },
    {
        q: "Do you assist with visa and housing arrangements?",
        a: "Yes, we assist with both visa applications and housing arrangements. Our team guides you through the entire process to ensure a smooth transition to your study destination.",
        icon: FaPassport,
        category: "support"
    },
    {
        q: "Have you worked with students before?",
        a: "Yes, we have successfully worked with hundreds of students before and continue to support many throughout their academic journeys.",
        icon: FaUsers,
        category: "experience"
    },
    {
        q: "How do I start the process?",
        a: "To start the process, you can contact us via WhatsApp or fill out our online registration form. Our team will then guide you step-by-step through the next stages.",
        icon: FaPlay,
        category: "process"
    },
    {
        q: "How do I know which study program is right for me?",
        a: "To find the right study program for you, we offer personalized counseling based on your interests, skills, and career goals. Our experts help you explore options and choose the best fit for your future.",
        icon: FaSearch,
        category: "guidance"
    },
    {
        q: "What is the best time to apply?",
        a: "It's best to apply as soon as possible to secure your admission and scholarship. Starting early gives you the best chance to complete all requirements on time.",
        icon: FaClock,
        category: "timing"
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(0);
    const [activeCategory, setActiveCategory] = useState('all');
    const { pathname } = useLocation();

    const toggle = i => setOpenIndex(openIndex === i ? -1 : i);

    const categories = [
        { id: 'all', name: 'All Questions', count: QUESTIONS.length },
        { id: 'about', name: 'About Us', count: QUESTIONS.filter(q => q.category === 'about').length },
        { id: 'destinations', name: 'Destinations', count: QUESTIONS.filter(q => q.category === 'destinations').length },
        { id: 'financial', name: 'Financial Aid', count: QUESTIONS.filter(q => q.category === 'financial').length },
        { id: 'requirements', name: 'Requirements', count: QUESTIONS.filter(q => q.category === 'requirements').length },
        { id: 'support', name: 'Support Services', count: QUESTIONS.filter(q => q.category === 'support').length },
        { id: 'experience', name: 'Our Experience', count: QUESTIONS.filter(q => q.category === 'experience').length },
        { id: 'process', name: 'Application Process', count: QUESTIONS.filter(q => q.category === 'process').length },
        { id: 'guidance', name: 'Guidance', count: QUESTIONS.filter(q => q.category === 'guidance').length },
        { id: 'timing', name: 'Timing', count: QUESTIONS.filter(q => q.category === 'timing').length }
    ];

    const filteredQuestions = activeCategory === 'all' 
        ? QUESTIONS 
        : QUESTIONS.filter(q => q.category === activeCategory);

    return (
        <div className="faq-page">
            <GlobalNavbar />

            {/* HERO SECTION */}
            <section className="faq-hero">
                <div className="hero-content">
                    <h1>Frequently Asked Questions</h1>
                    <p>Find answers to the most common questions about studying abroad with Diravenir</p>
                    <div className="hero-stats">
                        <div className="stat">
                            <span className="stat-number">10+</span>
                            <span className="stat-label">Common Questions</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number">3</span>
                            <span className="stat-label">Countries</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number">100%</span>
                            <span className="stat-label">Support</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CATEGORY FILTERS */}
            <section className="faq-categories">
                <div className="categories-container">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category.id)}
                        >
                            <span className="category-name">{category.name}</span>
                            <span className="category-count">{category.count}</span>
                        </button>
                    ))}
                </div>
            </section>

            {/* FAQ ACCORDION */}
            <section className="faq-accordion">
                <div className="accordion-container">
                    {filteredQuestions.map((item, i) => {
                        const IconComponent = item.icon;
                        return (
                            <div
                                key={i}
                                className={`faq-item ${openIndex === i ? "open" : ""}`}
                            >
                                <button className="faq-question" onClick={() => toggle(i)}>
                                    <div className="question-content">
                                        <div className="question-icon">
                                            <IconComponent />
                                        </div>
                                        <span className="question-text">{item.q}</span>
                                    </div>
                                    <div className="question-toggle">
                                        {openIndex === i ? <FaMinus /> : <FaPlus />}
                                    </div>
                                </button>
                                <div className="faq-answer">
                                    <div className="answer-content">
                                        <p>{item.a}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* CONTACT CTA */}
            <section className="faq-cta">
                <div className="cta-content">
                    <h2>Still have questions?</h2>
                    <p>Our team is here to help you with any additional questions about studying abroad</p>
                    <div className="cta-buttons">
                        <button className="cta-btn primary">
                            <FaPlay />
                            Start Your Journey
                        </button>
                        <button className="cta-btn secondary">
                            Contact Us
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
