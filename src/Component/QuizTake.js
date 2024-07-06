import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const QuizTake = () => {
    const { title } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState(null);
    // const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/quiz/${title}`);
                console.log(response.data)
                setQuiz(response.data);
            } catch (error) {
                console.error('Error fetching quiz:', error);
                // if (error.response && error.response.status === 404) {
                //     setError('Quiz not found.');
                // } else {
                //     setError('Server error. Please try again later.');
                // }
            }
        };
 
        fetchQuiz();
    }, [title]);

    const handleAnswerChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };
  
    const handleSubmit = () => {
        if (!quiz || !quiz.questions) return; 
        let newScore = 0;
        quiz.questions.forEach((question, index) => {
            if (question.correct === answers[index]) {
                newScore++;
            }
        });
        setScore(newScore);
    };

    // if (error) {
    //     return <div>{error}</div>;
    // }

    // if (!quiz) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div>
            <h1>{quiz.title}</h1>
            {quiz.questions.map((temp, index) => (
                <div key={index}>
                    <p>{temp.question}</p>
                    {temp.options.map((option, i) => (
                        <div key={i}>
                            <input
                                type="radio"
                                name={`question-${index}`}
                                value={option}
                                onChange={(e) => handleAnswerChange(index, e.target.value)}
                            />
                            {option}
                        </div>
                    ))}
                </div>
            ))}
            <button onClick={handleSubmit}>Submit</button>
            {score !== null && <p>Your score: {score} / {quiz.questions.length}</p>}
        </div>
    );
};

export default QuizTake;
