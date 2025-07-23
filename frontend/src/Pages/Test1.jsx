import React from 'react';
import './Test1.css'; // N'oublie pas de créer ce fichier CSS avec les bons styles

const Test1 = () => {
    return (
        <div className="test-container">
            <h1 className="test-title">Test 1</h1>

            <form className="question-form">
                {[...Array(10)].map((_, index) => (
                    <div key={index} className="question-block">
                        <label className="question-text">
                            Question {index + 1} : Lorem ipsum dolor sit amet ?
                        </label>
                        <div className="answers">
                            <label>
                                <input type="radio" name={`q${index}`} value="oui" /> Oui
                            </label>
                            <label>
                                <input type="radio" name={`q${index}`} value="non" /> Non
                            </label>
                            <label>
                                <input type="radio" name={`q${index}`} value="peut-être" /> Peut-être
                            </label>
                        </div>
                    </div>
                ))}
                <button className="next-button">Test Suivant</button>
            </form>
        </div>
    );
};

export default Test1;
