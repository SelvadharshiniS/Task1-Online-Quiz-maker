import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import QuizForm from './Component/QuizForm';
import QuizList from './Component/QuizList';
import QuizTake from './Component/QuizTake';

function App() {
    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/create">Create Quiz</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<QuizList />} />
                <Route path="/create" element={<QuizForm />} />
                <Route path="/quiz/:title" element={<QuizTake />} />
            </Routes>
        </Router>
    );
}

export default App;
