import React, { useState } from 'react';
import axios from 'axios';

const QuizForm = () => {
    const [quiz, setQuiz] = useState({ title: '', questions: [] });
    const [question, setQuestion] = useState({ question: '', options: ['', '', '', ''], answer: '' });

    const addQuestion = () => {
        setQuiz({ ...quiz, questions: [...quiz.questions, question] });
        setQuestion({ question: '', options: ['', '', '', ''], answer: '' });
    };

    const handleSubmit = async () => {
        try {
            await axios.post('http://localhost:5000/quiz/', quiz);
            setQuiz({ title: '', questions: [] });
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };

    return (
        <div>
            <h1>Create a Quiz</h1>
            <input
                type="text"
                placeholder="Quiz Title"
                value={quiz.title}
                onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            />
            <div>
                <input
                    type="text"
                    placeholder="Question Text"
                    value={question.text}
                    onChange={(e) => setQuestion({ ...question, question: e.target.value })}
                />
                {question.options.map((option, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => {
                            const newOptions = question.options.slice();
                            newOptions[index] = e.target.value;
                            setQuestion({ ...question, options: newOptions });
                        }}
                    />
                ))}
                <input
                    type="text"
                    placeholder="Correct Answer"
                    value={question.correct}
                    onChange={(e) => setQuestion({ ...question, answer: e.target.value })}
                />
                <button onClick={addQuestion}>Add Question</button>
            </div>
            <button onClick={handleSubmit}>Submit Quiz</button>
        </div>
    );
};

export default QuizForm;
