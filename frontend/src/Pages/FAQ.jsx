import React, { useState } from 'react';
import GlobalLayout from '../components/GlobalLayout';
import { useLanguage } from '../contexts/LanguageContext';
import './FAQ.css';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(0);
    const { t } = useLanguage();

    const toggle = i => setOpenIndex(openIndex === i ? -1 : i);

    const questions = [
        { q: t('faqQuestion1'), a: t('faqAnswer1') },
        { q: t('faqQuestion2'), a: t('faqAnswer2') },
        { q: t('faqQuestion3'), a: t('faqAnswer3') },
        { q: t('faqQuestion4'), a: t('faqAnswer4') },
        { q: t('faqQuestion5'), a: t('faqAnswer5') },
        { q: t('faqQuestion6'), a: t('faqAnswer6') },
        { q: t('faqQuestion7'), a: t('faqAnswer7') },
        { q: t('faqQuestion8'), a: t('faqAnswer8') },
        { q: t('faqQuestion9'), a: t('faqAnswer9') },
        { q: t('faqQuestion10'), a: t('faqAnswer10') }
    ];

    return (
        <GlobalLayout activePage="faq">
            <div className="simple-faq">
                <div>
                    <div className="faq-header">
                        <h1>{t('faqTitle')}</h1>
                    </div>
                    
                    <div className="faq-content">
                        {questions.map((item, i) => (
                            <div key={i} className={`faq-item ${openIndex === i ? 'open' : ''}`}>
                                <button className="faq-question" onClick={() => toggle(i)}>
                                    <span className="icon">{openIndex === i ? '−' : '+'}</span>
                                    <span className="question-text">{item.q}</span>
                                </button>
                                {openIndex === i && (
                                    <div className="faq-answer">
                                        <p>{item.a}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </GlobalLayout>
    );
}
