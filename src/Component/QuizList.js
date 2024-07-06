import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/allquiz');
                setQuizzes(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
                setError('Error fetching quizzes. Please try again later.');
            }
        };

        fetchQuizzes();
    }, []);


    const handleclick=async (a)=>{
        navigate(`/quiz/${a}`)

    }

    return (
        <div>
            <h1>Available Quizzes</h1>
            {error && <p>{error}</p>}
            <ul>
                {quizzes.map((quiz) => (
                    <li key={quiz._id}>
                        {/* <Link to={`/quiz/${quiz._id}`}>{quiz.title}</Link> */}
                        <button onClick={()=>{handleclick(quiz.title)}}>{quiz.title}</button>
                    </li>
                ))}
            </ul>
            <h2><Link to="/create">POST QUIZ</Link></h2>
        </div>
    );
};

export default QuizList;
